import "@/styles/globals.css";

import { Inter, Roboto_Mono } from "next/font/google";
import { SidebarLayout } from "@/app/_components/catalyst/sidebar-layout";
import { TRPCReactProvider } from "@/trpc/react";

import NavbarContents from "@/app/_components/layout/navbar";
import SidebarContents from "@/app/_components/layout/sidebar";

export const metadata = {
  title: "Show My Cards",
  description:
    "An application for organising your Magic the Gathering collection",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <SidebarLayout navbar={NavbarContents()} sidebar={SidebarContents()}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SidebarLayout>
      </body>
    </html>
  );
}
