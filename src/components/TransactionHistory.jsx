import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  Search,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
} from "lucide-react";

export const TransactionHistory = () => {
  const { transactions, clearTransactions } = useContext(UserContext);
  const [filter, setFilter] = useState("all"); // 'all' | 'income' | 'expense'
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter =
      filter === "all" ? true : filter === "income" ? tx.type === "income" : tx.type === "expense";

    const matchesSearch =
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase()) ||
      tx.amount.toString().includes(search);

    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (tx) => {
    if (tx.type === "income") {
      return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
    }
    return <ArrowDownRight className="w-4 h-4 text-rose-400" />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>O'tkazmalar Tarixi</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {transactions.length}
            </span>
          </h3>
          <p className="text-xs text-slate-400">Oxirgi kirim va chiqim amallari</p>
        </div>

        {transactions.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Barcha tranzaksiyalar tarixini o'chirishni xohlaysizmi?")) {
                clearTransactions();
              }
            }}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-rose-500/40 hover:bg-rose-500/10 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tarixni tozalash</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Qidiruv (nom yoki kategoriya)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800/80 shrink-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter("income")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "income"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Kirimlar
          </button>
          <button
            onClick={() => setFilter("expense")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === "expense"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Chiqimlar
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-500 mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-300">Hech qanday o'tkazma topilmadi</p>
            <p className="text-xs text-slate-500 mt-1">
              {search ? "Qidiruv so'zini o'zgartirib ko'ring" : "Yangi amal bajaring"}
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isIncome = tx.type === "income";
            return (
              <div
                key={tx.id}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-950 transition-all"
              >
                {/* Left: Icon & Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isIncome
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                    }`}
                  >
                    {getCategoryIcon(tx)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">
                        {tx.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 font-medium shrink-0">
                        {tx.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {tx.date}
                    </span>
                  </div>
                </div>

                {/* Right: Amount */}
                <div className="text-right shrink-0 pl-3">
                  <div
                    className={`text-sm sm:text-base font-bold font-mono ${
                      isIncome ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {Number(tx.amount).toLocaleString()} so'm
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                    {isIncome ? "Kirim" : "Chiqim"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
