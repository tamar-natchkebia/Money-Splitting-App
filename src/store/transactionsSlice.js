import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const transaction = {
        id: crypto.randomUUID(),
        friendId: action.payload.friendId,
        amount: action.payload.amount,
        note: action.payload.note || null,
        createdAt: new Date().toISOString(),
      };
      state.items.push(transaction);
    },
    clearFriendTransactions: (state, action) => {
      state.items = state.items.filter(
        (t) => t.friendId !== action.payload
      );
    },
  },
});

export const { addTransaction, clearFriendTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
