import { Link } from 'react-router';
import { format } from 'date-fns';

const GroupCard = ({ group, showCreator = true }) => {
  const isActive = new Date(group.startDate) > new Date();
  const startDate = new Date(group.startDate);

  return (
    <div className="overflow-hidden flex flex-col h-full border rounded-md shadow-sm bg-white dark:bg-gray-900">
      <div className="relative h-48 overflow-hidden">
        <img
          src={group.imageUrl}
          alt={group.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-background/90 px-2 py-1 rounded-full text-xs font-medium">
          {group.category}
        </div>
      </div>
      <header className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold line-clamp-1 text-gray-900 dark:text-gray-100">{group.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-400">
            <span className="font-medium">{group.members.length}/{group.maxMembers}</span>
            <span className="text-muted-foreground">members</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{group.location}</p>
      </header>
      <main className="p-4 pt-0 flex-grow">
        <p className="text-sm line-clamp-3 mb-3 text-gray-700 dark:text-gray-300">{group.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
          <span className="font-medium">Starts:</span>
          <span className={`${isActive ? 'text-hobbyhub-600' : 'text-muted-foreground'}`}>
            {format(startDate, 'MMM dd, yyyy')}
          </span>
          {!isActive && (
            <span className="bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
              Inactive
            </span>
          )}
        </div>
      </main>
      <footer className="p-4 pt-0 flex justify-between items-center">
        {showCreator && (
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400">
              {/* {group.createdBy.name.substring(0, 2).toUpperCase()} */}
            </div>
            <span className="text-xs">{group.createdBy.name}</span>
          </div>
        )}
        <Link
          to={`/group/${group.id}`}
          className="inline-block px-4 py-2 bg-hobbyhub-500 text-white rounded hover:bg-hobbyhub-600 transition-colors text-sm"
        >
          See More
        </Link>
      </footer>
    </div>
  );
};

export default GroupCard;