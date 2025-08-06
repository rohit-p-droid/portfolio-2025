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
  try {
    const response = await apiRequest<ContactApiResponse>({
      url: "/contact/send-message",
      method: "POST",
      data: formData
    });
    return response;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};
