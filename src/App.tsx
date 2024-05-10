import { useState } from 'react';
import TransactionList from './components/TransactionList';
import ChartComponent from './components/ChartComponent';
import CatPopUp from './components/CatPopUp';
import InputTabs from './components/InputTabs';

export interface Expense {
  name: string;
  amount: number;
  description: string;
  date: Date;
  account: Account;
  type: string;
}

export interface Account {
  name: string;
  type: string;
}

export interface FormDataType {
  name: string;
  amount: number;
  description: string;
  accountname: string;
}

function App() {
  const [expenseToggle, setexpenseToggle] = useState('expense');
  const [date, setDate] = useState<Date>(new Date());
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [incomeList, setIncomeList] = useState<Expense[]>([]);
  const [accountList, setAccountList] = useState<Account[]>([
    { name: 'Axis', type: 'Bank' },
    { name: 'Myzone', type: 'Card' },
    { name: 'Bonus', type: 'Cash' },
  ]);
  const [totalExp, setTotalExp] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    description: '',
    accountname: '', // by default if accType and description are not set.
  });

  const allTransactions = expenseList.concat(incomeList);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accountobj = accountList.find(
      (account) => account.name == formData.accountname,
    );

    const newExpense: Expense = {
      name: formData.name,
      amount: formData.amount,
      description: formData.description,
      date,
      account: accountobj
        ? accountobj
        : { name: 'Unassigned', type: 'default' },
      type: expenseToggle,
    };

    // expense or income
    if (expenseToggle == 'expense') {
      const newexp = +totalExp + +formData.amount;
      setTotalExp(newexp); // total amount spent for graph
      setExpenseList([...expenseList, newExpense]); // total expense
    } else {
      const newIncome = +totalIncome + +formData.amount;
      setTotalIncome(newIncome); // total income earned for graph
      setIncomeList([...incomeList, newExpense]); // total expense
    }

    setFormData({
      name: '',
      amount: 0,
      description: '',
      accountname: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex h-screen bg-[url('/wave-haikei.png')] ">
      <div className="trans-wrapper h-full w-1/2">
        <TransactionList list={allTransactions} />
      </div>
      <div className="dashboard-charts-wrapper w-1/2">
        <div className="mx-6 my-6 flex h-1/2  justify-center rounded-xl  bg-white p-4">
          <InputTabs
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
            accountList={accountList}
            date={date}
            setDate={setDate}
            setExpenseToggle={setexpenseToggle}
          />
        </div>
        <div className="m-4 flex h-2/5  rounded-xl bg-white">
          {expenseToggle == 'expense' ? (
            <ChartComponent
              expenseList={expenseList}
              expenseToggle={expenseToggle}
            />
          ) : (
            <ChartComponent
              expenseList={incomeList}
              expenseToggle={expenseToggle}
            />
          )}
        </div>
      </div>
      <div className="modal-wrapper absolute bottom-1 ">
        <CatPopUp accountList={accountList} setAccountList={setAccountList} />
      </div>
    </div>
  );
}

export default App;
