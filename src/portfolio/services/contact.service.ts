import { apiRequest } from "../../utils/apiRequest";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}

export const sendContactMessage = async (formData: ContactFormData): Promise<ContactApiResponse> => {
  const response = await apiRequest<ContactApiResponse>({
    url: "/contact/me",
    method: "POST",
    data: formData
  });
  return response;
};
