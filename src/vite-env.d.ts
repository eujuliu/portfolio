/// <reference types="vite/client" />
interface importMetaEnv {
  readonly OCTOKIT_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
