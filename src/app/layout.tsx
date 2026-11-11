import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ларин & Партнёры — юридическая фирма",
  description:
    "Юридическая фирма: корпоративное, семейное, налоговое право, судебные споры, недвижимость. Отзывы клиентов, новости, консультация онлайн.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
