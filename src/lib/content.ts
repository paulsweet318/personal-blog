import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type PostEntry = CollectionEntry<'posts'>;
export type PhotoEntry = CollectionEntry<'photos'>;
export type PageEntry = CollectionEntry<'pages'>;

function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T): number {
  return b.data.date.getTime() - a.data.date.getTime();
}

export async function getPosts(lang: Lang): Promise<PostEntry[]> {
  const posts = await getCollection('posts', ({ data }) => data.lang === lang && !data.draft);

  return posts.sort(byDateDesc);
}

export async function getPhotos(lang: Lang): Promise<PhotoEntry[]> {
  const photos = await getCollection('photos', ({ data }) => data.lang === lang && !data.draft);

  return photos.sort(byDateDesc);
}

export async function getPage(lang: Lang, title: string): Promise<PageEntry | undefined> {
  const pages = await getCollection('pages', ({ data }) => data.lang === lang && data.title === title);

  return pages[0];
}

export async function getPostTranslation(post: PostEntry): Promise<PostEntry | undefined> {
  if (!post.data.translationKey) {
    return undefined;
  }

  const posts = await getCollection(
    'posts',
    ({ data }) => data.translationKey === post.data.translationKey && data.lang !== post.data.lang && !data.draft,
  );

  return posts[0];
}
