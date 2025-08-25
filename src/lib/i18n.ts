// src/lib/i18n.ts
import { getRelativeLocaleUrl, getAbsoluteLocaleUrl } from 'astro:i18n';

// Diccionarios
import es from '../locales/es.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
// import zhHant from '../locales/zh-Hant.json'; // ← desactivado
import ko from '../locales/ko.json';

// 👇 sin 'zh-Hant'
export const LOCALES = ['es', 'en', 'fr', 'it', 'ko'] as const;
export type Locale = (typeof LOCALES)[number];

// 👇 sin 'zh-Hant'
const dict: Record<Locale, any> = { es, en, fr, it, ko };

// Normalización
const LOWER_TO_CANONICAL: Record<string, Locale> = {
  es: 'es',
  en: 'en',
  fr: 'fr',
  it: 'it',
  ko: 'ko',
  // 'zh-hant': 'zh-Hant', // ← fuera
};

export function getLocale(Astro?: { currentLocale?: string; url?: URL }): Locale {
  const pathname = Astro?.url?.pathname ?? '';
  const seg0 = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean)[0]?.toLowerCase();
  if (seg0 && LOWER_TO_CANONICAL[seg0]) return LOWER_TO_CANONICAL[seg0];

  const cur = (Astro?.currentLocale ?? '').toLowerCase();
  if (cur && LOWER_TO_CANONICAL[cur]) return LOWER_TO_CANONICAL[cur];

  return 'es';
}

export function t(locale: Locale, key: string, fallback?: string): string {
  const read = (src: any, path: string) =>
    path.split('.').reduce<any>((acc, k) => (acc == null ? acc : acc[k]), src);
  const v = read(dict[locale], key);
  if (v != null && typeof v !== 'object') return String(v);
  const vEs = read(dict.es, key);
  if (vEs != null && typeof vEs !== 'object') return String(vEs);
  return fallback ?? key;
}

export function getAny<T = any>(locale: Locale, key: string): T | undefined {
  const read = (src: any, path: string) =>
    path.split('.').reduce<any>((acc, k) => (acc == null ? acc : acc[k]), src);
  return (read(dict[locale], key) ?? read(dict.es, key)) as T | undefined;
}

export function money(locale: Locale, amount: number, currency = 'EUR') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
export function num(locale: Locale, value: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, opts).format(value);
}

export function lurl(locale: Locale, path = ''): string {
  const u = getRelativeLocaleUrl(locale, path);
  return u.startsWith('/') ? u : `/${u}`;
}
export function lurlAbs(locale: Locale, path = ''): string {
  return getAbsoluteLocaleUrl(locale, path);
}

// 👇 sin 'zh-Hant'
export const LOCALE_LABEL: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
  it: 'IT',
  ko: 'KO',
};

