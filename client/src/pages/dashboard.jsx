import { User, DollarSign, ClipboardList } from "lucide-react";
import ActivityFeed from "../components/ActivityFeed";
import StatCard from "../components/StatCard";

const DashboardPage = () => {
  return (
    <div className="p-2 pb-18 md:pb-2 md:p-10">
      <div className="space-y-8 p-4 md:p-0">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-500">
          Analytics Dashboard
        </h1>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value="2,456"
            icon={<User className="w-7 h-7 text-sky-500" />}
            colorClass="border-sky-500"
          />
          <StatCard
            title="Revenue"
            value="$125,890"
            icon={<DollarSign className="w-7 h-7 text-green-500" />}
            colorClass="border-green-500"
          />
          <StatCard
            title="Open Tickets"
            value="42"
            icon={<ClipboardList className="w-7 h-7 text-amber-500" />}
            colorClass="border-amber-500"
          />
        </div>
        {/* Charts and Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
