import { createSelector } from '@reduxjs/toolkit';

export const selectFriends = (state) => state.friends.friends;
export const selectSearchQuery = (state) => state.friends.searchQuery;
export const selectSelectedFriendId = (state) => state.friends.selectedFriendId;
export const selectShowAddFriend = (state) => state.friends.showAddFriend;
export const selectTransactions = (state) => state.transactions.items;

// Running balance per friend (sum of all their transactions)
export const selectFriendsWithDerivedBalance = createSelector(
  [selectFriends, selectTransactions],
  (friends, transactions) =>
    friends.map((friend) => {
      const balance = transactions
        .filter((t) => t.friendId === friend.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...friend, balance: Number(balance.toFixed(2)) };
    })
);

// Search filter
export const selectFilteredFriends = createSelector(
  [selectFriendsWithDerivedBalance, selectSearchQuery],
  (friends, searchQuery) => {
    if (!searchQuery.trim()) return friends;
    return friends.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);

// Selected friend (with balance)
export const selectSelectedFriend = createSelector(
  [selectFriendsWithDerivedBalance, selectSelectedFriendId],
  (friends, selectedFriendId) => {
    if (!selectedFriendId) return null;
    return friends.find((f) => f.id === selectedFriendId) || null;
  }
);

// Recent transactions for a friend (latest first)
export const selectFriendTransactions = (friendId) =>
  createSelector([selectTransactions], (transactions) =>
    transactions
      .filter((t) => t.friendId === friendId)
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10)
  );
