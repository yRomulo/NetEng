import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { netengContact } from "@/data/companyData";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap"
});

const siteDescription =
  "Soluções integradas de engenharia em Automação, Elétrica e Telecomunicações para a indústria de Óleo & Gás e para o mercado predial. Rio das Ostras - RJ.";

export const metadata: Metadata = {
  metadataBase: new URL(netengContact.website),
  title: {
    default: "NETENG Engenharia | Automação, Elétrica e Telecom",
    template: "%s | NETENG Engenharia"
  },
  description: siteDescription,
  applicationName: "NETENG Engenharia",
  keywords: [
    "NETENG",
    "engenharia elétrica",
    "telecomunicações",
    "fibra óptica",
    "automação predial",
    "infraestrutura de redes",
    "óleo e gás",
    "Rio das Ostras"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: netengContact.website,
    siteName: "NETENG Engenharia",
    title: "NETENG Engenharia | Automação, Elétrica e Telecom",
    description: siteDescription
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: netengContact.name,
  legalName: netengContact.legalName,
  url: netengContact.website,
  email: netengContact.email,
  telephone: netengContact.phone,
  foundingDate: String(netengContact.foundedYear),
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: netengContact.address.street,
    addressLocality: netengContact.address.city,
    addressRegion: netengContact.address.state,
    addressCountry: "BR"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <main className="pt-[80px]">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
