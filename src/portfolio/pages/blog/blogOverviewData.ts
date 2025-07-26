export interface BlogOverviewData {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML content
    tags: string[];
    date: string;
    readTime: string;
    author: string;
}

export const blogOverviewData: BlogOverviewData = {
    id: "1",
    title: "Mastering TypeScript in React Projects",
    excerpt: "Explore how to supercharge your React development using TypeScript for better scalability and maintainability.",
    tags: ["TypeScript", "React", "Best Practices"],
    date: "July 15, 2025",
    readTime: "6 min read",
    author: "Rohit Patil",
    content: `
    <h2>Introduction</h2>
    <p>Welcome to this comprehensive guide on mastering TypeScript in React projects! TypeScript has become an essential tool for modern React development, providing type safety, better developer experience, and improved maintainability.</p>
    
    <p>In this article, we'll explore the key concepts and best practices that will help you leverage TypeScript effectively in your React applications.</p>

    <h2>Why TypeScript with React?</h2>
    <p>TypeScript brings several advantages to React development:</p>
    <ul>
      <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
      <li><strong>Better IDE Support:</strong> Enhanced autocomplete, refactoring, and navigation</li>
      <li><strong>Improved Maintainability:</strong> Self-documenting code with clear interfaces</li>
      <li><strong>Team Collaboration:</strong> Clearer contracts between components and functions</li>
    </ul>

    <h2>Setting Up TypeScript in React</h2>
    <p>Getting started with TypeScript in a React project is straightforward. If you're starting fresh, you can use Create React App with TypeScript template:</p>
    
    <pre><code>npx create-react-app my-app --template typescript</code></pre>
    
    <p>For existing projects, you can gradually migrate by installing TypeScript and renaming your files from <code>.js</code> to <code>.tsx</code>.</p>

    <h2>Component Props and State</h2>
    <p>One of the most important aspects of TypeScript in React is properly typing your component props and state. Here's how you can define strong types for your components:</p>

    <pre><code>interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC&lt;ButtonProps&gt; = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    &lt;button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    &gt;
      {children}
    &lt;/button&gt;
  );
};</code></pre>

    <h2>Advanced TypeScript Patterns</h2>
    <p>As you become more comfortable with TypeScript in React, you can explore advanced patterns like:</p>
    <ul>
      <li>Generic components for reusability</li>
      <li>Conditional types for flexible APIs</li>
      <li>Utility types for transforming existing types</li>
      <li>Custom hooks with proper typing</li>
    </ul>

    <h2>Best Practices</h2>
    <p>Here are some best practices to follow when using TypeScript with React:</p>
    <ol>
      <li><strong>Start strict:</strong> Enable strict mode in your TypeScript configuration</li>
      <li><strong>Avoid any:</strong> Use proper types instead of falling back to <code>any</code></li>
      <li><strong>Use interfaces for props:</strong> Define clear interfaces for component props</li>
      <li><strong>Leverage union types:</strong> Use union types for props that accept multiple values</li>
      <li><strong>Type your events:</strong> Properly type event handlers and their parameters</li>
    </ol>

    <h2>Conclusion</h2>
    <p>TypeScript transforms the React development experience by providing type safety, better tooling, and improved code quality. While there's a learning curve, the benefits far outweigh the initial investment in time and effort.</p>
    
    <p>Start by gradually introducing TypeScript into your React projects, focus on typing your component props and state, and gradually adopt more advanced patterns as you become comfortable with the basics.</p>

    <p>Happy coding with TypeScript and React! 🚀</p>
  `,
};

export const relatedBlogs =[
        {
            id: "2",
            title: "A Deep Dive into Tailwind CSS and Utility-First Design",
            excerpt: "Let's break down why Tailwind CSS has taken over the frontend world, with real-world examples and tips.",
            readTime: "5 min read",
            date: "July 5, 2025"
        },
        {
            id: "3",
            title: "Dark Mode: Building Theme-Toggles in React",
            excerpt: "Here's how to implement seamless light/dark theme switching in your React apps using Tailwind and context.",
            readTime: "4 min read",
            date: "June 20, 2025"
        }
    ]
