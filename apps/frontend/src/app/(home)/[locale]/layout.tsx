import NavBarWrapper from "./components/nav-bar-wrapper";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedLocale =
    typeof (await params).locale === "string" ? (await params).locale : "en";

  return (
    <>
      <NavBarWrapper locale={resolvedLocale} i18nNamespaces={["default"]} />
      {children}
    </>
  );
}
