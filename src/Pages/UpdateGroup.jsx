import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft } from 'lucide-react'; 

function UpdateGroup() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const groups = window.groups || [];
  const groupsLoading = window.groupsLoading || false;
  const updateGroup = window.updateGroup || (async () => {});
  const user = window.user || null;

  const group = groups.find((g) => g.id === id);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  const [startDate, setStartDate] = useState(undefined);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setCategory(group.category);
      setDescription(group.description);
      setLocation(group.location);
      setMaxMembers(group.maxMembers);
      setStartDate(new Date(group.startDate));
      setImageUrl(group.imageUrl);
    }
  }, [group]);

  if (groupsLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Group Not Found</h1>
          <p className="text-gray-500 mb-8">
            The group you're trying to update doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/my-groups')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to My Groups
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || user.id !== group.createdBy.id) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Not Authorized</h1>
          <p className="text-gray-500 mb-8">
            You don't have permission to update this group.
          </p>
          <button
            onClick={() => navigate('/my-groups')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to My Groups
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!startDate) {
      setError('Please select a start date for the group');
      return;
    }

    setIsLoading(true);

    updateGroup(id, {
      name,
      category,
      description,
      location,
      maxMembers,
      startDate: startDate.toISOString(),
      imageUrl,
      createdBy: group.createdBy,
    })
      .then(() => {
        navigate(`/group/${id}`);
      })
      .catch((err) => {
        setError(err.message || 'Failed to update group');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 px-2 py-1 border border-gray-300 rounded"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Update Group</h1>
            <p className="text-gray-500">Edit the details of your hobby group</p>
          </div>

          <div className="border rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Group Information</h2>
            <p className="text-gray-500 mb-6">Update the details of your hobby group</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center bg-red-100 text-red-700 p-3 rounded-md space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Hobby Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a category</option>
                  {window.HOBBY_CATEGORIES?.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Meeting Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700">
                    Max Members
                  </label>
                  <input
                    id="maxMembers"
                    type="number"
                    min={group.members.length}
                    max={100}
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(parseInt(e.target.value) || 0)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">
                    Minimum: {group.members.length} (current members)
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={startDate ? startDate.toISOString().slice(0, 10) : ''}
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Creator Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={group.createdBy.name}
                      readOnly
                      disabled
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      value={group.createdBy.email}
                      readOnly
                      disabled
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Update Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default UpdateGroup;
