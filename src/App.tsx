import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from './components/DatePicker';
import { useState } from 'react';
import TransactionList from './components/TransactionList';
import ChartComponent from './components/ChartComponent';
import CatPopUp from './components/CatPopUp';

export interface Expense {
  name: string;
  amount: number;
  category: string;
  date: Date;
  account: Account;
}

export interface Account {
  name: string;
  type: string;
}

function App() {
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
    category: 'Default',
    accountname: 'Unassigned', // by default if accType and category are not set.
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accountobj = accountList.find(
      (account) => account.name == formData.accountname,
    );

    const newExpense: Expense = {
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date,
      account: accountobj
        ? accountobj
        : { name: 'Unassigned', type: 'default' },
    };
    const newexp = +totalExp + +formData.amount;
    setTotalExp(newexp); // total amount spent for graph
    setExpenseList([...expenseList, newExpense]);
    setFormData({
      name: '',
      amount: 0,
      category: 'Default',
      accountname: 'Default',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex h-screen bg-[url('./wave-haikei.png')] ">
      <div className="trans-wrapper h-full w-1/2">
        <TransactionList list={expenseList} />
      </div>
      <div className="dashboard-charts-wrapper w-1/2">
        <div className="mx-6 my-6 flex h-2/5  justify-center rounded-xl  bg-white p-4">
          <div className="expense-modifier-wrapper flex">
            <form onSubmit={handleSubmit}>
              <div className="flex ">
                <div className="mx-2 my-4 ">
                  <Input
                    required
                    type="text"
                    placeholder="Expense Name"
                    name="name"
                    id="expense-name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mx-2 my-4 ">
                  <Input
                    placeholder="Expense Amount"
                    type="number"
                    id="expense-amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="mx-2 my-4">
                  <Select
                    onValueChange={(e) =>
                      setFormData({ ...formData, ['category']: e })
                    }
                    defaultValue="Unassigned"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Expense Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dining">Dining</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mx-2 my-4">
                  <Select
                    onValueChange={(e) =>
                      setFormData({ ...formData, ['accountname']: e })
                    }
                    defaultValue="Unassigned"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountList.map((account, index) => {
                        return (
                          <SelectItem value={account.name} key={index}>
                            {account.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-center">
                <DatePicker date={date} setDate={setDate} />
              </div>
              <div className="my-4 flex justify-center">
                <Button type="submit" className="bg-custsec">
                  Add Record
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="m-4 flex h-1/2  rounded-xl bg-white">
          <ChartComponent expenseList={expenseList} />
        </div>
      </div>
      <div className="modal-wrapper absolute bottom-1 ">
        <CatPopUp accountList={accountList} setAccountList={setAccountList} />
      </div>
    </div>
  );
}

export default App;
