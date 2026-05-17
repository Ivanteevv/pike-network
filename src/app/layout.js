import { Manrope, Playfair_Display } from "next/font/google";
import { AgeGate } from "@/components/age-gate";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AGE_GATE_SESSION_KEY } from "@/lib/age-gate";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Бар Щука | Сеть баров",
    template: "%s | Бар Щука",
  },
  description:
    'Сеть баров "Щука": главная страница сети и отдельные страницы баров с меню, событиями и контактами.',
  icons: {
    icon: [
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: ["/favicon.ico?v=2"],
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
};

// Keep the approved age gate hidden before React hydrates.
// This intentionally mutates <html>, so RootLayout suppresses that one mismatch.
const ageGateBootScript = `
  (() => {
    try {
      const isSessionApproved = window.sessionStorage.getItem("${AGE_GATE_SESSION_KEY}") === "verified";

      if (isSessionApproved) {
        document.documentElement.dataset.ageGate = "approved";
      }
    } catch (error) {
      delete document.documentElement.dataset.ageGate;
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${manrope.variable} ${playfairDisplay.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: ageGateBootScript }} />
        <AgeGate />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
