import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "@/i18nConfig";

interface InitTranslationsParams {
  locale: string;
  namespaces: string[];
  i18nInstance?: ReturnType<typeof createInstance>;
  resources?: Record<string, any>;
}

export default async function initTranslations(
  locale: InitTranslationsParams["locale"],
  namespaces: InitTranslationsParams["namespaces"],
  i18nInstance?: InitTranslationsParams["i18nInstance"],
  resources?: InitTranslationsParams["resources"]
): Promise<{
  i18n: ReturnType<typeof createInstance>;
  resources: Record<string, any>;
  t: (key: string, options?: Record<string, any>) => string;
}> {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
}
