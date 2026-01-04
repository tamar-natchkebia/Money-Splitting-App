import { createSlice } from '@reduxjs/toolkit';

const initialFriends = [
  { id: '118836', name: 'Clark', image: 'https://i.pravatar.cc/48?u=118836' },
  { id: '933372', name: 'Sarah', image: 'https://i.pravatar.cc/48?u=933372' },
  { id: '499476', name: 'Anthony', image: 'https://i.pravatar.cc/48?u=499476' },
  { id: '812345', name: 'Emma', image: 'https://i.pravatar.cc/48?u=812345' },
  { id: '654321', name: 'Liam', image: 'https://i.pravatar.cc/48?u=654321' },
  
];

const initialState = {
  friends: initialFriends,
  selectedFriendId: null,
  showAddFriend: false,
  searchQuery: '',
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend: (state, action) => {
      const newFriend = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        image: action.payload.image,
       
      };
  
      state.friends.push(newFriend);
      state.showAddFriend = false;
    },
    
    toggleAddFriend: (state) => {
      state.showAddFriend = !state.showAddFriend;
    },
    selectFriend: (state, action) => {
      state.selectedFriendId =
        state.selectedFriendId === action.payload ? null : action.payload; //unselecting it by setting to null
      state.showAddFriend = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    //  deleteFriend
    deleteFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload
      );
      // unselect friend if deleted
      if (state.selectedFriendId === action.payload) {
        state.selectedFriendId = null;
      }
    },
  },
});
 

export const {
  addFriend,
  toggleAddFriend,
  selectFriend,
  setSearchQuery,
  deleteFriend, // <-- export new action
} = friendsSlice.actions;

export default friendsSlice.reducer;
 