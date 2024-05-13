import { LineChart } from '@mui/x-charts/LineChart';
import { Expense } from '@/App';
import { Button } from '@/components/ui/button';

export default function ChartComponent({
  expenseList,
  expenseToggle,
}: {
  expenseList: Expense[];
  expenseToggle: string;
}) {
  const toggle = expenseToggle == 'expense' ? true : false;
  const xData: number[] = [];
  const xlabel: string[] = [];
  expenseList.map((expense) => {
    xData.push(expense.amount);
    xlabel.push(expense.date.toLocaleDateString());
  });
  return (
    <div className="flex h-full w-full flex-col">
      <div className=" mt-2 flex justify-center">
        <Button className="mx-2 mt-2 bg-custtern bg-opacity-90 hover:bg-custquart">
          {' '}
          1 month{' '}
        </Button>
        <Button className="mx-2 mt-2 bg-custtern bg-opacity-90 hover:bg-custquart">
          {' '}
          3 months{' '}
        </Button>
        <Button className="mx-2 mt-2 bg-custtern bg-opacity-90 hover:bg-custquart">
          {' '}
          6 months{' '}
        </Button>
        <Button className="mx-2 mt-2 bg-custtern bg-opacity-90 hover:bg-custquart">
          {' '}
          1 year{' '}
        </Button>
      </div>
      <div className=" pt-2 text-center font-Poetsen text-xl">
        {toggle ? <h1>Expense</h1> : <h1>Income</h1>}
      </div>

      <div className="flex  justify-center">
        {' '}
        <LineChart
          width={300}
          height={200}
          series={[{ data: xData }]}
          xAxis={[{ scaleType: 'point', data: xlabel }]}
        />
      </div>
    </div>
  );
}
