// Interface for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Interface for API response
export interface ContactApiResponse {
  success: boolean;
  message: string;
}

export function sendContactMessage(formData: ContactFormData): Promise<ContactApiResponse> {
  // Uncomment this when you have a real API endpoint
  // const API_URL = 'https://your-api-url.com/contact';
  // return fetch(API_URL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // }).then(response => {
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return response.json();
  // });

  // Mock API call for demo purposes
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success or failure based on email validation
      if (formData.email && formData.name && formData.message) {
        resolve({
          success: true,
          message: 'Message sent successfully!'
        });
      } else {
        reject(new Error('All fields are required'));
      }
    }, 2000); // 2 second delay to simulate network request
  });
}
