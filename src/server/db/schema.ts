import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

// Add regions table
export const regions = createTable(
  "Region",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    imageUrls: text("imageUrls").array(), // Array of image URLs
    primaryImageIndex: integer("primaryImageIndex").default(0), // Index of primary image in the array
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

// Match existing schema from thaiboxinghub database
export const venues = createTable(
  "Venue",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    capacity: integer("capacity"), // Remove .notNull() to allow null values
    regionId: text("regionId").references(() => regions.id).notNull(), // Make this NOT NULL
    createdAt: timestamp("createdAt", { withTimezone: false }) // Remove timezone
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false }) // Remove timezone
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const events = createTable(
  "Event",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    date: timestamp("date", { withTimezone: false }).notNull(),
    startTime: timestamp("startTime", { withTimezone: false }).notNull(),
    endTime: timestamp("endTime", { withTimezone: false }),
    imageUrl: text("imageUrl"),
    usesDefaultPoster: boolean("usesDefaultPoster").default(true).notNull(),
    venueId: text("venueId").references(() => venues.id),
    regionId: text("regionId").references(() => regions.id),
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

// Add EventTicket table for seat types and pricing
export const eventTickets = createTable(
  "EventTicket",
  {
    id: text("id").primaryKey(),
    eventId: text("eventId").references(() => events.id).notNull(),
    seatType: text("seatType").notNull(), // e.g., "VIP", "Ringside", "General"
    price: doublePrecision("price").notNull(),
    capacity: integer("capacity").notNull(),
    description: text("description"),
    soldCount: integer("soldCount").default(0).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const fighters = createTable(
  "Fighter",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    nickname: text("nickname"),
    weightClass: text("weightClass"),
    record: text("record"),
    imageUrl: text("imageUrl"),
    country: text("country"),
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const users = createTable(
  "User",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    name: text("name"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: text("role").default("user"),
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

// Bookings table to track ticket purchases
export const bookings = createTable(
  "Booking",
  {
    id: text("id").primaryKey(),
    userId: text("userId").references(() => users.id).notNull(),
    eventId: text("eventId").references(() => events.id).notNull(),
    totalAmount: doublePrecision("totalAmount").notNull(),
    paymentStatus: text("paymentStatus").notNull().default("PENDING"), // PENDING, COMPLETED, CANCELLED
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

// Tickets table to track individual tickets
export const tickets = createTable(
  "Ticket",
  {
    id: text("id").primaryKey(),
    eventId: text("eventId").references(() => events.id).notNull(),
    eventDetailId: text("eventDetailId").references(() => eventTickets.id).notNull(),
    bookingId: text("bookingId").references(() => bookings.id).notNull(),
    status: text("status").notNull().default("ACTIVE"), // ACTIVE, USED, CANCELLED
    createdAt: timestamp("createdAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: false })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

// Define relationships
export const regionsRelations = relations(regions, ({ many }) => ({
  venues: many(venues),
}));

export const venuesRelations = relations(venues, ({ one, many }) => ({
  events: many(events),
  region: one(regions, { fields: [venues.regionId], references: [regions.id] }),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  venue: one(venues, { fields: [events.venueId], references: [venues.id] }),
  region: one(regions, { fields: [events.regionId], references: [regions.id] }),
  tickets: many(eventTickets),
  bookings: many(bookings),
}));

export const eventTicketsRelations = relations(eventTickets, ({ one, many }) => ({
  event: one(events, { fields: [eventTickets.eventId], references: [events.id] }),
  tickets: many(tickets),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  event: one(events, { fields: [bookings.eventId], references: [events.id] }),
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  event: one(events, { fields: [tickets.eventId], references: [events.id] }),
  eventDetail: one(eventTickets, { fields: [tickets.eventDetailId], references: [eventTickets.id] }),
  booking: one(bookings, { fields: [tickets.bookingId], references: [bookings.id] }),
}));

// Keep the existing NextAuth tables
export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
