import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { useGroups } from '../Context/Context/GroupsContext';


import { Pencil, Trash2, PlusCircle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import AuthContext from '../Context/Context/Contex';

const MyGroups = () => {
  const { groups, loading, deleteGroup } = useGroups();
  const { user } = useContext(AuthContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('created');

  const createdGroups = user
    ? groups.filter((group) => group.createdBy.id === user.id)
    : [];

  const joinedGroups = user
    ? groups.filter(
        (group) =>
          group.createdBy.id !== user.id &&
          group.members.some((member) => member.id === user.id)
      )
    : [];

  const handleDeleteGroup = async () => {
    if (!groupToDelete) return;
    setIsDeleting(true);

    try {
      await deleteGroup(groupToDelete.id);
    } catch (error) {
      console.error('Failed to delete group:', error);
    } finally {
      setIsDeleting(false);
      setGroupToDelete(null);
    }
  };

  const GroupsTable = ({ groups, showActions = false }) => (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full table-auto text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2 hidden md:table-cell">Category</th>
            <th className="px-4 py-2 hidden md:table-cell">Start Date</th>
            <th className="px-4 py-2 hidden md:table-cell">Members</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-muted-foreground">
                <p className="mb-2">No groups found</p>
                {showActions && (
                  <Link
                    to="/create-group"
                    className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Create a Group
                  </Link>
                )}
              </td>
            </tr>
          ) : (
            groups.map((group) => {
              const isActive = new Date(group.startDate) > new Date();

              return (
                <tr key={group.id} className="border-t">
                  <td className="px-4 py-2">
                    <div className="font-medium truncate max-w-[200px]">{group.name}</div>
                    <div className="md:hidden text-xs text-muted-foreground mt-1">{group.category}</div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">{group.category}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      {format(new Date(group.startDate), 'MMM dd, yyyy')}
                      {!isActive && (
                        <span className="text-xs px-2 py-1 border rounded text-gray-500 border-gray-300">
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {group.members.length} / {group.maxMembers}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/group/${group.id}`} className="text-blue-600 hover:underline">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      {showActions && (
                        <>
                          <Link to={`/update-group/${group.id}`} className="text-yellow-600 hover:underline">
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setGroupToDelete(group)}
                            className="text-red-600 hover:underline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Groups</h1>
              <p className="text-gray-500">Manage your created groups and view the groups you've joined</p>
            </div>
            <Link
              to="/create-group"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 md:mt-0"
            >
              <PlusCircle className="h-4 w-4" />
              Create a Group
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('created')}
                  className={`px-4 py-2 rounded ${
                    activeTab === 'created' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Created Groups ({createdGroups.length})
                </button>
                <button
                  onClick={() => setActiveTab('joined')}
                  className={`px-4 py-2 rounded ${
                    activeTab === 'joined' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Joined Groups ({joinedGroups.length})
                </button>
              </div>

              {activeTab === 'created' && <GroupsTable groups={createdGroups} showActions />}
              {activeTab === 'joined' && <GroupsTable groups={joinedGroups} />}
            </div>
          )}
        </div>
      </main>
 

      {groupToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
            <p className="text-sm text-gray-500 mb-4">
              This will permanently delete the group "{groupToDelete.name}" and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setGroupToDelete(null)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroup}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
