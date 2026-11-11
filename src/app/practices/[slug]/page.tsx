import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { getPractice, getPractices } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPractice(slug);
  return { title: p ? `${p.title} — Ларин & Партнёры` : "Практика не найдена" };
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params;
  const practice = await getPractice(slug);
  if (!practice) notFound();
  const all = await getPractices();
  const services = practice.services.split("\n").filter(Boolean);

  return (
    <>
      <section className="bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <Link href="/#practices" className="mb-6 inline-flex items-center gap-2 text-sm text-brown-300 hover:text-white">
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> Все практики
          </Link>
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center bg-brown-600">
              <Icon name={practice.icon} className="h-8 w-8" />
            </span>
            <h1 className="font-serif text-3xl md:text-5xl">{practice.title}</h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-white/70">{practice.summary}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-lg leading-relaxed text-navy-950/85">{practice.description}</p>
          <h2 className="mt-10 font-serif text-2xl text-navy-900">С чем мы помогаем</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex gap-3 border border-brown-300/50 bg-white p-4">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brown-600" />
                <span className="text-navy-800">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside>
          <div className="bg-navy-900 p-6 text-white">
            <h3 className="font-serif text-lg text-brown-300">Другие практики</h3>
            <ul className="mt-4 divide-y divide-white/10">
              {all
                .filter((p) => p.id !== practice.id)
                .map((p) => (
                  <li key={p.id}>
                    <Link href={`/practices/${p.slug}`} className="block py-3 text-sm text-white/80 hover:text-brown-300">
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="bg-brown-100/70 py-16">
        <div className="mx-auto max-w-3xl px-5">
          <ContactForm
            practices={all.map((p) => ({ id: p.id, title: p.title }))}
            defaultPracticeId={practice.id}
          />
        </div>
      </section>
    </>
  );
}
