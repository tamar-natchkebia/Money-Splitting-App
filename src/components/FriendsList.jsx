import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectFriend } from '../store/friendsSlice';
import { selectFilteredFriends, selectSelectedFriendId } from '../store/selectors';
import FriendItem from './FriendItem';

 export default function FriendsList() {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(selectFilteredFriends);
  const selectedFriendId = useAppSelector(selectSelectedFriendId);

  const handleSelection = (friendId) => {
    dispatch(selectFriend(friendId));
  };

  return (
    <ul>  
      {friends.map((friend) => ( // friends already have balance via selector
        <FriendItem // FriendItem component renders individual friend details 
          key={friend.id} // unique key for list rendering 
          friend={friend} // friend data including derived balance 
          isSelected={selectedFriendId === friend.id} // indicates if this friend is currently selected
          onSelection={handleSelection} // callback to select/unselect friend
        />
      ))}
    </ul>
  );
}
