import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {

  const funnyMessages = [
    "Loading… because teleportation isn’t ready yet 🌀",
    "Knocking on the server’s door… it’s slow to wake up 🚪💤",
    "Spinning up infinite loops… hold tight! 🔄",
    "Buffering… like it’s 2005 YouTub 📼",
    "Negotiating with the server union… 🤝"
  ];

  const [message, setMessage] = useState(funnyMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg =
        funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setMessage(randomMsg);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="fixed inset-0 z-[999] bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="w-20 h-20 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full"
            />

          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Loading
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-blue-600 dark:text-blue-400"
            >
              ...
            </motion.span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {message}
          </p>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center space-x-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                backgroundColor: [
                  "rgb(59, 130, 246)",
                  "rgb(34, 197, 94)",
                  "rgb(59, 130, 246)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-blue-500"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;