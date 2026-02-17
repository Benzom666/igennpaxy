import type { Metadata } from "next";

export const siteConfig = {
  name: "IGEN & PAXY",
  description: "Premium digital marketing agency driving revenue through data-driven strategies, creative excellence, and conversion optimization.",
  url: "https://igenpaxy.com",
  ogImage: "https://igenpaxy.com/og-images/default.jpg",
  links: {
    twitter: "https://twitter.com/igenpaxy",
    linkedin: "https://linkedin.com/company/igenpaxy",
    instagram: "https://instagram.com/igenpaxy",
  },
  contact: {
    email: "hello@igenpaxy.com",
    phone: "+1 (415) 555-1234",
    address: "San Francisco, CA",
  },
};

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: [
      "digital marketing agency",
      "conversion optimization",
      "growth marketing",
      "web development",
      "brand identity",
      "SEO",
      "social media marketing",
      "content production",
      "PPC advertising",
    ],
    authors: [{ name: "IGEN & PAXY" }],
    creator: "IGEN & PAXY",
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
      creator: "@igenpaxy",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
    icons: {
      icon: [
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon-dark-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon.svg",
          type: "image/svg+xml",
        },
      ],
      apple: "/apple-icon.png",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "sales",
      email: siteConfig.contact.email,
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    name,
    description,
    url: `${siteConfig.url}${url}`,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
