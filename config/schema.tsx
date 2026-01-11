import {date, integer, json, pgTable, text, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkUserId: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(5)
});

export const projectsTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar({length: 255 }).unique(),
    userId: integer()
        .notNull()
        .references(()=> usersTable.id, {onDelete: 'cascade'}),
    projectName: varchar({ length: 255 }),
    theme: varchar({ length: 255 }),
    userInput: varchar({length: 255}).notNull(),
    device: varchar({length: 255}),
    createdOn: date().defaultNow(),
    config: json(),
    projectVisualDescription: text()
})

export const screenConfigTable = pgTable('screenConfig', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar().references(()=> projectsTable.projectId),
    screenId: varchar({ length: 255 }),
    screenName: varchar({ length: 255 }),
    purpose: varchar({ length: 255 }),
    screenDescription: text(),
    code: text()
})

export const usersRelations = relations(usersTable, ({ many }) => ({
    projects: many(projectsTable),
}));

export const projectRelations = relations(projectsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [projectsTable.userId],
        references: [usersTable.id]
    }),
}))
