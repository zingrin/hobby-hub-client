import { useState, useMemo } from 'react';
import { useGroups, HOBBY_CATEGORIES } from '../Context/Context/GroupsContext';

import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router';
import GroupListSkeleton from '../Components/GroupCardSkeleton';

const GroupList = () => {
  const { groups, loading } = useGroups();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showActive, setShowActive] = useState(true);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory !== 'all' ? group.category === selectedCategory : true;

      const isActive = new Date(group.startDate) > new Date();
      const matchesActiveStatus = showActive ? isActive : true;

      return matchesSearch && matchesCategory && matchesActiveStatus;
    });
  }, [groups, searchTerm, selectedCategory, showActive]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value !== 'all') {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Discover Hobby Groups</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find and join groups that match your interests, or create your own to
                meet people who share your passion.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-card shadow-sm rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search by name, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 border rounded w-full py-2 px-3"
                      aria-label="Search groups"
                    />
                  </div>

                  <div className="w-full md:w-48">
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full border rounded py-2 px-3"
                    >
                      <option value="all">All Categories</option>
                      {HOBBY_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => setShowActive(!showActive)}
                    className={`w-full md:w-auto rounded py-2 px-4 ${
                      showActive
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'border border-primary text-primary hover:bg-primary/10'
                    }`}
                  >
                    {showActive ? 'Active Groups Only' : 'Show All Groups'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {loading ? (
            <GroupListSkeleton count={9} />
          ) : filteredGroups.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No groups found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or create a new group!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default GroupList;
