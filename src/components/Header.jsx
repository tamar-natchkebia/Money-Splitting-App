import { useAppSelector } from '../store/hooks';
import { selectTransactions } from '../store/selectors';

 function Header() {
  const transactions = useAppSelector(selectTransactions);

  // calculate overall balance across all friends
  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <header className="app-header">
      <h1 className="app-title"> SplitSmart</h1>
      <p className="app-tagline">Keep your friendships and your finances balanced</p>

      <div className="total-balance">
        <span>Total balance:</span>
        <strong className={totalBalance >= 0 ? 'green' : 'red'}>
          {totalBalance >= 0 ? '+' : ''}
          {totalBalance.toFixed(2)}€
        </strong>
      </div>
    </header>
  );
}

export default Header;