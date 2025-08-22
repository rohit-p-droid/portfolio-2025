import React, { useState, useEffect } from 'react';
import DataTable, { type Column } from '../../components/DataTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Alert from '../../components/Alert';
import { useConfirmation, useAlert } from '../../hooks/useModal';
import { getSkills, deleteSkill, type SkillsQueryParams, type SkillsApiResponse, type Skill } from '../../services/skills.service';

const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { confirmationState, showConfirmation, hideConfirmation } = useConfirmation();
  const { alertState, showAlert, hideAlert } = useAlert();

  const fetchSkills = async (params: SkillsQueryParams = {}) => {
    try {
      setLoading(true);
      const res: SkillsApiResponse = await getSkills(params);
      setSkills(res.skills);
      setPagination(res.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 0 });
    } catch (err) {
      showAlert({ title: 'Error', message: err instanceof Error ? err.message : 'Failed to load skills', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params: SkillsQueryParams = {
      page: pagination.page,
      limit: pagination.limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();

    const t = setTimeout(() => {
      fetchSkills(params);
    }, 400);

    return () => clearTimeout(t);
  }, [pagination.page, pagination.limit, searchTerm]);

  const handleDelete = (id: string | number) => {
    showConfirmation({
      title: 'Delete Skill',
      message: 'This action cannot be undone. Continue?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await deleteSkill(String(id));
          fetchSkills({ page: pagination.page, limit: pagination.limit, search: searchTerm || undefined });
          hideConfirmation();
          showAlert({ title: 'Deleted', message: 'Skill removed', type: 'success' });
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

  const columns: Column<Skill>[] = [
    { 
      key: 'item', 
      label: 'Skill', 
      render: (_, r) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 mr-3">
            <div 
              className="h-8 w-8 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: r.icon }}
            />
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{r.item}</div>
        </div>
      )
    },
    { 
      key: 'category', 
      label: 'Category', 
      render: (_, r) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {r.category}
        </span>
      )
    },
    { key: 'createdAt', label: 'Created', render: (v) => new Date(String(v)).toLocaleDateString() },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, r) => (
        <div className="flex gap-2">
          <a className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href={`/admin/skills/edit/${r._id}`}>Edit</a>
          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" onClick={() => handleDelete(r._id || "")}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
        <a href="/admin/skills/create" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">Add</a>
      </div>

      <DataTable
        data={skills}
        columns={columns}
        loading={loading}
        searchable
        searchKeys={['item', 'category']}
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

export default SkillsList;
