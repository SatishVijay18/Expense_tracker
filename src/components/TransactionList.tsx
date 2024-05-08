import { Expense } from '@/App';

function TransactionList({ list }: { list: Expense[] }) {
  return (
    <div className="font-Poetsen h-full rounded-xl bg-white p-6">
      <h1 className="border-b-2 py-4 text-center text-3xl">Transactions</h1>
      <div className="scrollbar-none h-5/6 overflow-y-auto">
        <ul className=" px-8 pt-8  text-2xl">
          {list.map((expense, index) => {
            return (
              <li key={index} className="flex flex-wrap justify-between">
                <div>{expense.account.name}</div>
                <div>{expense.name}</div>
                <div>{expense.category}</div>
                <div>₹{expense.amount}</div>
                <div>{expense.date.toDateString()}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TransactionList;
