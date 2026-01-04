import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './friendsSlice';
import transactionsReducer from './transactionsSlice';

// --- Load state from localStorage ---
const loadState = () => { // function definition to load state from localStorage
  try {
    const serializedState = localStorage.getItem('split-app-state');
    if (!serializedState) return undefined; // nothing saved yet
    return JSON.parse(serializedState); // what does this line do? It parses the JSON string back into a JavaScript object
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

// --- Save state to localStorage ---
const saveState = (state) => {
  try {
    const saveableState = {
      friends: state.friends,
      transactions: {
        items: state.transactions.items, // only store array of transactions. 
      },
    };
    const serializedState = JSON.stringify(saveableState);
    localStorage.setItem('split-app-state', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

// --- Load saved state if available ---
const persistedState = loadState();   // function call to load state from localStorage

// --- Configure Redux store ---
export const store = configureStore({
  reducer: {
    friends: friendsReducer,
    transactions: transactionsReducer,
  },
  preloadedState: persistedState, // load state from localStorage
});

// --- Save every time Redux state changes ---
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});



