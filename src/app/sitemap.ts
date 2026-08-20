import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beachbar-corleone.com';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}?lang=en`,
          de: `${baseUrl}?lang=de`,
          hr: `${baseUrl}?lang=hr`,
        },
      },
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
