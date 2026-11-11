import {
  Building2,
  Contact,
  Users,
  Target,
  Handshake,
  CheckSquare,
  Activity,
  CalendarDays,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import {
  useDashboardReport,
  useSalesReport,
  useLeadFunnelReport,
  useTaskReport,
} from '../hooks/useReports';

export default function ReportsPage() {
  const { data: dashboard, isLoading: dashboardLoading } =
    useDashboardReport();

  const { data: sales, isLoading: salesLoading } = useSalesReport();

  const { data: leadFunnel, isLoading: leadLoading } =
    useLeadFunnelReport();

  const { data: tasks, isLoading: taskLoading } = useTaskReport();

  const loading =
    dashboardLoading || salesLoading || leadLoading || taskLoading;

  if (loading) {
    return <div className="p-6">Loading reports...</div>;
  }

  const taskChartData = [
    {
      name: 'Completed',
      value: tasks?.completed_tasks ?? 0,
    },
    {
      name: 'Pending',
      value: tasks?.pending_tasks ?? 0,
    },
  ];

  const salesChartData = [
    {
      name: 'Won',
      value: sales?.won_deals ?? 0,
    },
    {
      name: 'Lost',
      value: sales?.lost_deals ?? 0,
    },
    {
      name: 'Open',
      value: sales?.open_deals ?? 0,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>

        <p className="mt-1 text-sm text-slate-500">
          CRM performance and business analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReportCard
          title="Companies"
          value={dashboard?.companies ?? 0}
          icon={<Building2 size={20} />}
        />

        <ReportCard
          title="Contacts"
          value={dashboard?.contacts ?? 0}
          icon={<Contact size={20} />}
        />

        <ReportCard
          title="Leads"
          value={dashboard?.leads ?? 0}
          icon={<Target size={20} />}
        />

        <ReportCard
          title="Deals"
          value={dashboard?.deals ?? 0}
          icon={<Handshake size={20} />}
        />

        <ReportCard
          title="Tasks"
          value={dashboard?.tasks ?? 0}
          icon={<CheckSquare size={20} />}
        />

        <ReportCard
          title="Activities"
          value={dashboard?.activities ?? 0}
          icon={<Activity size={20} />}
        />

        <ReportCard
          title="Calendar Events"
          value={dashboard?.calendar_events ?? 0}
          icon={<CalendarDays size={20} />}
        />

        <ReportCard
          title="Users"
          value={dashboard?.users ?? 0}
          icon={<Users size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <DollarSign size={22} className="text-green-600" />

            <h2 className="text-lg font-semibold text-slate-800">
              Sales
            </h2>
          </div>

          <div className="space-y-4">
            <Metric
              label="Total Sales"
              value={`€${Number(
                sales?.total_sales ?? 0,
              ).toLocaleString()}`}
            />

            <Metric
              label="Average Sale"
              value={`€${Number(
                sales?.average_sale ?? 0,
              ).toLocaleString()}`}
            />

            <Metric
              label="Conversion Rate"
              value={`${Number(sales?.conversion_rate ?? 0).toFixed(
                1,
              )}%`}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <TrendingUp size={22} className="text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-800">
              Deal Performance
            </h2>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Lead Funnel
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadFunnel?.statuses ?? []}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="status" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Task Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#22c55e" />

                  <Cell fill="#f59e0b" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

type ReportCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function ReportCard({ title, value, icon }: ReportCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}
