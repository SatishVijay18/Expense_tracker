import { LineChart } from '@mui/x-charts/LineChart';
import { Expense } from '@/App';

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
      <div className=" pt-2 text-center font-Poetsen text-xl">
        {toggle ? <h1>Expense</h1> : <h1>Income</h1>}
      </div>

      <div className="flex  justify-center">
        {' '}
        <LineChart
          width={300}
          height={250}
          series={[{ data: xData }]}
          xAxis={[{ scaleType: 'point', data: xlabel }]}
        />
      </div>
    </div>
  );
}
