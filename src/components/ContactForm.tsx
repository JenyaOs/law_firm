"use client";

import { useState } from "react";
import Icon from "./Icon";

type Option = { id: number; title: string };

export default function ContactForm({
  practices,
  defaultPracticeId,
}: {
  practices: Option[];
  defaultPracticeId?: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Ошибка отправки");
        setStatus("idle");
        return;
      }
      form.reset();
      setStatus("done");
    } catch {
      setError("Не удалось отправить. Проверьте соединение и попробуйте снова.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="flex h-full min-h-[360px] flex-col items-center justify-center bg-white p-10 text-center shadow-xl">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brown-100 text-brown-600">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-serif text-2xl text-navy-900">Заявка отправлена</h3>
        <p className="mt-3 max-w-sm text-navy-800/80">
          Благодарим за обращение. Юрист свяжется с вами в течение рабочего дня.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brown-600 underline underline-offset-4"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const field =
    "w-full border border-navy-100 bg-cream/60 px-4 py-3 text-navy-950 outline-none transition placeholder:text-navy-800/40 focus:border-brown-500 focus:bg-white";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-800";

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-white p-7 shadow-xl md:p-9">
      <h3 className="font-serif text-2xl text-navy-900">Получить консультацию</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Ваше имя *</label>
          <input id="name" name="name" required minLength={2} className={field} placeholder="Иван Петров" />
        </div>
        <div>
          <label className={label} htmlFor="phone">Телефон *</label>
          <input id="phone" name="phone" type="tel" required className={field} placeholder="+7 (___) ___-__-__" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={field} placeholder="mail@example.com" />
        </div>
        <div>
          <label className={label} htmlFor="practiceId">Направление</label>
          <select id="practiceId" name="practiceId" defaultValue={defaultPracticeId ?? ""} className={field}>
            <option value="">Не знаю / другое</option>
            {practices.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="message">Опишите ситуацию *</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={4}
          className={field}
          placeholder="Кратко расскажите, с чем нужна помощь"
        />
      </div>
      {error && <p className="border-l-4 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-navy-900 px-6 py-4 font-medium text-white transition hover:bg-brown-600 disabled:opacity-60"
      >
        {status === "loading" ? "Отправка..." : "Отправить заявку"}
      </button>
      <p className="text-xs text-navy-800/60">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Информация строго конфиденциальна.
      </p>
    </form>
  );
}
