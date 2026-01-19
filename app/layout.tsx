import "./globals.css";
import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { ConsentBanner } from "../components/ConsentBanner";

const eventTitle = "Café da Manhã de Precificação — Hub Business";

export const metadata: Metadata = {
  title: eventTitle,
  description:
    "Workshop prático de precificação em Goiânia para ajustar margem, custos e preço certo no seu negócio.",
  metadataBase: new URL("https://hubbusiness.example"),
  openGraph: {
    title: eventTitle,
    description:
      "Uma manhã prática para sair com o preço certo na mão. 15 vagas presenciais.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
window.dataLayer.push({event: 'consent_default', consent_state: {essential: true, analytics: false, marketing: false}});`
          }}
        />
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: eventTitle,
              startDate: process.env.NEXT_PUBLIC_EVENT_DATE
                ? `${process.env.NEXT_PUBLIC_EVENT_DATE}T${process.env.NEXT_PUBLIC_EVENT_TIME || "08:00"}:00-03:00`
                : "2026-01-26T08:00:00-03:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: process.env.NEXT_PUBLIC_EVENT_LOCATION_NAME,
                address: process.env.NEXT_PUBLIC_EVENT_ADDRESS
              },
              image: process.env.NEXT_PUBLIC_LOGO_URL,
              offers: {
                "@type": "Offer",
                price: process.env.NEXT_PUBLIC_EVENT_PRICE_BRL || "97.00",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock"
              },
              organizer: {
                "@type": "Organization",
                name: "Hub Business"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
