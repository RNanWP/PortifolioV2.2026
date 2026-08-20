import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://renan-oliveira-dev.vercel.app";
const GOOGLE_TAG_MANAGER_ID = "GTM-N2R4MVWD";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Renan Oliveira — Desenvolvedor Full Stack",
  description:
    "Portfólio de Renan Oliveira, desenvolvedor Full Stack com projetos em React, TypeScript, Node.js e aplicações web responsivas.",
  keywords: [
    "Renan Oliveira",
    "Desenvolvedor Full Stack",
    "Desenvolvedor React",
    "TypeScript",
    "Node.js",
    "Desenvolvedor em São Paulo",
  ],
  authors: [{ name: "Renan Santos de Oliveira" }],
  creator: "Renan Santos de Oliveira",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Portfólio — Renan Oliveira",
    title: "Renan Oliveira — Desenvolvedor Full Stack",
    description:
      "Trajetória, formação e projetos de Renan Oliveira em desenvolvimento Full Stack.",
  },
  twitter: {
    card: "summary",
    title: "Renan Oliveira — Desenvolvedor Full Stack",
    description:
      "Trajetória, formação e projetos de Renan Oliveira em desenvolvimento Full Stack.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "t-Iae7wYc1AS6ePxgdxol5eB42imzqFiSeqqnFxCs5w",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Renan Santos de Oliveira",
  alternateName: "Renan Oliveira",
  url: SITE_URL,
  image: `${SITE_URL}/images/renan-portrait.webp`,
  jobTitle: "Desenvolvedor Full Stack",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Embu das Artes",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "FIAP",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "UNINOVE",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/renanodev/",
    "https://github.com/RNanWP",
  ],
  knowsAbout: ["React", "TypeScript", "Node.js", "Next.js", "MongoDB", "Docker"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
      </head>
      <Script
        id="google-tag-manager"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`,
        }}
      />
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
