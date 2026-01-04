import { useAppSelector } from '../store/hooks';
import { selectFriendTransactions } from '../store/selectors';

 function TransactionList({ friendId }) {
  const selectTransactions = selectFriendTransactions(friendId);
  const transactions = useAppSelector(selectTransactions);

  if (transactions.length === 0) {
    return (
      <div className="transaction-list">
        <h3>Transaction History</h3>
        <p className="empty-state">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span className="date">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </span>
            <span className={transaction.amount >= 0 ? 'amount-positive' : 'amount-negative'}>
              {transaction.amount >= 0 ? '+' : ''}
              {transaction.amount.toFixed(2)}€
            </span>
            {transaction.note && <span className="note">{transaction.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;