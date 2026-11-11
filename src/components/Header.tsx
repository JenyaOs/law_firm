import Link from "next/link";
import Icon from "./Icon";

const links = [
  { href: "/#practices", label: "Практики" },
  { href: "/#about", label: "О фирме" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/news", label: "Новости" },
  { href: "/#contact", label: "Контакты" },
];

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center border border-brown-300 text-brown-300">
        <Icon name="scale" className="h-5 w-5" />
      </span>
      <span className={`font-serif text-xl leading-none ${light ? "text-white" : "text-navy-900"}`}>
        Ларин <span className="text-brown-300">&amp;</span> Партнёры
        <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.3em] text-brown-300">
          Юридическая фирма
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-brown-300">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="hidden bg-brown-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brown-500 md:block"
        >
          Консультация
        </Link>
        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-white/20 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="absolute right-0 top-12 w-56 border border-white/10 bg-navy-900 p-2 shadow-xl">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-4 py-3 text-sm text-white/85 hover:bg-white/5 hover:text-brown-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
