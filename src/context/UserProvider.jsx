import React, { useState, useEffect, useMemo } from "react";
import { UserContext } from "./UserContext";

const INITIAL_NAME = "Abduali Abudrazzakov ";
const INITIAL_AVATAR = "👨‍💻";
const INITIAL_CARD_NUMBER = "8600 4521 9081 3342";
const INITIAL_BALANCE = 2500000;
const INITIAL_TRANSACTIONS = [
  {
    id: "1",
    title: "Oylik Maosh",
    amount: 3000000,
    category: "Maosh",
    type: "income",
    date: "14.10.2026, 10:00",
  },
  {
    id: "2",
    title: "Supermarket xaridi",
    amount: 500000,
    category: "Supermarket",
    type: "expense",
    date: "14.10.2026, 14:30",
  },
];

const formatCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem("payflow_name") || INITIAL_NAME;
    } catch {
      return INITIAL_NAME;
    }
  });

  const [avatar, setAvatar] = useState(() => {
    try {
      return localStorage.getItem("payflow_avatar") || INITIAL_AVATAR;
    } catch {
      return INITIAL_AVATAR;
    }
  });

  const [cardNumber] = useState(() => {
    try {
      return localStorage.getItem("payflow_card") || INITIAL_CARD_NUMBER;
    } catch {
      return INITIAL_CARD_NUMBER;
    }
  });

  const [pul, setPul] = useState(() => {
    try {
      const saved = localStorage.getItem("payflow_pul");
      return saved !== null ? Number(saved) : INITIAL_BALANCE;
    } catch {
      return INITIAL_BALANCE;
    }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("payflow_transactions");
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("payflow_name", name);
    } catch (e) {
      console.error(e);
    }
  }, [name]);

  useEffect(() => {
    try {
      localStorage.setItem("payflow_avatar", avatar);
    } catch (e) {
      console.error(e);
    }
  }, [avatar]);

  useEffect(() => {
    try {
      localStorage.setItem("payflow_pul", pul.toString());
    } catch (e) {
      console.error(e);
    }
  }, [pul]);

  useEffect(() => {
    try {
      localStorage.setItem("payflow_transactions", JSON.stringify(transactions));
    } catch (e) {
      console.error(e);
    }
  }, [transactions]);

  const showToast = (message, type = "info") => {
    setNotification({ message, type });
  };

  const closeToast = () => {
    setNotification(null);
  };

  const pull_qoshdim = (amount, title, category = "Maosh") => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      showToast("Noto'g'ri summa kiritildi!", "error");
      return false;
    }

    const newTx = {
      id: Date.now().toString(),
      title: title || `${category} to'ldirish`,
      amount: num,
      category: category || "Boshqa",
      type: "income",
      date: formatCurrentDate(),
    };

    setPul((prev) => prev + num);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`+${num.toLocaleString()} so'm hisobingizga qo'shildi!`, "success");
    return true;
  };

  const pull_oldim = (amount, title, category = "Boshqa") => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      showToast("Noto'g'ri summa kiritildi!", "error");
      return false;
    }

    if (num > pul) {
      showToast("Hisobda yetarli mablag' mavjud emas!", "error");
      return false;
    }

    const newTx = {
      id: Date.now().toString(),
      title: title || `${category} xarajati`,
      amount: num,
      category: category || "Boshqa",
      type: "expense",
      date: formatCurrentDate(),
    };

    setPul((prev) => prev - num);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`-${num.toLocaleString()} so'm muvaffaqiyatli yechildi!`, "info");
    return true;
  };

  const clearTransactions = () => {
    setTransactions([]);
    showToast("Tranzaksiyalar tarixi tozalandi!", "info");
  };

  const resetBalance = () => {
    setPul(INITIAL_BALANCE);
    setTransactions(INITIAL_TRANSACTIONS);
    setName(INITIAL_NAME);
    setAvatar(INITIAL_AVATAR);
    showToast("Hamyon ma'lumotlari qayta tiklandi!", "info");
  };

  const totalIncome = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  }, [transactions]);

  const value = {
    name,
    setName,
    avatar,
    setAvatar,
    cardNumber,
    pul,
    totalIncome,
    totalExpense,
    transactions,
    notification,
    pull_qoshdim,
    pull_oldim,
    clearTransactions,
    resetBalance,
    showToast,
    closeToast,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

