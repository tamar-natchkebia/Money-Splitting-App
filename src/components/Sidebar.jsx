import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleAddFriend } from '../store/friendsSlice';
import { selectShowAddFriend } from '../store/selectors';
import SearchBar from './SearchBar';
import FriendsList from './FriendsList';
import FormAddFriend from './FormAddFriend';
import Button from './Button';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const showAddFriend = useAppSelector(selectShowAddFriend);

  return (
    <div className="sidebar">
      <SearchBar />
      <FriendsList />

      {showAddFriend && <FormAddFriend />}

      <Button onClick={() => dispatch(toggleAddFriend())}>
        {showAddFriend ? 'Close' : 'Add friend'}
      </Button>
    </div>
  );
}

