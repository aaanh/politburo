"use client";

import { Position } from "@/components/position-node";
import I18nProvider from "@/contexts/i18n-context";
import Home from "./home";
import Footer from "@/components/footer";

interface HomeWrapperProps {
  locale: string;
  i18nNamespaces: string[];
  positions: Position[];
}

export default function HomeWrapper({
  locale,
  i18nNamespaces,
  positions,
}: HomeWrapperProps) {
  return (
    <I18nProvider locale={locale} namespaces={i18nNamespaces}>
      <Home initialPositions={positions} />

      <Footer />
    </I18nProvider>
  );
}
