import { useState } from "react";
import { motion } from "framer-motion";
import { EMAIL_LINK, LINKEDIN_LINK, GITHUB_LINK, EMAIL } from "../../config/config";
import { sendContactMessage, type ContactFormData } from "../../services/contact.service";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaSpinner } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    sendContactMessage(formData)
      .then(() => {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again or contact me directly via email.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <section
      id="contact"
      className="px-6 sm:px-12 py-24 bg-gradient-to-br from-cyan-50 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2"
        >
          💬 Let’s Talk!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg"
        >
          Whether you want to discuss a project, a job opportunity, or just geek out about tech — my inbox is always open! 🚀
        </motion.p>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-base sm:text-lg text-gray-800 dark:text-gray-200"
        >
          <a href={EMAIL_LINK} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
            <FaEnvelope /> {EMAIL}
          </a>
          <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800 transition">
            <FaGithub /> GitHub
          </a>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow">
            <FaMapMarkerAlt /> India
          </div>
        </motion.div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-6 py-4 rounded-xl max-w-2xl mx-auto flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="font-semibold">Message Sent Successfully!</h4>
              <p className="text-sm">Thank you for reaching out. I'll get back to you soon!</p>
            </div>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl text-left space-y-6 max-w-2xl mx-auto border border-blue-100 dark:border-blue-700"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Message</label>
            <textarea 
              rows={5} 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity resize-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="text-white" />
                Send Message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
