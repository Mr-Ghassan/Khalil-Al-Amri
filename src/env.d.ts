/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_MODE?: 'preview' | 'production';
  readonly PUBLIC_LEAD_MODE?: 'prototype';
  readonly PUBLIC_LICENSED_FONTS?: '0' | '1';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
