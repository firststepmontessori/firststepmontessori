/// <reference path="../.astro/types.d.ts" />

declare const __SITE_THEME__: "garden" | "geometry";
declare const __SITE_ENVIRONMENT__: "preview" | "production";

interface CloudflareEnv {
  DB?: D1Database;
  SITE_ENV?: "preview" | "production";
  ADMIN_DEV_BYPASS?: string;
}

declare namespace App {
  interface Locals {
    adminEmail?: string;
  }
}
