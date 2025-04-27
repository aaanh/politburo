"use client";

import I18nProvider from "@/contexts/i18n-context";
import NavBar from "@/components/nav-bar";
import { useParams } from "next/navigation";

interface NavBarWarpperProps {
  locale: string;
  i18nNamespaces: string[];
}

export default function NavBarWrapper({
  locale,
  i18nNamespaces,
}: NavBarWarpperProps) {
  return (
    <I18nProvider locale={locale} namespaces={i18nNamespaces}>
      <NavBar />
    </I18nProvider>
  );
}
