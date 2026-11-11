import Link from "next/link";
import Icon from "./Icon";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Надёжная юридическая защита бизнеса и частных лиц. Более 15 лет практики и сотни выигранных дел.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-white">Навигация</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/#practices" className="hover:text-brown-300">Практики</Link></li>
            <li><Link href="/#reviews" className="hover:text-brown-300">Отзывы клиентов</Link></li>
            <li><Link href="/news" className="hover:text-brown-300">Новости фирмы</Link></li>
            <li><Link href="/#contact" className="hover:text-brown-300">Запись на консультацию</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-white">Контакты</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brown-300" />Москва, Пресненская наб., 12, офис 1405</li>
            <li className="flex gap-3"><Icon name="phone" className="h-5 w-5 shrink-0 text-brown-300" />+7 (495) 123-45-67</li>
            <li className="flex gap-3"><Icon name="mail" className="h-5 w-5 shrink-0 text-brown-300" />office@larin-partners.ru</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Ларин &amp; Партнёры. Информация на сайте не является публичной офертой.
      </div>
    </footer>
  );
}
