import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { formatDate, getNews, getNewsItem } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  return { title: item ? `${item.title} — Ларин & Партнёры` : "Новость не найдена" };
}

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();
  const others = (await getNews(4)).filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <>
      <section className="bg-navy-950 py-14 text-white">
        <div className="mx-auto max-w-3xl px-5">
          <Link href="/news" className="mb-6 inline-flex items-center gap-2 text-sm text-brown-300 hover:text-white">
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> Все новости
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-brown-600 px-2.5 py-1 font-medium uppercase tracking-wider">{item.category}</span>
            <span className="text-white/60">{formatDate(item.publishedAt)}</span>
          </div>
          <h1 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">{item.title}</h1>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-5 py-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover shadow-lg" />
        <p className="mt-8 border-l-4 border-brown-500 pl-5 text-lg italic text-navy-800">{item.excerpt}</p>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy-950/85">
          {item.content.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 bg-navy-900 p-7 text-white">
          <div>
            <div className="font-serif text-xl">Нужна консультация по этой теме?</div>
            <div className="text-sm text-white/70">Оставьте заявку — юрист свяжется с вами.</div>
          </div>
          <Link href="/#contact" className="bg-brown-600 px-6 py-3 font-medium hover:bg-brown-500">Связаться</Link>
        </div>
      </article>
      {others.length > 0 && (
        <section className="bg-brown-100/70 py-14">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="mb-8 font-serif text-2xl text-navy-900">Читайте также</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((n) => (
                <Link key={n.id} href={`/news/${n.slug}`} className="bg-white p-6 shadow-sm transition hover:shadow-lg">
                  <div className="text-xs text-navy-800/60">{formatDate(n.publishedAt)}</div>
                  <div className="mt-2 font-serif text-lg text-navy-900 hover:text-brown-600">{n.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
