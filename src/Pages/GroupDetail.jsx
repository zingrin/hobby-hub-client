import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { format } from 'date-fns';
import { ArrowLeft, Users, Calendar, MapPin, CalendarDays } from 'lucide-react';

import AuthContext from '../Context/Context/Contex';
import { useGroups } from '../Context/Context/GroupsContext';

const GroupDetail = () => {
  const { id } = useParams();
  const { groups, loading, joinGroup } = useGroups();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const group = groups.find((g) => g.id === id);

  const handleBack = () => {
    navigate(-1);
  };

  const handleJoinGroup = async () => {
    if (!id) return;
    setIsJoining(true);
    setJoinError(null);
    try {
      await joinGroup(id);
      setShowConfirmDialog(false);
    } catch (error) {
      setJoinError(error.message || 'Failed to join group');
    } finally {
      setIsJoining(false);
    }
  };

  const isMember = user && group && group.members.some((member) => member.id === user.id);
  const isActive = group && new Date(group.startDate) > new Date();
  const isFull = group && group.members.length >= group.maxMembers;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden bg-gray-300 animate-pulse dark:bg-gray-700" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-gray-300 rounded animate-pulse dark:bg-gray-700"></div>
              <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse dark:bg-gray-700"></div>
              <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse dark:bg-gray-700"></div>
              <div className="h-24 w-full bg-gray-300 rounded animate-pulse dark:bg-gray-700"></div>
            </div>
          </div>
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
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The group you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/groups')}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Browse All Groups
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img
                src={group.imageUrl}
                alt={group.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100">
                {group.category}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{group.location}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{group.members.length} / {group.maxMembers} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Created on {format(new Date(group.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-2">About this group</h2>
                  <p>{group.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Members ({group.members.length})</h2>
                  <div className="flex flex-wrap gap-3">
                    {group.members.map((member) => (
                      <div key={member.id} className="flex flex-col items-center gap-1 text-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-bold uppercase">
                          {member.name.substring(0, 2)}
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold mb-4">Group Details</h2>

                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">{group.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Start Date</p>
                        <p className="text-sm">{format(new Date(group.startDate), 'MMMM dd, yyyy')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Organizer</p>
                        <p className="text-sm">{group.createdBy.name}</p>
                      </div>
                    </div>
                  </div>

                  {joinError && (
                    <div
                      role="alert"
                      className="mt-6 p-4 border border-red-600 bg-red-100 text-red-700 rounded"
                    >
                      <strong className="block font-semibold">Error</strong>
                      <p>{joinError}</p>
                    </div>
                  )}

                  <div className="mt-6">
                    {isMember ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 rounded border border-gray-400 text-gray-500 cursor-not-allowed"
                      >
                        You are a member
                      </button>
                    ) : !isActive ? (
                      <div className="mt-4 p-4 border border-yellow-500 bg-yellow-100 text-yellow-700 rounded">
                        <strong className="block font-semibold">Group is no longer active</strong>
                        <p>This group's start date has passed. You can no longer join this group.</p>
                      </div>
                    ) : isFull ? (
                      <div className="mt-4 p-4 border border-red-600 bg-red-100 text-red-700 rounded">
                        <strong className="block font-semibold">Group is full</strong>
                        <p>This group has reached its maximum member capacity.</p>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowConfirmDialog(true)}
                          disabled={isJoining}
                          className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isJoining ? 'Joining...' : 'Join Group'}
                        </button>

                        {showConfirmDialog && (
                          <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="confirm-dialog-title"
                            aria-describedby="confirm-dialog-description"
                          >
                            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6 shadow-lg">
                              <h3 id="confirm-dialog-title" className="text-lg font-semibold mb-2">
                                Join {group.name}?
                              </h3>
                              <p id="confirm-dialog-description" className="mb-6 text-gray-700 dark:text-gray-300">
                                You're about to join this hobby group. You'll be able to
                                participate in group activities and connect with other
                                members.
                              </p>
                              <div className="flex justify-end gap-4">
                                <button
                                  onClick={() => setShowConfirmDialog(false)}
                                  className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleJoinGroup}
                                  disabled={isJoining}
                                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isJoining ? 'Joining...' : 'Join Group'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GroupDetail;
