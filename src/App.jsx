import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FormSplitBill from './components/FormSplitBill';
import { useAppSelector } from './store/hooks';
import { selectSelectedFriend } from './store/selectors';

export default function App() {
  const selectedFriend = useAppSelector(selectSelectedFriend);

  return (
    <div className="app">
      {/* Header at top */}
      <Header />

      <div className="app-content">
        <Sidebar />
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
      </div>
    </div>
  );
}
