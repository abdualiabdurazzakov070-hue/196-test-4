import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Wallet, Sparkles, User, RefreshCw } from "lucide-react";

export const Navbar = ({ onOpenProfile }) => {
  const { name, avatar, resetBalance } = useContext(UserContext);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-30 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                PayFlow
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Faol
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Smart Context Hamyoni</p>
          </div>
        </div>

        {/* Center / Time display on desktop */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Toshkent: {time}</span>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={resetBalance}
            title="Boshlang'ich holatga qaytarish"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Qayta tiklash</span>
          </button>

          {/* Profile pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800/80 border border-slate-700/60 hover:border-indigo-500/50 transition-all text-left group active:scale-98 shadow-sm"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              {avatar || "👤"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors max-w-[110px] sm:max-w-[140px] truncate">
                {name}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <User className="w-2.5 h-2.5 text-indigo-400" /> Profil
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
