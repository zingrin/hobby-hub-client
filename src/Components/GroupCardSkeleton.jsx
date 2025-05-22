const Skeleton = ({ className = "" }) => (
  <div
    className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded ${className}`}
  />
);

const GroupCardSkeleton = () => {
  return (
    <div className="overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800">
      <Skeleton className="h-48 w-full rounded-t-md" />
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <Skeleton className="h-4 w-32 mt-2 rounded" />
      </div>
      <div className="p-4 pt-0 flex-grow">
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-4 w-3/4 mb-4 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
      <div className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <Skeleton className="h-9 w-24 rounded" />
      </div>
    </div>
  );
};

const GroupListSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <GroupCardSkeleton key={index} />
        ))}
    </div>
  );
};

export default GroupListSkeleton;
