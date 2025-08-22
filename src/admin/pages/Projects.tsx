import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
  image?: string;
}

// Mock data - replace with actual API call
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution built with React and Node.js',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    status: 'completed',
    createdAt: '2024-01-15',
    image: '/assets/projects/ecommerce.jpg'
  },
  {
    id: '2',
    title: 'AI Chat Bot',
    description: 'Intelligent chatbot using OpenAI API for customer support',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'Docker'],
    status: 'active',
    createdAt: '2024-02-20',
    image: '/assets/projects/chatbot.jpg'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Personal portfolio website with admin panel',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'active',
    createdAt: '2024-03-10',
    image: '/assets/projects/portfolio.jpg'
  }
];

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const statusStyles = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filter, setFilter] = useState<'all' | Project['status']>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Add New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {(['all', 'active', 'completed', 'draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} 
            {status !== 'all' && ` (${projects.filter(p => p.status === status).length})`}
            {status === 'all' && ` (${projects.length})`}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Project image */}
            <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            {/* Project content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <StatusBadge status={project.status} />
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-500 dark:text-gray-400 text-xs px-2 py-1">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex space-x-2">
                <Link
                  to={`/admin/projects/edit/${project.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium text-center transition-colors duration-200"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {filter === 'all' ? 'Get started by creating your first project.' : `No ${filter} projects found.`}
          </p>
          {filter === 'all' && (
            <div className="mt-6">
              <Link
                to="/admin/projects/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Add New Project
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
