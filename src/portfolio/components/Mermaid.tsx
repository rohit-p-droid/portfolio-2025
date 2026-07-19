import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Global cache for rendered SVGs to make transitions instant
const svgCache = new Map<string, string>();

// Global serialization queue to prevent concurrent mermaid.render calls
let renderQueue = Promise.resolve();

// Unique counter for DOM element IDs
let idCounter = 0;

interface MermaidProps {
  chart: string;
}

// Helper to safely clean up temporary nodes created by mermaid.render on failure
const cleanTempElements = (id: string) => {
  try {
    const el = document.getElementById(id);
    if (el) el.remove();
    const bindEl = document.getElementById(`d${id}`);
    if (bindEl) bindEl.remove();
  } catch (e) {
    // Ignore cleanup errors
  }
};

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the last rendered chart to determine when to clear the view
  const lastChartRef = useRef<string>('');
  
  // Determine dark mode state
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  
  const cacheKey = `${isDark ? 'dark' : 'light'}-${chart}`;
  
  // Set initial SVG state from cache if available, preventing initial loading flickering
  const [svg, setSvg] = useState<string>(() => svgCache.get(cacheKey) || '');
  const [error, setError] = useState<string | null>(null);

  // 1. Observe theme changes dynamically to update the diagram styling
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 2. Render or fetch from cache whenever chart content or theme changes
  useEffect(() => {
    const key = `${isDark ? 'dark' : 'light'}-${chart}`;
    
    // If it's already in the cache, load it immediately and skip async rendering
    if (svgCache.has(key)) {
      setSvg(svgCache.get(key) || '');
      setError(null);
      lastChartRef.current = chart;
      return;
    }

    // Cache miss: clear the display if it's a new chart to avoid showing stale diagrams.
    // If only the theme changed, keep showing the old themed diagram until the new one is ready.
    if (lastChartRef.current !== chart) {
      setSvg('');
    }
    
    lastChartRef.current = chart;

    idCounter++;
    const renderId = `mermaid-chart-${idCounter}`;
    let isMounted = true;

    // Queue the render job to serialize calls and avoid concurrent document writes
    const renderJob = async () => {
      try {
        // Initialize mermaid configuration just before parsing this chart
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          themeVariables: {
            background: isDark ? '#111827' : '#ffffff',
            primaryColor: '#3b82f6',
          }
        });

        const { svg: renderedSvg } = await mermaid.render(renderId, chart);
        
        if (isMounted) {
          svgCache.set(key, renderedSvg);
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(err?.message || 'Failed to render Mermaid diagram');
        }
        cleanTempElements(renderId);
      }
    };

    // Chain the task to ensure serial execution
    renderQueue = renderQueue.then(renderJob, renderJob);

    return () => {
      isMounted = false;
      cleanTempElements(renderId);
    };
  }, [chart, isDark]);

  if (error) {
    return (
      <div className="my-6 p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-mono text-sm max-w-full overflow-x-auto shadow-md">
        <p className="font-bold mb-2">⚠️ Mermaid Render Error</p>
        <pre className="text-xs whitespace-pre-wrap leading-relaxed">{error}</pre>
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-semibold select-none hover:underline">
            Show original diagram code
          </summary>
          <pre className="mt-2 p-3 rounded-lg bg-red-100/50 dark:bg-red-950/40 text-xs whitespace-pre">{chart}</pre>
        </details>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex justify-center my-8 p-6 bg-white dark:bg-gray-900/40 border border-gray-200/80 dark:border-gray-800/60 rounded-3xl shadow-lg max-w-full overflow-x-auto transition-all duration-300 min-h-[100px]"
      dangerouslySetInnerHTML={{ 
        __html: svg || '<div class="flex items-center justify-center py-12 text-gray-400 dark:text-gray-500 font-semibold text-sm animate-pulse">Rendering diagram...</div>' 
      }}
    />
  );
};

export default Mermaid;
