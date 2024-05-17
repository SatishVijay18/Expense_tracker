import { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import InputTabs from './components/InputTabs';
import { DataTable } from './components/Table/DataTable';

import { columns } from './components/Table/Columns';

export interface Expense {
  name: string;
  amount: number;
  description: string;
  date: Date;
  account: Account;
  accountName: string;
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
  const [accountList, setAccountList] = useState<Account[]>([
    { name: 'Axis', type: 'Bank' },
    { name: 'Myzone', type: 'Card' },
    { name: 'Bonus', type: 'Cash' },
  ]);
  const [totalExp, setTotalExp] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    description: '',
    accountname: '', // by default if accType and description are not set.
  });

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
      accountName: accountobj ? accountobj.name : 'Unassigned', // set accountName
    };

    // total singular expense
    const newexp = +totalExp + +formData.amount;
    setTotalExp(newexp); // total amount spent for graph
    setExpenseList([...expenseList, newExpense]); // total expense

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
    <div className="flex h-screen flex-col bg-[url('/layered-waves-haikei.png')] bg-cover lg:flex-row ">
      <div className="trans-wrapper  w-full   lg:h-full lg:w-1/2">
        <div className="mx-2 md:mt-6">
          <DataTable columns={columns} data={expenseList} />
        </div>
      </div>
      <div className="dashboard-charts-wrapper h-3/4 w-full lg:h-full lg:w-1/2">
        <div className="mx-6 my-6 flex h-[45%] items-center  justify-center rounded-xl  bg-white bg-opacity-70 lg:p-4">
          <InputTabs
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
            accountList={accountList}
            date={date}
            setDate={setDate}
            setExpenseToggle={setexpenseToggle}
            setAccountList={setAccountList}
          />
        </div>
        <div className="m-4 flex h-[45%]  rounded-xl bg-white bg-opacity-70">
          <ChartComponent
            expenseList={expenseList}
            expenseToggle={expenseToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
