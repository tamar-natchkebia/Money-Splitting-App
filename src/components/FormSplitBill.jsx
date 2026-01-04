import { useForm } from 'react-hook-form';
import Button from './Button';
import { useAppDispatch } from '../store/hooks';
import { addTransaction } from '../store/transactionsSlice';
import { selectFriend } from '../store/friendsSlice';
import TransactionList from './TransactionList';

export default function FormSplitBill({ selectedFriend }) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bill: '',
      yourShare: '',
      whoIsPaying: 'user',
    },
  });

  const bill = Number(watch('bill')) || 0;
  const yourShare = Number(watch('yourShare')) || 0;
  const friendShare = bill > 0 ? Math.max(bill - yourShare, 0) : 0;
  const whoIsPaying = watch('whoIsPaying');

  const onSubmit = (data) => {
    const billNum = Number(data.bill);
    const yourShareNum = Number(data.yourShare);

    if (!billNum || yourShareNum < 0 || yourShareNum > billNum) return;

    const amount =
      data.whoIsPaying === 'user' ? billNum - yourShareNum : -yourShareNum;

    dispatch(addTransaction({ friendId: selectedFriend.id, amount }));
    dispatch(selectFriend(null));
    reset();
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit(onSubmit)}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input
        type="number"
        step="0.5"
        {...register('bill', { required: 'Bill value is required' })}
        placeholder="e.g. 20"
      />
      {errors.bill && <p className="error">{errors.bill.message}</p>}

      <label>Your share</label>
      <input
        type="number"
        step="0.5"
        {...register('yourShare', {
          required: 'Your share is required',
          validate: (value) =>
            Number(value) <= bill || 'Your share cannot exceed bill value',
        })}
        placeholder="e.g. 10"
      />
      {errors.yourShare && <p className="error">{errors.yourShare.message}</p>}

      <label>{selectedFriend.name}'s share</label>
      <input type="text" disabled value={friendShare ? friendShare.toFixed(2) : ''} />

      <label>Who paid the bill</label>
      <select {...register('whoIsPaying')}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button type="submit">Split bill</Button>

      <TransactionList friendId={selectedFriend.id} />
    </form>
  );
}
