import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import process from "node:process";
import { defineConfig, loadEnv } from "vite";

const inferGithubPagesBase = () => {
  const repository = process.env.GITHUB_REPOSITORY || "";
  const repositoryName = repository.split("/")[1];

  return repositoryName ? `/${repositoryName}/` : "/learnmate/";
};

const normalizeBasePath = (value = "/") => {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "/") {
    return "/";
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const githubPagesBase = inferGithubPagesBase();
  const base = normalizeBasePath(
    env.VITE_APP_BASE_PATH ||
      (process.env.GITHUB_ACTIONS === "true" || mode === "ghpages"
        ? githubPagesBase
        : "/")
  );

  return {
    base,
    plugins: [
      tailwindcss(),
      react()
    ],
    build: {
      outDir: "dist",
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
  }
})
