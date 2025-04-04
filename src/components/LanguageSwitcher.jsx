// components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button
      onClick={toggleLang}
      className="absolute top-4 right-6 bg-[#4f45e4] hover:bg-[#3e36c9] text-white text-sm px-4 py-2 rounded shadow transition"
    >
      {i18n.language === "ar" ? "English" : "العربية"}
    </button>
  );
}