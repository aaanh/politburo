"use client";

import { Position } from "@/components/position-node";
import I18nProvider from "@/contexts/i18n-context";
import OrgChartClient from "./org-chart-client";

interface HomeContainerProps {
  locale: string;
  i18nNamespaces: string[];
  positions: Position[];
}

export default function HomeContainer({
  locale,
  i18nNamespaces,
  positions,
}: HomeContainerProps) {
  return (
    <I18nProvider locale={locale} namespaces={i18nNamespaces}>
      <OrgChartClient initialPositions={positions} />
    </I18nProvider>
  );
}
