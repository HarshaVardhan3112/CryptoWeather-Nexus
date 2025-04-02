export function WeatherSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
      <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
      <div className="flex justify-between">
        <div className="h-8 w-1/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}

export function WeatherError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
      <p className="text-red-800 dark:text-red-200">Failed to load weather</p>
      <button
        onClick={onRetry}
        className="mt-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded text-sm"
      >
        Retry
      </button>
    </div>
  );
}