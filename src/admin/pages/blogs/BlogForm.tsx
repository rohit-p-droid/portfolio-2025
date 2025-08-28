import Input from "../../components/Input";
import Alert from "../../components/Alert";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { useAlert } from "../../hooks/useModal";
import Textarea from "../../components/Textarea";
import DateInput from "../../components/DateInput";
import TagsInput from "../../components/TagsInput";
import NumberInput from "../../components/NumberInput";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, updateBlog, getBlogById } from "../../services/blog.service";
import { validateBlogForm, type BlogFormData } from "../../validations/blogSchema";

const BlogForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    content: "",
    tags: [],
    readTime: 1,
    date: new Date().toISOString().split('T')[0]
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { alertState, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    if (isEditMode && id) {
      const loadBlog = async () => {
        try {
          setLoading(true);
          const blog = await getBlogById(id);
          setFormData({
            title: blog.title,
            description: blog.description || "",
            content: blog.content || "",
            tags: blog.tags,
            readTime: blog.readTime,
            date: new Date(blog.date).toISOString().split('T')[0]
          });
        } catch (err) {
          showAlert({
            title: 'Error',
            message: err instanceof Error ? err.message : 'Failed to load blog',
            type: 'error'
          });
        } finally {
          setLoading(false);
        }
      };
      loadBlog();
    }
  }, [isEditMode, id, showAlert]);

  const validateForm = async (): Promise<boolean> => {
    const errors = await validateBlogForm(formData);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof BlogFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!(await validateForm())) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      
      const submitData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        tags: formData.tags,
        date: formData.date,
        readTime: Number(formData.readTime),
        slug: formData.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      };

      if (isEditMode && id) {
        const { slug: _, ...updateData } = submitData;
        await updateBlog(id, updateData);
      } else {
        await createBlog(submitData);
      }

      showAlert({
        title: 'Success',
        message: isEditMode ? 'Blog updated successfully!' : 'Blog created successfully!',
        type: 'success'
      });

      setTimeout(() => {
        navigate("/admin/blogs");
      }, 1500);

    } catch (error: any) {
      if (error.response?.status === 400) {
        setError(error.response.data.message || 'Validation failed');
      } else {
        setError(error.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blogs");
  };

  return (
    <>
      <Card title={isEditMode ? "Edit Blog" : "Create Blog"}>
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              validationError={validationErrors.title}
              placeholder="Enter blog title"
              required
            />

            {/* Description */}
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              validationError={validationErrors.description}
              placeholder="Enter blog description"
              rows={3}
              required
            />

            {/* Content */}
            <Textarea
              label="Content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              validationError={validationErrors.content}
              placeholder="Enter blog content"
              rows={10}
              required
            />

            {/* Tags */}
            <TagsInput
              label="Tags"
              value={formData.tags}
              onChange={(tags) => handleInputChange('tags', tags)}
              validationError={validationErrors.tags}
              placeholder="Enter a tag and press Enter or click Add"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Read Time */}
              <NumberInput
                label="Read Time (minutes)"
                value={formData.readTime}
                onChange={(e) => handleInputChange('readTime', Number(e.target.value))}
                validationError={validationErrors.readTime}
                placeholder="5"
                min="1"
                required
              />

              {/* Date */}
              <DateInput
                label="Publish Date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                validationError={validationErrors.date}
                required
              />

            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Blog' : 'Create Blog')}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Card>

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

export default BlogForm;