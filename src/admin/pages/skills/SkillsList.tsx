import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import DataTable, { type Column } from '../../components/DataTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Alert from '../../components/Alert';
import Card from '../../components/Card/Card';
import { formatDate } from '../../../common/utils';
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
      setSkills(res.skills || []);
      setPagination(res.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 });
    } catch (err) {
      console.error('Error fetching skills:', err);
      setSkills([]);
      setPagination({ total: 0, page: 1, limit: 10, totalPages: 0 });
      showAlert({ title: 'Error', message: err instanceof Error ? err.message : 'Failed to load skills', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills({ page: 1, limit: 10 });
  }, []);

  const handleDelete = (id: string) => {
    showConfirmation({
      title: 'Delete Skill',
      message: 'Are you sure you want to delete this skill? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await deleteSkill(id);
          fetchSkills({ page: pagination.page, limit: pagination.limit, search: searchTerm || undefined });
          hideConfirmation();
          showAlert({ title: 'Success', message: 'Skill deleted successfully', type: 'success' });
        } catch (err) {
          hideConfirmation();
          showAlert({ title: 'Error', message: err instanceof Error ? err.message : 'Failed to delete skill', type: 'error' });
        } finally {
          setDeleteLoading(false);
        }
      }
    });
  };

  const handlePageChange = (page: number) => {
    const params: SkillsQueryParams = {
      page,
      limit: pagination.limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();
    fetchSkills(params);
  };

  const handlePageSizeChange = (limit: number) => {
    const params: SkillsQueryParams = {
      page: 1,
      limit,
    };
    if (searchTerm.trim()) params.search = searchTerm.trim();
    fetchSkills(params);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    const params: SkillsQueryParams = {
      page: 1,
      limit: pagination.limit,
    };
    if (search.trim()) params.search = search.trim();
    fetchSkills(params);
  };

  const columns: Column<Skill>[] = [
    {
      key: 'serial',
      label: 'Sr.No.',
      render: (_, skill) => {
        const index = skills.findIndex(s => s._id === skill._id);
        return (
          <div className="font-medium text-gray-900 dark:text-white">
            {(pagination.page - 1) * pagination.limit + index + 1}
          </div>
        );
      }
    },
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
    { 
      key: 'createdAt', 
      label: 'Created', 
      render: (_, skill) => (
        <span className="text-gray-600 dark:text-gray-400">
          {skill.createdAt ? formatDate(skill.createdAt) : '-'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, r) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/skills/edit/${r._id}`}
            className="text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
            title="Edit skill"
          >
            <BsPencilSquare size={20} />
          </Link>
          <button
            onClick={() => handleDelete(r._id || "")}
            className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
            title="Delete skill"
          >
            <BsTrash size={20} />
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <Card title='Skills'>
        <div>
          <div className="mb-4 flex items-center justify-end">
            <Link
              to="/admin/skills/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Create New Skill
            </Link>
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
  );
};

export default SkillsList;
