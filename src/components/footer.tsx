"use client";

import { useI18n } from "@/contexts/i18n-context";

export default function Footer() {
  const { t } = useI18n();

  return (
    <div className="mx-auto container">
      <footer className="bg-accent/25 p-2 border md:rounded-xl text-sm">
        {t("footer")}
      </footer>
    </div>
  );
}
