import { LineChart } from '@mui/x-charts/LineChart';
import { Expense } from '@/App';

export default function ChartComponent({
  expenseList,
}: {
  expenseList: Expense[];
}) {
  const xData: number[] = [];
  const xlabel: string[] = [];
  expenseList.map((expense) => {
    xData.push(expense.amount);
    xlabel.push(expense.date.toLocaleDateString());
  });
  return (
    <LineChart
      width={500}
      height={300}
      series={[{ data: xData }]}
      xAxis={[{ scaleType: 'point', data: xlabel }]}
    />
  );
}
