import Link from "next/link";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { formatDate, getNews, getPractices, getReviews } from "@/lib/data";

export const dynamic = "force-dynamic";

const pex = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200`;

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-brown-500" aria-label={`Оценка ${n} из 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i <= n ? "fill-current" : "fill-brown-100"}`}>
          <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z" />
        </svg>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brown-500">{eyebrow}</p>
      <h2 className={`font-serif text-3xl md:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      <div className="mt-5 h-0.5 w-16 bg-brown-500" />
    </div>
  );
}

export default async function HomePage() {
  const [practices, reviews, latest] = await Promise.all([getPractices(), getReviews(), getNews(3)]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${pex(8112198)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/50" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
          <p className="animate-fade-up mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-brown-300">
            Юридическая фирма · с 2009 года
          </p>
          <h1 className="animate-fade-up max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Право, на которое можно <span className="text-brown-300">положиться</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Защищаем бизнес и частных лиц в суде и за его пределами. Стратегия, основанная на
            практике, и личная ответственность партнёров за результат.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap gap-4">
            <Link href="/#contact" className="bg-brown-600 px-8 py-4 font-medium transition hover:bg-brown-500">
              Записаться на консультацию
            </Link>
            <Link
              href="/#practices"
              className="border border-white/30 px-8 py-4 font-medium transition hover:border-brown-300 hover:text-brown-300"
            >
              Наши практики
            </Link>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-navy-900/70">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4">
            {[
              ["15+", "лет опыта"],
              ["1 200+", "выигранных дел"],
              ["25", "юристов в команде"],
              ["98%", "клиентов рекомендуют нас"],
            ].map(([n, t]) => (
              <div key={t}>
                <div className="font-serif text-3xl text-brown-300">{n}</div>
                <div className="mt-1 text-sm text-white/65">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICES */}
      <section id="practices" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle eyebrow="Практики" title="Направления, в которых мы сильны" />
        <div className="grid gap-px border border-brown-300/40 bg-brown-300/40 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((p) => (
            <Link
              key={p.id}
              href={`/practices/${p.slug}`}
              className="group flex flex-col bg-cream p-7 transition hover:bg-navy-900"
            >
              <span className="mb-6 flex h-12 w-12 items-center justify-center bg-navy-900 text-brown-300 transition group-hover:bg-brown-600 group-hover:text-white">
                <Icon name={p.icon} />
              </span>
              <h3 className="font-serif text-xl text-navy-900 transition group-hover:text-white">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-800/75 transition group-hover:text-white/70">
                {p.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brown-600 transition group-hover:text-brown-300">
                Подробнее <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-navy-900 py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pex(8112112)} alt="Юрист фирмы за работой" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute -bottom-6 -right-3 hidden bg-brown-600 p-6 shadow-xl sm:block">
              <div className="font-serif text-4xl">15 лет</div>
              <div className="text-sm text-white/80">безупречной репутации</div>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">О фирме</p>
            <h2 className="font-serif text-3xl md:text-4xl">Принципы, на которых мы строим работу</h2>
            <div className="mt-5 h-0.5 w-16 bg-brown-500" />
            <p className="mt-6 leading-relaxed text-white/75">
              «Ларин &amp; Партнёры» — независимая юридическая фирма. Мы работаем с компаниями из
              разных отраслей и частными клиентами, предлагая решения, а не просто консультации.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                ["Честная оценка рисков", "Говорим клиенту правду о перспективах дела ещё до начала работы."],
                ["Прозрачные условия", "Фиксируем стоимость и этапы работ в договоре — без скрытых платежей."],
                ["Конфиденциальность", "Защита адвокатской тайны и информации о вашем бизнесе."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center bg-brown-600">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-white/65">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle eyebrow="Отзывы" title="Нам доверяют — вот что говорят клиенты" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.id} className="relative flex flex-col border-t-4 border-brown-500 bg-white p-7 shadow-sm">
              <span className="absolute right-6 top-3 font-serif text-6xl leading-none text-brown-100">“</span>
              <Stars n={r.rating} />
              <blockquote className="mt-4 flex-1 leading-relaxed text-navy-800/85">{r.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 font-serif text-lg text-brown-300">
                  {r.author[0]}
                </span>
                <span>
                  <span className="block font-medium text-navy-900">{r.author}</span>
                  <span className="block text-xs text-navy-800/60">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-brown-100/70 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="Новости фирмы" title="Последние публикации" />
            <Link href="/news" className="mb-12 inline-flex items-center gap-2 font-medium text-brown-700 hover:text-brown-500">
              Все новости <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {latest.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="group flex flex-col bg-white shadow-sm transition hover:shadow-xl">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-navy-900 px-2.5 py-1 font-medium uppercase tracking-wider text-white">{n.category}</span>
                    <span className="text-navy-800/60">{formatDate(n.publishedAt)}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl leading-snug text-navy-900 group-hover:text-brown-600">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative bg-navy-950 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionTitle eyebrow="Контакты" title="Расскажите о вашей ситуации" light />
            <p className="leading-relaxed text-white/70">
              Первичная консультация — бесплатно. Мы изучим вашу ситуацию и предложим план действий.
            </p>
            <ul className="mt-8 space-y-5 text-white/85">
              <li className="flex gap-4"><Icon name="phone" className="h-6 w-6 shrink-0 text-brown-300" />+7 (495) 123-45-67</li>
              <li className="flex gap-4"><Icon name="mail" className="h-6 w-6 shrink-0 text-brown-300" />office@larin-partners.ru</li>
              <li className="flex gap-4"><Icon name="pin" className="h-6 w-6 shrink-0 text-brown-300" />Москва, Пресненская наб., 12, офис 1405</li>
              <li className="flex gap-4"><Icon name="clock" className="h-6 w-6 shrink-0 text-brown-300" />Пн–Пт 9:00–19:00</li>
            </ul>
          </div>
          <div className="lg:col-span-3 text-navy-950">
            <ContactForm practices={practices.map((p) => ({ id: p.id, title: p.title }))} />
          </div>
        </div>
      </section>
    </>
  );
}
