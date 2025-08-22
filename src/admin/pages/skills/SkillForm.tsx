import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createSkill, updateSkill, getSkillById } from '../../services/skills.service';

interface SkillFormData {
  category: string;
  item: string;
  icon: string;
}

const SkillForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [skillNotFound, setSkillNotFound] = useState(false);
  
  const [formData, setFormData] = useState<SkillFormData>({
    category: '',
    item: '',
    icon: ''
  });

  // Fetch skill data for edit mode
  useEffect(() => {
    if (!isEditMode) {
      setFetchLoading(false);
      return;
    }

    const fetchSkill = async () => {
      try {
        if (!id) {
          setSkillNotFound(true);
          return;
        }

        const skill = await getSkillById(id);
        
        setFormData({
          category: skill.category,
          item: skill.item,
          icon: skill.icon
        });
      } catch (err) {
        console.error('Error fetching skill:', err);
        if (err instanceof Error && err.message === 'Skill not found') {
          setSkillNotFound(true);
        } else {
          setError('Failed to fetch skill data');
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchSkill();
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.category.trim()) {
        throw new Error('Category is required');
      }
      if (!formData.item.trim()) {
        throw new Error('Skill name is required');
      }
      if (!formData.icon.trim()) {
        throw new Error('Icon is required');
      }

      const skillData = {
        category: formData.category.trim(),
        item: formData.item.trim(),
        icon: formData.icon.trim()
      };

      if (isEditMode && id) {
        await updateSkill(id, skillData);
      } else {
        await createSkill(skillData);
      }
      
      // Redirect to skills list
      navigate('/admin/skills');
    } catch (err: any) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} skill`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (skillNotFound) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Skill not found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The skill you're looking for doesn't exist or has been deleted.
          </p>
          <div className="mt-6">
            <Link
              to="/admin/skills"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Back to Skills
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Skill' : 'Create New Skill'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isEditMode ? 'Update your skill information' : 'Add a new skill to your portfolio'}
          </p>
        </div>
        <Link
          to="/admin/skills"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Back to Skills
        </Link>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="item" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                id="item"
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter skill name (e.g., React, Python, SQL)"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter category (e.g., Frontend, Database, Language)"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon SVG *
              </label>
              <textarea
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Paste the complete SVG code here..."
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Paste the complete SVG code including the opening and closing tags.
              </p>
            </div>

            {/* Icon Preview */}
            {formData.icon && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon Preview
                </label>
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center">
                    <div 
                      className="h-8 w-8 mr-3 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: formData.icon }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end space-x-3">
              <Link
                to="/admin/skills"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Skill' : 'Create Skill')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
