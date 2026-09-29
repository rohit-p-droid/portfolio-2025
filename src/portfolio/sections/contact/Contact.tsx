import { useState } from "react";
import { motion } from "framer-motion";
import { EMAIL_LINK, LINKEDIN_LINK, GITHUB_LINK, EMAIL, PHONE, PHONE_LINK } from "../../config/config";
import emailjs from "emailjs-com";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaSpinner, FaCheck, FaCopy, FaPhoneAlt } from "react-icons/fa";
import { config } from "../../../config/config";
import { fadeInUp } from "../../utils/motionConfig";

const SERVICE_ID = config.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = config.EMAILJS_TEMPLATE_ID;
const USER_ID = config.EMAILJS_USER_ID;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      window.location.href = `mailto:${EMAIL}?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      return;
    }

    setIsLoading(true);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
      .then(() => {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => {
        console.error('Error sending message:', error);
        window.location.href = `mailto:${EMAIL}?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section
      id="contact"
      className="px-6 sm:px-12 py-20 bg-gray-50/70 dark:bg-gray-950/70 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            {...fadeInUp}
            className="inline-block text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/60"
          >
            Get In Touch
          </motion.div>
          <motion.h2
            {...fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Let’s Build Something Intelligent Together
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Whether you want to explore an AI engineering opportunity, discuss agentic workflows, or design a RAG architecture — my inbox is open!
          </motion.p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left: Quick Contacts Card */}
          <motion.div
            {...fadeInUp}
            className="md:col-span-5 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Contact Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Feel free to reach out directly via email, connect on LinkedIn, or inspect my repositories on GitHub.
            </p>

            <div className="space-y-3">
              {/* Email item */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <FaEnvelope />
                  </div>
                  <div className="truncate">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Email</div>
                    <a href={EMAIL_LINK} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate block">
                      {EMAIL}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs transition"
                  title="Copy email"
                >
                  {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                </button>
              </div>

              {/* LinkedIn item */}
              <a
                href={LINKEDIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center gap-3 hover:border-blue-300 dark:hover:border-blue-600 transition group"
              >
                <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <FaLinkedin />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">LinkedIn</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    linkedin.com/in/prohit23
                  </div>
                </div>
              </a>

              {/* GitHub item */}
              <a
                href={GITHUB_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center gap-3 hover:border-gray-400 dark:hover:border-gray-500 transition group"
              >
                <div className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <FaGithub />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">GitHub</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    github.com/rohit-p-droid
                  </div>
                </div>
              </a>

              {/* Phone item */}
              <a
                href={PHONE_LINK}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center gap-3 hover:border-emerald-300 dark:hover:border-emerald-600 transition group"
              >
                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <FaPhoneAlt />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {PHONE}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-500">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Location</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Nashik, India (Open to Remote & Relocation)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Message Form */}
          <motion.div
            {...fadeInUp}
            className="md:col-span-7 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Send a Direct Message
            </h3>

            {showSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-xl">
                  <FaCheck />
                </div>
                <h4 className="font-bold text-emerald-800 dark:text-emerald-200">Message Sent!</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Thank you for reaching out. I'll get back to you as soon as possible!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Jane Doe"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="jane@example.com"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Hi Rohit, I'd like to discuss an AI project..."
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

