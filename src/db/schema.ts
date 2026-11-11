import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const practices = pgTable("practices", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  icon: varchar("icon", { length: 40 }).notNull().default("scale"),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  services: text("services").notNull(), // newline-separated list
  sortOrder: integer("sort_order").notNull().default(0),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 160 }).notNull(),
  role: varchar("role", { length: 200 }).notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull().default(5),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull(),
  email: varchar("email", { length: 200 }),
  practiceId: integer("practice_id"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
