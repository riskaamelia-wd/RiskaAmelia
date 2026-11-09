import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE } from "@/config/site";
import "@/styles/globals.css";
const manrope = localFont({
  src: [
    {
      path: "../../public/fonts/manrope-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope-bold.ttf",
      weight: "700 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});
const cormorant = localFont({
  src: [
    {
      path: "../../public/fonts/cormorant-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ||
      (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"),
  ),
  title: {
    default: `${SITE.name} — Software engineer`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
