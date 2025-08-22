import React, { useState, useEffect } from 'react';
import DataTable, { type Column } from '../../components/DataTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Alert from '../../components/Alert';
import { useConfirmation, useAlert } from '../../hooks/useModal';
import { getProjects, deleteProject, type ProjectsQueryParams, type ProjectsApiResponse } from '../../services/projects.service';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  createdAt: string;
  updatedAt: string;
  image?: string | null;
  live?: string | null;
  github?: string | null;
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { confirmationState, showConfirmation, hideConfirmation } = useConfirmation();
  const { alertState, showAlert, hideAlert } = useAlert();

  const fetchProjects = async (params: ProjectsQueryParams = {}) => {
    try {
      setLoading(true);
      const res: ProjectsApiResponse = await getProjects(params);
      setProjects(res.projects);
      setPagination(res.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 0 });
    } catch (err) {
      showAlert({ title: 'Error', message: err instanceof Error ? err.message : 'Failed to load projects', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params: ProjectsQueryParams = {
      page: pagination.page,
      limit: pagination.limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();

    const t = setTimeout(() => {
      fetchProjects(params);
    }, 400);

    return () => clearTimeout(t);
  }, [pagination.page, pagination.limit, searchTerm]);

  const handleDelete = (id: string | number) => {
    showConfirmation({
      title: 'Delete Project',
      message: 'This action cannot be undone. Continue?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await deleteProject(String(id));
          fetchProjects({ page: pagination.page, limit: pagination.limit, search: searchTerm || undefined });
          hideConfirmation();
          showAlert({ title: 'Deleted', message: 'Project removed', type: 'success' });
        } catch (err) {
          hideConfirmation();
          showAlert({ title: 'Error', message: err instanceof Error ? err.message : 'Delete failed', type: 'error' });
        } finally {
          setDeleteLoading(false);
        }
      }
    });
  };

  const handlePageChange = (p: number) => setPagination(prev => ({ ...prev, page: p }));
  const handlePageSizeChange = (l: number) => setPagination(prev => ({ ...prev, limit: l, page: 1 }));
  const handleSearch = (s: string) => { setSearchTerm(s); setPagination(prev => ({ ...prev, page: 1 })); };

  const columns: Column<Project>[] = [
    { key: 'title', label: 'Title', render: (_, r) => <div className="font-medium">{r.title}</div> },
    { key: 'createdAt', label: 'Created', render: (v) => new Date(String(v)).toLocaleDateString() },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, r) => (
        <div className="flex gap-2">
          <a className="text-blue-600" href={`/admin/projects/edit/${r._id}`}>Edit</a>
          <button className="text-red-600" onClick={() => handleDelete(r._id || "")}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <a href="/admin/projects/create" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">Add New Project</a>
      </div>

      <DataTable
        data={projects}
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
  );
};

export default ProjectsList;
