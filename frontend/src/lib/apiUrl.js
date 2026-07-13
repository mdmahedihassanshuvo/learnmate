const normalizedApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "")
  .trim()
  .replace(/\/+$/, "");

export const apiUrl = (path) => `${normalizedApiBaseUrl}${path}`;
