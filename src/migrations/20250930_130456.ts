import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "content_stats_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_us_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "contact_us_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  ALTER TABLE "contact_us" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "contact_us" ADD COLUMN "phone" varchar;
  ALTER TABLE "contact_us" ADD COLUMN "project_type_id" integer;
  ALTER TABLE "contact_us" ADD COLUMN "message" varchar NOT NULL;
  ALTER TABLE "contact_us" ADD COLUMN "client_i_p" varchar;
  ALTER TABLE "contact_us" ADD COLUMN "user_agent" varchar;
  ALTER TABLE "content" ADD COLUMN "contact_whatsapp" varchar NOT NULL;
  ALTER TABLE "content" ADD COLUMN "contact_email" varchar NOT NULL;
  ALTER TABLE "content" ADD COLUMN "contact_address_link" varchar NOT NULL;
  ALTER TABLE "content_locales" ADD COLUMN "contact_address_title" varchar NOT NULL;
  ALTER TABLE "content_stats" ADD CONSTRAINT "content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_stats_locales" ADD CONSTRAINT "content_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_stats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "content_stats_order_idx" ON "content_stats" USING btree ("_order");
  CREATE INDEX "content_stats_parent_id_idx" ON "content_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "content_stats_locales_locale_parent_id_unique" ON "content_stats_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "contact_us" ADD CONSTRAINT "contact_us_project_type_id_categories_id_fk" FOREIGN KEY ("project_type_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "contact_us_project_type_idx" ON "contact_us" USING btree ("project_type_id");
  ALTER TABLE "contact_us" DROP COLUMN "service_type";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "content_locales" DROP COLUMN "services_section_title";
  ALTER TABLE "content_locales" DROP COLUMN "services_section_description";
  ALTER TABLE "content_locales" DROP COLUMN "projects_section_title";
  ALTER TABLE "content_locales" DROP COLUMN "projects_section_description";
  DROP TYPE "public"."enum_contact_us_service_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_us_service_type" AS ENUM('residential-development', 'commercial-construction', 'project-management', 'architectural-design', 'renovation-remodeling', 'land-development', 'consultation-services', 'other');
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_us_locales" (
  	"name" varchar NOT NULL,
  	"notes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "content_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_stats_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "content_stats" CASCADE;
  DROP TABLE "content_stats_locales" CASCADE;
  ALTER TABLE "contact_us" DROP CONSTRAINT "contact_us_project_type_id_categories_id_fk";
  
  DROP INDEX "contact_us_project_type_idx";
  ALTER TABLE "contact_us" ADD COLUMN "service_type" "enum_contact_us_service_type";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "content_locales" ADD COLUMN "services_section_title" varchar;
  ALTER TABLE "content_locales" ADD COLUMN "services_section_description" varchar;
  ALTER TABLE "content_locales" ADD COLUMN "projects_section_title" varchar;
  ALTER TABLE "content_locales" ADD COLUMN "projects_section_description" varchar;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_locales" ADD CONSTRAINT "contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_us_locales_locale_parent_id_unique" ON "contact_us_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  ALTER TABLE "contact_us" DROP COLUMN "name";
  ALTER TABLE "contact_us" DROP COLUMN "phone";
  ALTER TABLE "contact_us" DROP COLUMN "project_type_id";
  ALTER TABLE "contact_us" DROP COLUMN "message";
  ALTER TABLE "contact_us" DROP COLUMN "client_i_p";
  ALTER TABLE "contact_us" DROP COLUMN "user_agent";
  ALTER TABLE "content" DROP COLUMN "contact_whatsapp";
  ALTER TABLE "content" DROP COLUMN "contact_email";
  ALTER TABLE "content" DROP COLUMN "contact_address_link";
  ALTER TABLE "content_locales" DROP COLUMN "contact_address_title";`)
}
