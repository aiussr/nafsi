import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { isRTL } from '@/i18n';
import type { LocalizedString } from '@/types';

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language as 'en' | 'he' | 'ar';
  const rtl = isRTL(currentLang);
  const dir = rtl ? 'rtl' : 'ltr';

  const switchLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    },
    [i18n]
  );

  const t = useCallback(
    (localized: LocalizedString | undefined): string => {
      if (!localized) return '';
      return localized[currentLang] || localized.en || '';
    },
    [currentLang]
  );

  return { currentLang, rtl, dir, switchLanguage, t };
}
