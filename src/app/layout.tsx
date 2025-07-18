import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/toast/ToastProvider";

const montserrat = Montserrat({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Tally",
  description: "Tally your expenses easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
