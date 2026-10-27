import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Wallet, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";

export const StatsCards = () => {
  const { pul, totalIncome, totalExpense, transactions } = useContext(UserContext);

  const stats = [
    {
      label: "Mavjud Mablag'",
      value: `${Number(pul).toLocaleString()} so'm`,
      icon: Wallet,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      change: "Joriy balans",
    },
    {
      label: "Jami Kirim",
      value: `+${Number(totalIncome).toLocaleString()} so'm`,
      icon: ArrowUpRight,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      change: "Kirimlar yig'indisi",
    },
    {
      label: "Jami Chiqim",
      value: `-${Number(totalExpense).toLocaleString()} so'm`,
      icon: ArrowDownRight,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      change: "Xarajatlar yig'indisi",
    },
    {
      label: "O'tkazmalar",
      value: `${transactions.length} ta`,
      icon: Activity,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      change: "Barcha amallar",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats.map((stat, i) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={i}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-slate-700 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400 truncate">
                {stat.label}
              </span>
              <div
                className={`w-8 h-8 rounded-xl ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center shrink-0`}
              >
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-mono text-white truncate">
                {stat.value}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block truncate">
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
