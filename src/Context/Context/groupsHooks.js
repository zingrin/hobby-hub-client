import { useContext } from 'react';
import { GroupsContext } from './GroupsContext';

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