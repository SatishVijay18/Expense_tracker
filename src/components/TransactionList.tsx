import { Expense } from '@/App';

function TransactionList({ list }: { list: Expense[] }) {
  return (
    <div className="h-full p-6 font-Poetsen">
      <h1 className="py-4 text-center text-3xl">Transactions</h1>
      <div className="scrollbar-none h-5/6 overflow-y-auto rounded-xl bg-white bg-opacity-70 text-custtern">
        <ul className=" px-8 pt-8  text-2xl">
          {list.map((expense, index) => {
            const toggle = expense.type == 'expense' ? true : false;
            return (
              <li key={index} className="flex flex-wrap justify-between">
                <ul>{expense.name}</ul>
                <ul>{expense.description}</ul>
                <ul style={{ color: toggle ? 'red' : 'green' }}>
                  ₹{expense.amount}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TransactionList;
