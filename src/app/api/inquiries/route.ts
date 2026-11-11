import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const practiceIdRaw = Number(body.practiceId);
  const practiceId = Number.isInteger(practiceIdRaw) && practiceIdRaw > 0 ? practiceIdRaw : null;

  if (name.length < 2 || name.length > 160) {
    return NextResponse.json({ error: "Укажите ваше имя" }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 6 || phone.length > 60) {
    return NextResponse.json({ error: "Укажите корректный телефон" }, { status: 400 });
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json(
      { error: "Опишите ситуацию (не менее 10 символов)" },
      { status: 400 },
    );
  }

  try {
    await createInquiry({ name, phone, email, practiceId, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось сохранить заявку" }, { status: 500 });
  }
}
