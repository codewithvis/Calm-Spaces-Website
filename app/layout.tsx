import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { institutionalIdentity } from "@/content/institutional";

const uiFont = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7436D5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://calmspaces.sgtuniversity.ac.in"),
  title: {
    default: "C.A.L.M Spaces | SGT University · CEAPS",
    template: "%s | C.A.L.M Spaces · SGT University",
  },
  description: "Cultivating Awareness, Lightness & Movement — Official student mental wellness platform at SGT University under CEAPS.",
  keywords: [
    "Calm Spaces",
    "SGT University",
    "CEAPS",
    "Student Mental Health",
    "Counselling SGT University",
    "Mindfulness",
    "Peer Support",
    "Colour the Chaos",
    "Listening Circles",
    "Gurugram student wellness",
  ],
  authors: [{ name: "CEAPS Department, SGT University" }],
  creator: "CEAPS SGT University",
  publisher: "SGT University",
  manifest: "/manifest.json",
  icons: {
    icon: "/calm-spaces-mark.svg",
    shortcut: "/calm-spaces-mark.svg",
    apple: "/calm-spaces-mark.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "C.A.L.M Spaces · SGT University",
    title: "C.A.L.M Spaces | Your Mind Deserves a Space to Bloom",
    description: "Official student mental wellness platform at SGT University under the Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS).",
    images: [
      {
        url: "/calm-spaces-official-logo.png",
        width: 450,
        height: 330,
        alt: "C.A.L.M Spaces Official Logo — SGT University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "C.A.L.M Spaces | SGT University · CEAPS",
    description: "Cultivating Awareness, Lightness & Movement for student well-being at SGT University.",
    images: ["/calm-spaces-official-logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Structured Data (JSON-LD) for Schema.org SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "C.A.L.M Spaces",
    "alternateName": "Cultivating Awareness, Lightness & Movement",
    "url": "https://calmspaces.sgtuniversity.ac.in",
    "logo": "https://calmspaces.sgtuniversity.ac.in/calm-spaces-official-logo.png",
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "SGT University",
      "url": "https://sgtuniversity.ac.in"
    },
    "department": {
      "@type": "Department",
      "name": "Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS)"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room No. 10, Lower Ground Floor, A Block, SGT University",
      "addressLocality": "Budhera, Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122505",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-18001025661",
      "contactType": "student wellness support",
      "email": "helpdesk.calmspaces@sgtuniversity.org",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  return (
    <html
      lang="en"
      className={`${uiFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        {/* Skip to main content landmark for screen-readers & keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-brand-primary)] focus:px-6 focus:py-3 focus:text-xs focus:font-bold focus:text-white focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
