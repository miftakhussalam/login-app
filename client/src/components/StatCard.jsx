const StatCard = ({ title, value, icon, colorClass }) => (
  <div
    className={`p-5 rounded-xl shadow-xl flex items-center justify-between transition-all duration-500 
                   bg-white dark:bg-slate-800 border-l-4 ${colorClass}`}
  >
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
        {value}
      </p>
    </div>
    <div className="p-3 rounded-full bg-opacity-20 backdrop-filter backdrop-blur-sm">
      {icon}
    </div>
  </div>
);

export default StatCard;
