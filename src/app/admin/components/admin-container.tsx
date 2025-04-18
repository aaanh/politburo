"use client";

import I18nProvider from "@/contexts/i18n-context";
import AdminClient from "./admin-client";
import Footer from "@/components/footer";

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
      <div className="mx-auto my-4 p-4 container">
        <Footer />
      </div>
    </I18nProvider>
  );
}
