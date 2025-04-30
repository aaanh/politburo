import I18nProvider from "@/contexts/i18n-context";
import AboutWrapper from "./about-wrapper";
import Footer from "@/components/footer";

import NavBarWrapper from "../(home)/[locale]/components/nav-bar-wrapper";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <I18nProvider locale={resolvedLocale} namespaces={["default"]}>
      <NavBarWrapper locale={resolvedLocale} i18nNamespaces={["default"]} />
      <AboutWrapper />
      <Footer />
    </I18nProvider>
  );
}
