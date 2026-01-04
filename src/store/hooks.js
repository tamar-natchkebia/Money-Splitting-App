import { useDispatch, useSelector } from 'react-redux';

// ✅ useAppDispatch: for dispatching actions
export const useAppDispatch = () => useDispatch();

// ✅ useAppSelector: for selecting state
export const useAppSelector = useSelector;
