import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/DatePicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Account, FormDataType } from './TypeExports';
import CatPopUp from './CatPopUp';

function InputTabs({
  handleSubmit,
  handleInputChange,
  formData,
  setFormData,
  accountList,
  date,
  setDate,
  setExpenseToggle,
  setAccountList,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  accountList: Account[];
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setExpenseToggle: React.Dispatch<React.SetStateAction<string>>;
  setAccountList: React.Dispatch<React.SetStateAction<Account[]>>;
}) {
  return (
    <div className="expense-modifier-wrapper flex">
      <Tabs defaultValue="expense">
        <TabsList className="flex">
          <TabsTrigger
            value="expense"
            onClick={() => setExpenseToggle('expense')}
          >
            Expense
          </TabsTrigger>
          <TabsTrigger
            value="income"
            onClick={() => setExpenseToggle('income')}
          >
            Income
          </TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
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
                  required
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
              <div className="mx-2 my-4 ">
                <Input
                  placeholder="Expense Description"
                  type="text"
                  id="expense-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mx-2 my-4 flex">
                <Select
                  required
                  onValueChange={(e) =>
                    setFormData({ ...formData, ['accountname']: e })
                  }
                  defaultValue="Unassigned"
                  value={formData.accountname}
                >
                  <SelectTrigger className="w-[125px]">
                    <SelectValue placeholder="Account" />
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
                <CatPopUp
                  accountList={accountList}
                  setAccountList={setAccountList}
                />
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
        </TabsContent>
        <TabsContent value="income">
          <form onSubmit={handleSubmit}>
            <div className="flex ">
              <div className="mx-2 my-4 ">
                <Input
                  required
                  type="text"
                  placeholder="Income Name"
                  name="name"
                  id="expense-name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mx-2 my-4 ">
                <Input
                  required
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Income Amount"
                  type="number"
                  id="expense-amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mx-2 my-4 ">
                <Input
                  placeholder="Income Description"
                  type="text"
                  id="expense-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mx-2 my-4 flex">
                <Select
                  required
                  onValueChange={(e) =>
                    setFormData({ ...formData, ['accountname']: e })
                  }
                  defaultValue="Unassigned"
                  value={formData.accountname}
                >
                  <SelectTrigger className="w-[125px]">
                    <SelectValue placeholder="Account" />
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
                <CatPopUp
                  accountList={accountList}
                  setAccountList={setAccountList}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="my-4 flex justify-center">
              <Button type="submit" className="bg-custsec hover:bg-custquart">
                Add Record
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default InputTabs;
