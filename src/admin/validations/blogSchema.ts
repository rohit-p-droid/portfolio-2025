import * as yup from 'yup';

export const blogValidationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  content: yup
    .string()
    .required('Content is required')
    .min(50, 'Content must be at least 50 characters'),

  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one tag is required')
    .required('Tags are required'),

  date: yup
    .string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  readTime: yup
    .number()
    .required('Read time is required')
    .min(1, 'Read time must be at least 1 minute')
    .max(120, 'Read time must not exceed 120 minutes')
    .integer('Read time must be a whole number')
});

export type BlogFormData = yup.InferType<typeof blogValidationSchema>;

export const validateBlogForm = async (data: any): Promise<Record<string, string>> => {
  try {
    await blogValidationSchema.validate(data, { abortEarly: false });
    return {};
  } catch (error: any) {
    const errors: Record<string, string> = {};

    if (error.inner) {
      error.inner.forEach((err: any) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
    }

    return errors;
  }
};
