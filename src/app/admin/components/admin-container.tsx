"use client";

import I18nProvider from "@/contexts/i18n-context";
import AdminClient from "./admin-client";

interface AdminContainerProps {
  locale: string;
  i18nNamespaces: string[];
}

export default function AdminContainer({
  locale,
  i18nNamespaces,
}: AdminContainerProps) {
  return (
    <I18nProvider locale={locale} namespaces={i18nNamespaces}>
      <AdminClient />
    </I18nProvider>
  );
}
