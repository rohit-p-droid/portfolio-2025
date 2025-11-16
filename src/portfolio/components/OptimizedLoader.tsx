const OptimizedLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Simplified spinner */}
        <div className="relative">
          <div className="w-12 h-12 mx-auto">
            <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
          </div>
        </div>

        {/* Simple loading text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Loading...
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OptimizedLoader;
