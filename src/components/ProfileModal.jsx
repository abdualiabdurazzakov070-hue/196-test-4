import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { X, Check, User, Sparkles } from "lucide-react";

const AVATAR_OPTIONS = ["👨‍💻", "👩‍💻", "👑", "🚀", "💼", "⚡", "💎", "🦁", "🧑‍🎨", "🕶️"];

export const ProfileModal = ({ isOpen, onClose }) => {
  const { name, setName, avatar, setAvatar, showToast } = useContext(UserContext);
  const [tempName, setTempName] = useState(name);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!tempName.trim()) {
      showToast("Ism bo'sh bo'lishi mumkin emas!", "error");
      return;
    }
    setName(tempName.trim());
    setAvatar(selectedAvatar);
    showToast("Profil muvaffaqiyatli yangilandi!", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Profilni tahrirlash</h3>
            <p className="text-xs text-slate-400">Ism va avatarni o'zgartiring</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Avatarni tanlang
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedAvatar(item)}
                  className={`w-11 h-11 text-xl flex items-center justify-center rounded-xl border transition-all ${
                    selectedAvatar === item
                      ? "bg-indigo-600/30 border-indigo-500 scale-105 shadow-md shadow-indigo-500/20"
                      : "bg-slate-800/80 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Foydalanuvchi ismi
            </label>
            <div className="relative">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Ismingizni kiriting..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                maxLength={30}
              />
              <Sparkles className="w-4 h-4 text-indigo-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/25"
            >
              <Check className="w-4 h-4" />
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
