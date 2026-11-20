import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asupan",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <Script
          src="https://cdn.apitiny.net/scripts/v2.0/main.js"
          data-site-id="6b003be89918cebbd63bb515"
          data-test-mode="false"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
