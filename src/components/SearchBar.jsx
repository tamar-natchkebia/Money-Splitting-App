import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery } from '../store/friendsSlice';
import { selectSearchQuery } from '../store/selectors';

 export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  return (
    <div className="search-bar">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </div>
  );
}
