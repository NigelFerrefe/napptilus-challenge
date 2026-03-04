import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { Navbar } from "@/components/navbar/navbar";


export const metadata: Metadata = {
  title: {
    template: `%s | MBST`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}