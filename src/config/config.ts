export const EMAIL_LINK = "mailto:rohit.p.droid@gmail.com";
export const LINKEDIN_LINK = "https://linkedin.com/in/rohit-p-droid";
export const GITHUB_LINK = "https://github.com/rohit-p-droid";
export const EMAIL = "rohit.p.droid@gmail.com";

export const config = {
    API_BASE_URL: String(import.meta.env.VITE_API_BASE_URL),
    EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    EMAILJS_USER_ID: import.meta.env.VITE_EMAILJS_USER_ID || ""
};
