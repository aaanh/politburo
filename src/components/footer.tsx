"use client";

import { useI18n } from "@/contexts/i18n-context";

export default function Footer() {
  const { t } = useI18n();

  return (
    <div className="mx-auto my-4 p-4 container">
      <footer className="bg-accent/25 p-4 border rounded-xl">
        {t("footer")}
      </footer>
    </div>
  );
}
