import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Lang, translations } from "./translations";

type Translations = typeof translations.en | typeof translations.he;

type LanguageContextType = {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "he" : "en"));
  }, []);

  const t = translations[lang];
  const isRTL = lang === "he";

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-sans" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
