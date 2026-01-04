import { useForm } from 'react-hook-form';
import Button from './Button';
import { useAppDispatch } from '../store/hooks';
import { addFriend } from '../store/friendsSlice';

export default function FormAddFriend() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', image: 'https://i.pravatar.cc/48' },
  });

  const onSubmit = (data) => {
    const id = crypto.randomUUID();
    dispatch(addFriend({ name: data.name, image: `${data.image}?u=${id}` }));

    reset();
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Friend Name</label>
      <input
        id="name"
        {...register('name', { required: 'Name is required' })}
        placeholder="Enter friend's name"
      />
      {errors.name && (
        <p className="error" style={{ gridColumn: '2' }}>
          {errors.name.message}
        </p>
      )}

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        {...register('image', { required: 'Image URL is required' })}
        placeholder="https://..."
      />
      {errors.image && (
        <p className="error" style={{ gridColumn: '2' }}>
          {errors.image.message}
        </p>
      )}

      <Button type="submit">Add Friend</Button>
    </form>
  );
}
