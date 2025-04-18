"use client";

import I18nProvider from "@/contexts/i18n-context";
import PeopleClient from "./people-client";

interface PeopleContainerProps {
  locale: string;
  i18nNamespaces: string[];
}

export default function PeopleContainer({
  locale,
  i18nNamespaces,
}: PeopleContainerProps) {
  return (
    <I18nProvider locale={locale} namespaces={i18nNamespaces}>
      <PeopleClient />
    </I18nProvider>
  );
} 