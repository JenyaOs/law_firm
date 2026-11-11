import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getNews } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Новости фирмы — Ларин & Партнёры" };

export default async function NewsPage() {
  const items = await getNews();
  return (
    <>
      <section className="bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">Новости</p>
          <h1 className="font-serif text-4xl md:text-5xl">Новости и аналитика фирмы</h1>
          <p className="mt-4 max-w-xl text-white/70">
            Выигранные дела, обзоры законодательства, события и экспертные материалы наших юристов.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <Link key={n.id} href={`/news/${n.slug}`} className="group flex flex-col bg-white shadow-sm transition hover:shadow-xl">
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-brown-600 px-2.5 py-1 font-medium uppercase tracking-wider text-white">{n.category}</span>
                  <span className="text-navy-800/60">{formatDate(n.publishedAt)}</span>
                </div>
                <h2 className="mt-4 font-serif text-xl leading-snug text-navy-900 group-hover:text-brown-600">{n.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
