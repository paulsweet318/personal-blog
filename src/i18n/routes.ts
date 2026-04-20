import type { Lang } from './ui';

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!base) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}

export function localePath(lang: Lang, path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const localizedPath = lang === 'en' ? `/en${normalizedPath === '/' ? '/' : normalizedPath}` : normalizedPath;

  return withBase(localizedPath);
}

export function postPath(lang: Lang, slug: string): string {
  return localePath(lang, `/posts/${slug}/`);
}

export function oppositeLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}
