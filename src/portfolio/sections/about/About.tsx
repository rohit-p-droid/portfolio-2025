import { motion } from "framer-motion";
import { aboutData as aboutContent } from "./aboutData";
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope, FaBrain, FaLayerGroup, FaServer, FaCogs, FaGraduationCap } from "react-icons/fa";
import { EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK, RESUME_LINK } from "../../config/config";
import { fadeInUp } from "../../utils/motionConfig";

const pillarIcons = [
  <FaBrain className="text-xl text-blue-500" />,
  <FaLayerGroup className="text-xl text-indigo-500" />,
  <FaServer className="text-xl text-cyan-500" />,
  <FaCogs className="text-xl text-purple-500" />
];

const About = () => {
  const socialLinks = [
    {
      icon: <FaGithub className="text-lg" />,
      href: GITHUB_LINK,
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      icon: <FaLinkedin className="text-lg" />,
      href: LINKEDIN_LINK,
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      icon: <FaEnvelope className="text-lg" />,
      href: EMAIL_LINK,
      label: "Email",
      color: "hover:text-red-500 dark:hover:text-red-400"
    }
  ];

  return (
    <section
      id="about"
      className="px-6 sm:px-12 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 relative"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            {...fadeInUp}
            className="inline-block text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/60"
          >
            Profile & Education
          </motion.div>
          <motion.h2
            {...fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Engineering AI-Native Full-Stack Solutions
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {aboutContent.summary}
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <motion.div
          {...fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800/80 dark:to-gray-800/40 border border-blue-100 dark:border-gray-700 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
              {aboutContent.experienceCount}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
              Years Production Exp.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800/80 dark:to-gray-800/40 border border-indigo-100 dark:border-gray-700 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
              {aboutContent.documentationReduction}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
              Manual Doc Overhead Cut
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800/80 dark:to-gray-800/40 border border-cyan-100 dark:border-gray-700 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-1">
              {aboutContent.deploymentTimeReduction}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
              Deployment Time Cut
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800/80 dark:to-gray-800/40 border border-emerald-100 dark:border-gray-700 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
              {aboutContent.focus}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
              Zero-Downtime Delivery
            </div>
          </div>
        </motion.div>

        {/* Narrative, Pillars & Education */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Detailed Paragraphs & Education */}
          <div className="lg:col-span-6 space-y-5 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            {aboutContent.paragraphs.map((para, idx) => (
              <p key={idx} className="bg-gray-50/70 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                {para}
              </p>
            ))}

            {/* Education Box */}
            {aboutContent.education && (
              <div className="bg-blue-50/60 dark:bg-blue-950/30 p-5 rounded-2xl border border-blue-200/60 dark:border-blue-900/40 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-xs">
                  <FaGraduationCap className="text-xl" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Education</div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-base">
                    {aboutContent.education.degree} ({aboutContent.education.cgpa})
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {aboutContent.education.institution} • <span className="font-medium">{aboutContent.education.period}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={RESUME_LINK}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200"
              >
                <FaDownload className="text-xs" />
                Download Resume
              </a>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${social.color} transition-all duration-200`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Specialization Pillars */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {aboutContent.pillars?.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 space-y-2.5 shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-700 w-fit shadow-xs">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


