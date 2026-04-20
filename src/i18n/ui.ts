export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh';

export const ui = {
  zh: {
    siteTitle: 'Personal Blog',
    posts: '文章',
    photos: '照片',
    about: '关于',
    language: 'English',
    latestPosts: '文章',
    latestPhotos: '照片',
    noPosts: '还没有文章。',
    noPhotos: '还没有照片记录。',
  },
  en: {
    siteTitle: 'Personal Blog',
    posts: 'Posts',
    photos: 'Photos',
    about: 'About',
    language: '中文',
    latestPosts: 'Posts',
    latestPhotos: 'Photos',
    noPosts: 'No posts yet.',
    noPhotos: 'No photo notes yet.',
  },
} as const;
