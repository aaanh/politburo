import NavBarWrapper from "./components/nav-bar-wrapper";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <NavBarWrapper locale={params.locale} i18nNamespaces={["default"]} />
      {children}
    </>
  );
}
