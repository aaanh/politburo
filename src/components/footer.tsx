import { useI18n } from "@/contexts/i18n-context";

export default function Footer() {
  const year = new Date().getFullYear();

  const { t } = useI18n();

  return (
    <footer className="bg-accent/25 p-4 border rounded-xl">
      {t("footer")}
    </footer>
  );
}
