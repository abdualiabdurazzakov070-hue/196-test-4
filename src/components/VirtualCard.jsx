import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  Wifi,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export const VirtualCard = () => {
  const { name, pul, cardNumber, totalIncome, totalExpense, showToast } =
    useContext(UserContext);
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s+/g, ""));
    setCopied(true);
    showToast("Karta raqami nusxalandi!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 3D Glassmorphic Debit Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-indigo-950/80 to-purple-950 border border-indigo-500/30 shadow-2xl shadow-indigo-950/50 group transition-all duration-300 hover:shadow-indigo-500/10 hover:border-indigo-500/50">
        {/* Ambient background glows */}
        <div className="absolute -right-16 -top-16 w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/30 transition-all"></div>
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/30 transition-all"></div>

        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-wider bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              PAYFLOW BLACK
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              PLATINUM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-indigo-300/80 rotate-90" />
            <div className="font-mono font-black italic tracking-wider text-sm bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              UZCARD
            </div>
          </div>
        </div>

        {/* Card Chip & Balance Row */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          {/* Metallic Chip */}
          <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 p-1 flex flex-col justify-between shadow-md border border-amber-200/40 opacity-90">
            <div className="w-full h-[1px] bg-amber-600/40"></div>
            <div className="w-full h-[1px] bg-amber-600/40"></div>
            <div className="w-full h-[1px] bg-amber-600/40"></div>
          </div>

          {/* Balance display */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs text-indigo-200/70 mb-0.5">
              <span>Umumiy Balans</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="hover:text-white transition-colors p-0.5 rounded"
                title={showBalance ? "Yashirish" : "Ko'rsatish"}
              >
                {showBalance ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-sm">
              {showBalance ? (
                <>
                  <span className="text-emerald-400">
                    {Number(pul).toLocaleString()}
                  </span>{" "}
                  <span className="text-xs font-sans text-slate-300 font-semibold">
                    so'm
                  </span>
                </>
              ) : (
                <span className="tracking-widest text-slate-400 text-xl">
                  •••••••• so'm
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Number */}
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <span className="font-mono text-base sm:text-lg tracking-[0.2em] text-slate-200 font-semibold drop-shadow">
            {cardNumber}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition active:scale-90"
            title="Karta raqamini nusxalash"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
              Karta Egasi
            </span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
              {name || "FOYDALANUVCHI"}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
              Amal qilish
            </span>
            <span className="text-xs font-mono font-bold text-slate-200">
              09/28
            </span>
          </div>
        </div>
      </div>

      {/* Mini Income/Expense Bar under the card */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-medium text-slate-400 block truncate">
              Kirimlar
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono truncate block">
              +{Number(totalIncome).toLocaleString()} so'm
            </span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <ArrowDownRight className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-medium text-slate-400 block truncate">
              Chiqimlar
            </span>
            <span className="text-sm font-bold text-rose-400 font-mono truncate block">
              -{Number(totalExpense).toLocaleString()} so'm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
