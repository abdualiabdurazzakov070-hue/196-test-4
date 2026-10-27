import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const Toast = ({ notification, onClose }) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const isSuccess = notification.type === "success";
  const isError = notification.type === "error";

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-bounce-in transition-all">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
          isSuccess
            ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
            : isError
            ? "bg-rose-950/90 border-rose-500/40 text-rose-200"
            : "bg-indigo-950/90 border-indigo-500/40 text-indigo-200"
        }`}
      >
        <div className="shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-400" />}
        </div>
        <p className="text-sm font-medium flex-1 text-white">{notification.message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
