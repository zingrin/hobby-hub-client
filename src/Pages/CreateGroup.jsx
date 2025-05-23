import { use, useState } from "react";
import { useNavigate } from "react-router";

import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useGroups,HOBBY_CATEGORIES } from "../Context/Context/GroupsContext";
import AuthContext from "../Context/Context/Contex";
import { toast } from "react-toastify";

const CreateGroup = () => {
  const { user } = use(AuthContext);
  const { createGroup } = useGroups();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [maxMembers, setMaxMembers] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in to create a group");
      return;
    }

    if (!startDate) {
      setError("Please select a start date for the group");
      return;
    }

    setIsLoading(true);

    try {
      const newGroup = {
        name,
        category,
        description,
        location,
        maxMembers,
        startDate: new Date(startDate).toISOString(),
        imageUrl:
          imageUrl ||
          "https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=2344&auto=format&fit=crop",
        createdBy: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      const createdGroup = await createGroup(newGroup);
      console.log(createdGroup);
      fetch('https://hobby-hub-server-henna.vercel.app/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdGroup),
      }).then((data) => {
        console.log(data);
        toast.success('Group created successfully');
       
      }).catch((err) => {
        toast.error(err.message || "Failed to create group");
      });
    
    } catch (err) {
      setError(err.message || "Failed to create group");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen  ">
      <main className="flex-grow py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create a New Group</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Start your own hobby group and connect with like-minded people
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-md shadow-sm ">
            <header className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-1">Group Information</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the details below to create your hobby group
              </p>
            </header>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="flex items-start gap-2 p-3 mb-4 text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-300">
                  <AlertCircle className="w-5 h-5 mt-1" />
                  <p>{error}</p>
                </div>
              )}

              {/* Group Name */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="name" className="font-medium">
                  Group Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded border border-gray-300 dark:border-gray-600   px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Downtown Book Club"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="category" className="font-medium">
                  Hobby Category
                </label>
                <select
                  id="category"
                  className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {HOBBY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full rounded border border-gray-300 dark:border-gray-600  px-3 py-2   focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your group, its purpose, and what members can expect"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Location */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="location" className="font-medium">
                  Meeting Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full rounded border border-gray-300 dark:border-gray-600  px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Central Park, NYC"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {/* Max Members & Start Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="maxMembers" className="font-medium">
                    Max Members
                  </label>
                  <input
                    type="number"
                    id="maxMembers"
                    min={2}
                    max={100}
                    className="w-full rounded border border-gray-300 dark:border-gray-600  px-3 py-2 text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1 relative">
                  <label htmlFor="startDate" className="font-medium">
                    Start Date
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className={`w-full flex items-center justify-start gap-2 rounded border border-gray-300 dark:border-gray-600  px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !startDate ? "text-gray-400 " : ""
                    }`}
                    id="startDate"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {startDate ? (
                      format(new Date(startDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </button>

                  {isCalendarOpen && (
                    <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg p-2">
                      <input
                        type="date"
                        className="w-full rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={
                          startDate
                            ? format(new Date(startDate), "yyyy-MM-dd")
                            : ""
                        }
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setIsCalendarOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="imageUrl" className="font-medium">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  className="w-full rounded border border-gray-300 dark:border-gray-600   px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <p className="text-xs">
                  Add an image that represents your group. If left empty, a
                  default image will be used.
                </p>
              </div>

              {/* Creator Info */}
              <section className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="font-medium text-lg">Creator Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="userName" className="font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      value={user?.name || ""}
                      readOnly
                      disabled
                      className="w-full rounded border border-gray-300 dark:border-gray-600  px-3 py-2   cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="userEmail" className="font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="userEmail"
                      value={user?.email || ""}
                      readOnly
                      disabled
                      className="w-full rounded border border-gray-300 dark:border-gray-600  px-3 py-2 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </section>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700  hover:text-gray-100  hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 rounded text-white bg-[#F98334] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Creating..." : "Create Group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;
