// Prefixes an internal path with the site's base path (/bachelor-blog on GitHub Pages),
// so links keep working wherever the site is hosted. Always pass paths starting with "/".
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => `${base}${path}`;
