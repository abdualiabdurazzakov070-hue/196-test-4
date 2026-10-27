import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  PlusCircle,
  MinusCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  AlertCircle,
} from "lucide-react";

const QUICK_AMOUNTS = [50000, 100000, 250000, 500000, 1000000];

const INCOME_CATEGORIES = [
  { id: "Maosh", label: "Oylik Maosh", icon: "💼" },
  { id: "Sovg'a", label: "Sovg'a", icon: "🎁" },
  { id: "Keshbek", label: "Keshbek", icon: "💰" },
  { id: "O'tkazma", label: "O'tkazma", icon: "🔄" },
  { id: "Boshqa", label: "Boshqa", icon: "✨" },
];

const EXPENSE_CATEGORIES = [
  { id: "Taom", label: "Taom & Kafe", icon: "🍔" },
  { id: "Supermarket", label: "Supermarket", icon: "🛒" },
  { id: "Transport", label: "Transport", icon: "🚕" },
  { id: "Kommunal", label: "Kommunal", icon: "⚡" },
  { id: "Xaridlar", label: "Xaridlar", icon: "🛍️" },
  { id: "Boshqa", label: "Boshqa", icon: "📦" },
];

export const ActionPanel = () => {
  const { pul, pull_qoshdim, pull_oldim } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("qosh"); // "qosh" | "ol"
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Maosh");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAmount("");
    setTitle("");
    setCategory(tab === "qosh" ? "Maosh" : "Taom");
  };

  const handleQuickSelect = (value) => {
    setAmount(value.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    if (activeTab === "qosh") {
      const defaultTitle = title.trim() || `${category} to'ldirish`;
      const ok = pull_qoshdim(amount, defaultTitle, category);
      if (ok) {
        setAmount("");
        setTitle("");
      }
    } else {
      const defaultTitle = title.trim() || `${category} xarajati`;
      const ok = pull_oldim(amount, defaultTitle, category);
      if (ok) {
        setAmount("");
        setTitle("");
      }
    }
  };

  const isWithdraw = activeTab === "ol";
  const numAmount = Number(amount || 0);
  const isOverBalance = isWithdraw && numAmount > pul;
  const categories = isWithdraw ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
      {/* Tab switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800/80 mb-6">
        <button
          type="button"
          onClick={() => handleTabChange("qosh")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "qosh"
              ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>Pul Qo'shish</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("ol")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "ol"
              ? "bg-rose-600/20 text-rose-300 border border-rose-500/30 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <MinusCircle className="w-4 h-4 text-rose-400" />
          <span>Pul Olish</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Summa (so'm)
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className={`w-full px-4 py-3.5 bg-slate-950 border rounded-2xl text-white font-mono text-xl sm:text-2xl placeholder-slate-600 focus:outline-none transition-colors pr-16 ${
                isOverBalance
                  ? "border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30"
                  : isWithdraw
                  ? "border-slate-800 focus:border-rose-500"
                  : "border-slate-800 focus:border-emerald-500"
              }`}
            />
            <span className="absolute right-4 top-4 text-sm font-semibold text-slate-400 font-sans pointer-events-none">
              SO'M
            </span>
          </div>

          {/* Validation Warning */}
          {isOverBalance && (
            <div className="flex items-center gap-1.5 mt-2 text-rose-400 text-xs font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Hisobda yetarli mablag' yo'q! Maksimal: {Number(pul).toLocaleString()} so'm</span>
            </div>
          )}
        </div>

        {/* Quick amounts chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tezkor tanlov:
            </span>
            {isWithdraw && pul > 0 && (
              <button
                type="button"
                onClick={() => setAmount(pul.toString())}
                className="text-[11px] font-medium text-rose-400 hover:text-rose-300 underline"
              >
                Maksimal ({Number(pul).toLocaleString()} so'm)
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleQuickSelect(val)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white font-mono transition-all active:scale-95"
              >
                +{val >= 1000000 ? `${val / 1000000} mln` : `${val / 1000} ming`}
              </button>
            ))}
          </div>
        </div>

        {/* Category Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Kategoriya
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  category === cat.id
                    ? isWithdraw
                      ? "bg-rose-500/10 border-rose-500/40 text-rose-300 font-semibold shadow-sm"
                      : "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold shadow-sm"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-950"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Title / Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Izoh / Tavsif (ixtiyoriy)
          </label>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isWithdraw ? "Masalan: Tushlik yoki Xarid..." : "Masalan: Oylik maosh..."}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <FileText className="w-4 h-4 text-slate-600 absolute right-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!amount || Number(amount) <= 0 || isOverBalance}
          className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed ${
            isWithdraw
              ? "bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-900/30"
              : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-900/30"
          }`}
        >
          {isWithdraw ? (
            <>
              <TrendingDown className="w-5 h-5" />
              <span>
                {amount ? `${Number(amount).toLocaleString()} so'm yechish` : "Pul yechish"}
              </span>
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              <span>
                {amount ? `${Number(amount).toLocaleString()} so'm qo'shish` : "Pul qo'shish"}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
