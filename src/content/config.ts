import { defineCollection, z } from 'astro:content';

const lang = z.enum(['zh', 'en']);

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang,
    urlSlug: z.string(),
    draft: z.boolean().default(false),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    translationKey: z.string().optional(),
  }),
});

const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang,
    urlSlug: z.string(),
    draft: z.boolean().default(false),
    description: z.string(),
    location: z.string().optional(),
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          width: z.number().positive().optional(),
          height: z.number().positive().optional(),
        }),
      )
      .min(1),
    translationKey: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang,
    description: z.string().optional(),
  }),
});

export const collections = { posts, photos, pages };
