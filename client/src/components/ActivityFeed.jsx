import { Sun, User, DollarSign, ClipboardList } from "lucide-react";

const ActivityFeed = () => (
  <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl transition-colors duration-500 h-full">
    <h2 className="text-xl font-semibold border-b pb-3 mb-4 text-slate-800 dark:text-white border-gray-200 dark:border-slate-700">
      Recent Activity
    </h2>
    <ul className="space-y-4">
      {[
        {
          time: "1 min ago",
          desc: "User Jane Doe logged in.",
          color: "text-sky-500",
          icon: <User className="w-4 h-4" />,
        },
        {
          time: "1 hr ago",
          desc: "Invoice #1098 submitted.",
          color: "text-amber-500",
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          time: "3 hrs ago",
          desc: "New feature deployed to staging.",
          color: "text-green-500",
          icon: <ClipboardList className="w-4 h-4" />,
        },
        {
          time: "1 day ago",
          desc: "Database backup completed.",
          color: "text-indigo-500",
          icon: <Sun className="w-4 h-4" />,
        },
      ].map((activity, index) => (
        <li key={index} className="flex items-start text-sm dark:text-gray-300">
          <div className={`mr-3 ${activity.color}`}>{activity.icon}</div>
          <div className="flex-1">
            <span className={`font-medium`}>{activity.desc}</span>
          </div>
          <span className="text-gray-400 text-xs whitespace-nowrap ml-4 pt-0.5">
            {activity.time}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityFeed;
