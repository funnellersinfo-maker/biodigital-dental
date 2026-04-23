import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "BioDigital Dental | Precisión Sin Dolor",
  description:
    "Odontología de precisión con IA y robótica. Implantes robotizados, diseño de sonrisa digital y ortodoncia invisible. Tecnología de vanguardia para resultados perfectos.",
  keywords: [
    "BioDigital",
    "dental",
    "implantes robotizados",
    "diseño de sonrisa",
    "ortodoncia invisible",
    "odontología IA",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
