import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import initTranslations from "@/lib/i18n";

type I18nConfig = Awaited<ReturnType<typeof initTranslations>>;

export const I18nContext = createContext<I18nConfig | null>(null);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
};

export default function I18nProvider({
  children,
  locale,
  namespaces,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
}) {
  const [i18nData, setI18nData] = useState<Awaited<
    ReturnType<typeof initTranslations>
  > | null>(null);

  useEffect(() => {
    initTranslations(locale, namespaces).then(setI18nData);
  }, [locale, namespaces]);

  if (!i18nData) return null; // or loading fallback

  return (
    <I18nContext.Provider value={i18nData}>{children}</I18nContext.Provider>
  );
}
