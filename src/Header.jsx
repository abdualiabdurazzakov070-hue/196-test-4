import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Navbar } from "./components/Navbar";
import { VirtualCard } from "./components/VirtualCard";
import { StatsCards } from "./components/StatsCards";
import { ActionPanel } from "./components/ActionPanel";
import { TransactionHistory } from "./components/TransactionHistory";
import { ProfileModal } from "./components/ProfileModal";
import { Toast } from "./components/Toast";
import { Sparkles, Shield, Zap } from "lucide-react";

const Header = () => {
  const { name, avatar, notification, closeToast } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 6) return "Xayrli tun";
    if (hour < 11) return "Xayrli tong";
    if (hour < 18) return "Xayrli kun";
    return "Xayrli kech";
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-10 right-1/4 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="fixed top-1/2 left-10 w-72 h-72 bg-emerald-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Global Toast */}
      <Toast notification={notification} onClose={closeToast} />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Navigation Bar */}
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 relative z-10">
        {/* Welcome Banner */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-indigo-600/30 shrink-0">
              {avatar || "👨‍💻"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">
                  {greeting}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {name} <span className="font-normal text-slate-400">| Hamyon boshqaruvi</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span className="flex items-center gap-1 text-slate-300">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" /> Xavfsiz tizim
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" /> Tezkor o'tkazmalar
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-2 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Profilni sozlash</span>
            </button>
          </div>
        </section>

        {/* Analytics Stats Overview */}
        <section>
          <StatsCards />
        </section>

        {/* Two-column layout: Left = Card + Action; Right = Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column (Virtual Card & Action Panel) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <VirtualCard />
            <ActionPanel />
          </div>

          {/* Right Column (Transaction History) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TransactionHistory />

            {/* Quick Tips / Info card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Foydali maslahat</span>
              </div>
              <p>
                Ushbu ilova React 19 Context API texnologiyasi asosida ishlaydi. Ma'lumotlar brauzeringiz xotirasida (localStorage) saqlanadi va sahifani yangilaganda ham yo'qolmaydi.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900/80 bg-slate-950/80 py-6 text-center text-xs text-slate-400 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 PayFlow Hamyon — Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>React 19 Context</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">100% Xavfsiz</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Header;
