import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-32 text-center">
      <div className="font-serif text-7xl text-brown-500">404</div>
      <h1 className="mt-4 font-serif text-2xl text-navy-900">Страница не найдена</h1>
      <Link href="/" className="mt-8 inline-block bg-navy-900 px-6 py-3 text-white hover:bg-brown-600">
        На главную
      </Link>
    </section>
  );
}
