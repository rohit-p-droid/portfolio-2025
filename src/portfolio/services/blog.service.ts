// Interface for blog list items (summary view)
export interface BlogPost {
    title: string;
    description: string;
    tags: string[];
    date: string;
    readTime: string;
    slug: string;
}

// Interface for detailed blog view (extends BlogPost with additional fields)
export interface BlogDetailView extends BlogPost {
    id: string;
    content: string; // HTML content
    author: string;
}

const blogPosts: BlogPost[] = [
    {
        title: "Mastering TypeScript in React Projects",
        description: "Explore how to supercharge your React development using TypeScript for better scalability and maintainability.",
        tags: ["TypeScript", "React", "Best Practices"],
        date: "July 15, 2025",
        readTime: "6 min read",
        slug: "mastering-typescript-in-react-projects"
    },
    {
        title: "A Deep Dive into Tailwind CSS and Utility-First Design",
        description: "Let's break down why Tailwind CSS has taken over the frontend world, with real-world examples and tips.",
        tags: ["CSS", "Tailwind", "Frontend"],
        date: "July 5, 2025",
        readTime: "5 min read",
        slug: "deep-dive-tailwind-css-utility-first-design"
    },
    {
        title: "Dark Mode: Building Theme-Toggles in React",
        description: "Here's how to implement seamless light/dark theme switching in your React apps using Tailwind and context.",
        tags: ["React", "Tailwind", "UX"],
        date: "June 20, 2025",
        readTime: "4 min read",
        slug: "dark-mode-building-theme-toggles-react"
    },
    {
        title: "Building Responsive Web Applications",
        description: "Learn how to create web applications that work seamlessly across all devices and screen sizes.",
        tags: ["Responsive", "CSS", "Mobile"],
        date: "July 10, 2025",
        readTime: "5 min read",
        slug: "building-responsive-web-applications"
    },
    {
        title: "State Management in Modern React",
        description: "A comprehensive guide to managing state in React applications using hooks, context, and external libraries.",
        tags: ["React", "State Management", "Hooks"],
        date: "June 28, 2025",
        readTime: "7 min read",
        slug: "state-management-modern-react"
    },
    {
        title: "Performance Optimization for Web Apps",
        description: "Essential techniques to optimize your web applications for better performance and user experience.",
        tags: ["Performance", "Optimization", "Best Practices"],
        date: "June 15, 2025",
        readTime: "6 min read",
        slug: "performance-optimization-web-apps"
    }
];

export const blogOverviewData: BlogDetailView = {
    id: "1",
    title: "Mastering TypeScript in React Projects",
    description: "Explore how to supercharge your React development using TypeScript for better scalability and maintainability.",
    tags: ["TypeScript", "React", "Best Practices"],
    date: "July 15, 2025",
    readTime: "6 min read",
    slug: "mastering-typescript-in-react-projects",
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

export const relatedBlogs = [
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

export async function getBlogs(): Promise<{ data: BlogPost[] }> {
    // const response = await fetch(API_URL);
    // const data = await response.json();
    return { data: blogPosts };
}

export async function getBlogDetailBySlug(slug: string): Promise<{data: BlogDetailView | null}> {
    // const response = await fetch(`${API_URL}/${slug}/detail`);
    // const data = await response.json();
    
    // For demo purposes, find the blog post and create a detailed view
    const blogPost = blogPosts.find(post => post.slug === slug);
    if (!blogPost) return { data: null };
    
    // Return with additional detail fields
    const detailedBlog: BlogDetailView = {
        ...blogPost,
        id: slug,
        author: "Rohit Patil",
        content: `
        <h2>Introduction</h2>
        <p>Welcome to this comprehensive article: ${blogPost.title}</p>
        <p>${blogPost.description}</p>
        <h2>Main Content</h2>
        <p>This is the detailed content for the blog post with slug: ${slug}</p>
        <p>Here you would typically have the full blog content loaded from your API or CMS.</p>
        <h2>Conclusion</h2>
        <p>Thank you for reading this article. We hope you found it helpful and informative.</p>
        `
    };
    
    return { data: detailedBlog };
}

