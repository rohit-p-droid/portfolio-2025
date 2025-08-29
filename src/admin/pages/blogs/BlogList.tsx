import { BiX } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import Card from '../../components/Card/Card';
import { formatDate } from '../../../common/utils';
import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useConfirmation, useAlert } from '../../hooks/useModal';
import DataTable, { type Column } from '../../components/DataTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { getBlogs, deleteBlog, type Blog, type BlogsQueryParams, BlogStatus, changeBlogStatus } from '../../services/blog.service';

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
    fetchBlogs({ page: 1, limit: 10 });
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

  const handleStatusChange = (id: string) => {
    showConfirmation({
      title: 'Change Blog Status',
      message: 'Are you sure you want to change status of this blog?',
      type: 'warning',
      confirmText: 'Change',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await changeBlogStatus(id);
          fetchBlogs({ page: pagination.page, limit: pagination.limit, search: searchTerm || undefined });
          hideConfirmation();
          showAlert({
            title: 'Success',
            message: 'Blog post status change successfully',
            type: 'success'
          });
        } catch (err) {
          hideConfirmation();
          showAlert({
            title: 'Error',
            message: err instanceof Error ? err.message : 'Failed to chanage blog status',
            type: 'error'
          });
        } finally {
          setDeleteLoading(false);
        }
      }
    });
  };


  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    const params: BlogsQueryParams = {
      page,
      limit: pagination.limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();
    fetchBlogs(params);
  };

  const handlePageSizeChange = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
    const params: BlogsQueryParams = {
      page: 1,
      limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();
    fetchBlogs(params);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPagination(prev => ({ ...prev, page: 1 }));
    const params: BlogsQueryParams = {
      page: 1,
      limit: pagination.limit,
    };
    if (search.trim()) params.search = search.trim();
    fetchBlogs(params);
  };

  const columns: Column<Blog>[] = [
    {
      key: 'serial',
      label: 'Sr.No.',
      render: (_, blog) => {
        const index = blogs.findIndex(b => b._id === blog._id);
        return (
          <div className="font-medium text-gray-900 dark:text-white">
            {(pagination.page - 1) * pagination.limit + index + 1}
          </div>
        );
      }
    },
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
          {formatDate(blog.date)}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, blog) => (
        <span className="text-gray-600 dark:text-gray-400">
          {blog.status}
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
            className="text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
            title="Edit blog"
          >
            <BsPencilSquare size={20} />
          </a>
          <button
            onClick={() => handleDelete(blog._id)}
            className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
            title="Delete blog"
          >
            <BsTrash size={20} />
          </button>
          <div>
            {
              blog.status === BlogStatus.PUBLISH && <button
                onClick={() => handleStatusChange(blog._id)}
                className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200"
                title="Unpublish blog"
              >
                <TiTick size={20} />
              </button>
            }

            {blog.status === BlogStatus.UNPUBLISH && <button
              onClick={() => handleStatusChange(blog._id)}
              className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              title="Publish blog"
            >
              <BiX size={20} />
            </button>}
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Card title='Blogs'>
        <div>
          <div className="mb-4 flex items-center justify-end">
            <Link
              to="/admin/blogs/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Create New Blog
            </Link>
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