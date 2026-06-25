import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './ChartSection.module.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** Build recharts data array for monthly or yearly view */
const buildChartData = (transactions, activeTab, selectedDate) => {
  if (activeTab === 'monthly') {
    const year = parseInt(selectedDate.slice(0, 4), 10);
    const month = parseInt(selectedDate.slice(5, 7), 10);
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthPrefix = selectedDate.slice(0, 7);

    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayStr = String(i + 1).padStart(2, '0');
      const dateKey = `${monthPrefix}-${dayStr}`;
      const dayTxns = transactions.filter((t) => t.date === dateKey);
      return {
        name: String(i + 1),
        income: dayTxns
          .filter((t) => t.type === 'income')
          .reduce((s, t) => s + t.amount, 0),
        expense: dayTxns
          .filter((t) => t.type === 'expense')
          .reduce((s, t) => s + t.amount, 0),
      };
    }).filter((d) => d.income > 0 || d.expense > 0);
  }

  if (activeTab === 'yearly') {
    const year = selectedDate.slice(0, 4);
    return MONTHS.map((name, i) => {
      const monthPrefix = `${year}-${String(i + 1).padStart(2, '0')}`;
      const monthTxns = transactions.filter((t) =>
        t.date.startsWith(monthPrefix)
      );
      return {
        name,
        income: monthTxns
          .filter((t) => t.type === 'income')
          .reduce((s, t) => s + t.amount, 0),
        expense: monthTxns
          .filter((t) => t.type === 'expense')
          .reduce((s, t) => s + t.amount, 0),
      };
    });
  }

  return [];
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className={styles.tooltipRow}>
          {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:{' '}
          ₹{Number(entry.value).toLocaleString('en-IN', { minimumFractionDigits: 0 })}
        </p>
      ))}
    </div>
  );
};

const ChartSection = ({ transactions, activeTab, selectedDate }) => {
  const data = buildChartData(transactions, activeTab, selectedDate);
  const hasData = data.some((d) => d.income > 0 || d.expense > 0);

  return (
    <div className={styles.section}>
      <p className={styles.title}>
        {activeTab === 'monthly' ? 'Daily Overview' : 'Monthly Overview'}
      </p>

      {hasData ? (
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={data}
              margin={{ top: 8, right: 4, left: -22, bottom: 0 }}
              barGap={2}
              barCategoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="var(--color-income)"
                radius={[3, 3, 0, 0]}
                maxBarSize={22}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="var(--color-expense)"
                radius={[3, 3, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className={styles.empty}>
          <span>📊</span>
          <span>No data to display yet</span>
        </div>
      )}
    </div>
  );
};

export default ChartSection;
