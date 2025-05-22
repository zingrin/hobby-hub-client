import React, { createContext, useState, useContext, useEffect, use } from 'react';
import { toast } from 'sonner';
import AuthContext from './Contex';

// Create the context
const GroupsContext = createContext();

// Custom hook to use GroupsContext
export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error('useGroups শুধুমাত্র GroupsProvider এর ভিতরে ব্যবহার করা যাবে');
  }
  return context;
};

// Sample hobby categories
export const HOBBY_CATEGORIES = [
  'Drawing & Painting', 'Photography', 'Video Gaming', 'Fishing',
  'Running', 'Cooking', 'Reading', 'Writing', 'Music', 'Dancing',
  'Hiking', 'Gardening', 'Crafting', 'Board Games', 'Yoga',
];

// Dummy sample groups
const SAMPLE_GROUPS = []; // Keep or replace with your mock data

// GroupsProvider component
export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);

  // Load groups from localStorage on mount
  useEffect(() => {
    const loadGroups = () => {
      try {
        const storedGroups = localStorage.getItem('hobbyhub-groups');
        if (storedGroups) {
          setGroups(JSON.parse(storedGroups));
        } else {
          setGroups(SAMPLE_GROUPS);
          localStorage.setItem('hobbyhub-groups', JSON.stringify(SAMPLE_GROUPS));
        }
      } catch (error) {
        console.error('গ্রুপ লোড করতে সমস্যা হয়েছে:', error);
        setGroups(SAMPLE_GROUPS);
        localStorage.setItem('hobbyhub-groups', JSON.stringify(SAMPLE_GROUPS));
      } finally {
        setLoading(false);
      }
    };
    loadGroups();
  }, []);

  // Save to localStorage whenever groups change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('hobbyhub-groups', JSON.stringify(groups));
    }
  }, [groups, loading]);

  // Create a new group
  const createGroup = async (groupData) => {
    if (!user) {
      throw new Error('গ্রুপ তৈরি করতে হলে লগইন করতে হবে');
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newGroup = {
        ...groupData,
        id: Math.random().toString(36).substring(2),
        members: [{ id: user.id, name: user.name }],
        createdAt: new Date().toISOString(),
        createdBy: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      setGroups(prev => [...prev, newGroup]);
      toast.success('গ্রুপ সফলভাবে তৈরি হয়েছে!');
      return newGroup;
    } catch (error) {
      console.error('গ্রুপ তৈরি করতে সমস্যা হয়েছে:', error);
      toast.error(error.message || 'গ্রুপ তৈরি করতে সমস্যা হয়েছে');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a group
  const updateGroup = async (id, groupData) => {
    if (!user) {
      throw new Error('গ্রুপ আপডেট করতে হলে লগইন করতে হবে');
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const index = groups.findIndex(group => group.id === id);
      if (index === -1) throw new Error('গ্রুপ পাওয়া যায়নি');

      if (groups[index].createdBy.id !== user.id) {
        throw new Error('শুধুমাত্র গ্রুপ তৈরি করা ব্যক্তি এটি আপডেট করতে পারবেন');
      }

      const updatedGroup = { ...groups[index], ...groupData };
      const updatedGroups = [...groups];
      updatedGroups[index] = updatedGroup;

      setGroups(updatedGroups);
      toast.success('গ্রুপ সফলভাবে আপডেট হয়েছে!');
      return updatedGroup;
    } catch (error) {
      console.error('গ্রুপ আপডেট করতে সমস্যা হয়েছে:', error);
      toast.error(error.message || 'গ্রুপ আপডেট করতে সমস্যা হয়েছে');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a group
  const deleteGroup = async (id) => {
    if (!user) {
      throw new Error('গ্রুপ ডিলিট করতে হলে লগইন করতে হবে');
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const group = groups.find(group => group.id === id);
      if (!group) throw new Error('গ্রুপ পাওয়া যায়নি');

      if (group.createdBy.id !== user.id) {
        throw new Error('শুধুমাত্র গ্রুপ তৈরি করা ব্যক্তি এটি মুছে ফেলতে পারবেন');
      }

      setGroups(prev => prev.filter(group => group.id !== id));
      toast.success('গ্রুপ মুছে ফেলা হয়েছে!');
    } catch (error) {
      console.error('গ্রুপ ডিলিট করতে সমস্যা হয়েছে:', error);
      toast.error(error.message || 'গ্রুপ ডিলিট করতে সমস্যা হয়েছে');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Join a group
  const joinGroup = async (groupId) => {
    if (!user) {
      throw new Error('গ্রুপে জয়েন করতে হলে লগইন করতে হবে');
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const index = groups.findIndex(group => group.id === groupId);
      if (index === -1) throw new Error('গ্রুপ পাওয়া যায়নি');

      const group = groups[index];

      if (group.members.length >= group.maxMembers) {
        throw new Error('এই গ্রুপে আর কেউ জয়েন করতে পারবে না');
      }

      if (new Date(group.startDate) < new Date()) {
        throw new Error('এই গ্রুপটি এখন আর অ্যাকটিভ নয়');
      }

      if (group.members.some(member => member.id === user.id)) {
        throw new Error('আপনি ইতোমধ্যে এই গ্রুপের সদস্য');
      }

      const updatedGroup = {
        ...group,
        members: [...group.members, { id: user.id, name: user.name }],
      };

      const updatedGroups = [...groups];
      updatedGroups[index] = updatedGroup;
      setGroups(updatedGroups);

      toast.success('আপনি গ্রুপে জয়েন করেছেন!');
    } catch (error) {
      console.error('গ্রুপে জয়েন করতে সমস্যা হয়েছে:', error);
      toast.error(error.message || 'গ্রুপে জয়েন করতে সমস্যা হয়েছে');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroupsContext.Provider value={{
      groups,
      loading,
      createGroup,
      updateGroup,
      deleteGroup,
      joinGroup,
    }}>
      {children}
    </GroupsContext.Provider>
  );
};
