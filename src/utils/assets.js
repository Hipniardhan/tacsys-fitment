// Public assets must follow Vite's deployment base, including GitHub Pages subfolders.
export function publicAsset(path, base = import.meta.env?.BASE_URL ?? '/') {
  return `${base}${path.replace(/^\/+/, '')}`;
}
