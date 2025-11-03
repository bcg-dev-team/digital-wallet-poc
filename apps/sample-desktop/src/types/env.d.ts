/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE_URL: string;
  readonly VITE_MODA_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}