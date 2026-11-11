import { desc, asc, eq, count } from "drizzle-orm";
import { db } from "@/db";
import { inquiries, news, practices, reviews } from "@/db/schema";
import { newsSeed, practiceSeed, reviewSeed } from "@/db/seed-data";

let seeding: Promise<void> | null = null;

async function seed() {
  const [p] = await db.select({ c: count() }).from(practices);
  if (p.c === 0) {
    await db
      .insert(practices)
      .values(practiceSeed.map((x, i) => ({ ...x, sortOrder: i })))
      .onConflictDoNothing();
  }
  const [r] = await db.select({ c: count() }).from(reviews);
  if (r.c === 0) {
    await db.insert(reviews).values(reviewSeed);
  }
  const [n] = await db.select({ c: count() }).from(news);
  if (n.c === 0) {
    await db
      .insert(news)
      .values(newsSeed.map((x) => ({ ...x, publishedAt: new Date(x.publishedAt) })))
      .onConflictDoNothing();
  }
}

export function ensureSeed() {
  if (!seeding) {
    seeding = seed().catch((e) => {
      seeding = null;
      throw e;
    });
  }
  return seeding;
}

export async function getPractices() {
  await ensureSeed();
  return db.select().from(practices).orderBy(asc(practices.sortOrder));
}

export async function getPractice(slug: string) {
  await ensureSeed();
  const rows = await db.select().from(practices).where(eq(practices.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getReviews() {
  await ensureSeed();
  return db.select().from(reviews).orderBy(desc(reviews.createdAt), desc(reviews.id));
}

export async function getNews(limit?: number) {
  await ensureSeed();
  const q = db.select().from(news).orderBy(desc(news.publishedAt));
  return limit ? q.limit(limit) : q;
}

export async function getNewsItem(slug: string) {
  await ensureSeed();
  const rows = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function createInquiry(data: {
  name: string;
  phone: string;
  email?: string | null;
  practiceId?: number | null;
  message: string;
}) {
  await db.insert(inquiries).values({
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    practiceId: data.practiceId ?? null,
    message: data.message,
  });
}

export function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
