import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import DataTable, { type Column } from '../../components/DataTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Alert from '../../components/Alert';
import { useConfirmation, useAlert } from '../../hooks/useModal';
import { getBlogs, deleteBlog, type Blog, type BlogsQueryParams } from '../../services/blog.service';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { confirmationState, showConfirmation, hideConfirmation } = useConfirmation();
  const { alertState, showAlert, hideAlert } = useAlert();

  const fetchBlogs = async (params: BlogsQueryParams = {}) => {
    try {
      setLoading(true);
      const res = await getBlogs(params);
      setBlogs(res.blogs);
      setPagination(res.pagination);
    } catch (err) {
      showAlert({ 
        title: 'Error', 
        message: err instanceof Error ? err.message : 'Failed to load blogs', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params: BlogsQueryParams = {
      page: pagination.page,
      limit: pagination.limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();

    const timer = setTimeout(() => {
      fetchBlogs(params);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    showConfirmation({
      title: 'Delete Blog Post',
      message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await deleteBlog(id);
          fetchBlogs({ page: pagination.page, limit: pagination.limit, search: searchTerm || undefined });
          hideConfirmation();
          showAlert({ 
            title: 'Success', 
            message: 'Blog post deleted successfully', 
            type: 'success' 
          });
        } catch (err) {
          hideConfirmation();
          showAlert({ 
            title: 'Error', 
            message: err instanceof Error ? err.message : 'Failed to delete blog post', 
            type: 'error' 
          });
        } finally {
          setDeleteLoading(false);
        }
      }
    });
  };

  const handlePageChange = (page: number) => setPagination(prev => ({ ...prev, page }));
  const handlePageSizeChange = (limit: number) => setPagination(prev => ({ ...prev, limit, page: 1 }));
  const handleSearch = (search: string) => { 
    setSearchTerm(search); 
    setPagination(prev => ({ ...prev, page: 1 })); 
  };

  const columns: Column<Blog>[] = [
    { 
      key: 'title', 
      label: 'Title', 
      render: (_, blog) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {blog.title}
        </div>
      )
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (_, blog) => (
        <div className="flex flex-wrap gap-1">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>
      )
    },
    {
      key: 'readTime',
      label: 'Read Time',
      render: (_, blog) => (
        <span className="text-gray-600 dark:text-gray-400">
          {blog.readTime} min
        </span>
      )
    },
    {
      key: 'date',
      label: 'Published',
      render: (_, blog) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(blog.date).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, blog) => (
        <div className="flex gap-2">
          <a 
            href={`/admin/blogs/edit/${blog._id}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Edit
          </a>
          <button 
            onClick={() => handleDelete(blog._id)}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <Card title='Blogs'>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              Manage your blog posts and articles
            </p>
            <a 
              href="/admin/blogs/create" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Create New Post
            </a>
          </div>

          <DataTable
            data={blogs}
            columns={columns}
            loading={loading}
            searchable
            searchKeys={['title']}
            pagination={{
              total: pagination.total,
              page: pagination.page,
              limit: pagination.limit,
              totalPages: pagination.totalPages,
              onPageChange: handlePageChange,
              onPageSizeChange: handlePageSizeChange,
              onSearch: handleSearch
            }}
          />
        </div>
      </Card>

      <ConfirmationDialog
        isOpen={confirmationState.isOpen}
        onClose={hideConfirmation}
        onConfirm={confirmationState.onConfirm}
        title={confirmationState.title}
        message={confirmationState.message}
        confirmText={confirmationState.confirmText}
        cancelText={confirmationState.cancelText}
        type={confirmationState.type}
        loading={deleteLoading}
      />

      <Alert
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        buttonText={alertState.buttonText}
      />
    </>
  )
}

export default BlogList;