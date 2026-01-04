import Button from './Button';
import { useAppDispatch } from '../store/hooks';
import { deleteFriend } from '../store/friendsSlice';
import { clearFriendTransactions } from '../store/transactionsSlice';

export default function FriendItem({ friend, isSelected, onSelection }) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const ok = confirm(`Delete ${friend.name}? This also clears their transactions.`);
    if (!ok) return;
    dispatch(deleteFriend(friend.id));
    dispatch(clearFriendTransactions(friend.id));
  };

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">You owe {friend.name} {Math.abs(friend.balance)}€</p>
      )}
      {friend.balance > 0 && (
        <p className="green">{friend.name} owes you {friend.balance}€</p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <div className="friend-buttons">
        <Button onClick={() => onSelection(friend.id)}>
          {isSelected ? 'Close' : 'Select'}
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </li>
  );
}
