import { LineChart } from '@mui/x-charts/LineChart';
import { Expense } from '@/App';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ChartComponent({
  expenseList,
  expenseToggle,
}: {
  expenseList: Expense[];
  expenseToggle: string;
}) {
  const [filterparam, setFilterParam] = useState(0);
  const toggle = expenseToggle == 'expense' ? true : false;
  const xData: number[] = [];
  const xlabel: string[] = [];
  expenseList.map((expense) => {
    xData.push(expense.amount);
    xlabel.push(expense.date.toLocaleDateString());
  });
  const currentDate = new Date();

  const filterDate = new Date(
    new Date().setDate(new Date().getDate() - filterparam),
  );

  const dateFilter = () => {
    const filteredExpenses = expenseList.filter((expense) => {
      if (filterparam === 0) {
        return true;
      } else {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getTime() <= currentDate.getTime() &&
          expenseDate.getTime() >= filterDate.getTime()
        );
      }
    });

    xData.length = 0;
    xlabel.length = 0;
    filteredExpenses.forEach((expense) => {
      if (toggle) {
        if (expense.type == 'expense') {
          xData.push(expense.amount);
          xlabel.push(expense.date.toLocaleDateString());
        }
      } else if (expense.type !== 'expense') {
        xData.push(expense.amount);
        xlabel.push(expense.date.toLocaleDateString());
      }
    });
  };

  const handleSelectChange = (value: string) => {
    const filterparam = parseInt(value);
    if (filterparam == 0) {
      setFilterParam(0);
    } else if (filterparam == 30) {
      setFilterParam(30);
    } else if (filterparam == 90) {
      setFilterParam(90);
    } else if (filterparam == 180) {
      setFilterParam(180);
    } else if (filterparam == 365) {
      setFilterParam(365);
    }
  };

  console.log(filterparam);
  dateFilter();

  return (
    <div className="flex h-full w-full flex-col font-Poetsen">
      <div className=" mt-2 flex w-full items-center justify-center">
        <Label className="mx-2"> Pick Date Range</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="0"
              onSelect={() => {
                if (filterparam !== 30) {
                  setFilterParam(30);
                }
              }}
            >
              All Time
            </SelectItem>
            <SelectItem
              value="30"
              onSelect={() => {
                if (filterparam !== 30) {
                  setFilterParam(30);
                }
              }}
            >
              last 30 days
            </SelectItem>
            <SelectItem
              value="90"
              onClick={() => {
                if (filterparam !== 90) {
                  setFilterParam(90);
                }
              }}
            >
              last 90 days
            </SelectItem>
            <SelectItem
              value="180"
              onClick={() => {
                if (filterparam !== 180) {
                  setFilterParam(180);
                }
              }}
            >
              last 6 months
            </SelectItem>
            <SelectItem
              value="365"
              onClick={() => {
                if (filterparam !== 365) {
                  setFilterParam(365);
                }
              }}
            >
              last 1 year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" pt-2 text-center font-Poetsen text-xl">
        {toggle ? <h1>Expense</h1> : <h1>Income</h1>}
      </div>

      <div className="flex h-full w-full justify-center">
        {' '}
        <LineChart
          series={[{ data: xData }]}
          xAxis={[{ scaleType: 'point', data: xlabel }]}
        />
      </div>
    </div>
  );
}
