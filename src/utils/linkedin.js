const LINKEDIN_PATH_PATTERN = /^\/(in|company)\/([A-Za-z0-9\-_%]+)\/?$/i;

// Normaliza una URL de perfil de LinkedIn a https://www.linkedin.com/<in|company>/<slug>.
// Devuelve null si el valor no corresponde a un perfil o página de empresa de LinkedIn.
export const normalizeLinkedInUrl = (raw) => {
  if (raw === undefined || raw === null) return null;

  let input = String(raw).trim().replace(/\s+/g, '');
  if (!input) return null;

  if (!/^https?:\/\//i.test(input)) {
    input = `https://${input}`;
  }

  let url;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (host !== 'linkedin.com' && !host.endsWith('.linkedin.com')) return null;

  const match = url.pathname.match(LINKEDIN_PATH_PATTERN);
  if (!match) return null;

  return `https://www.linkedin.com/${match[1].toLowerCase()}/${match[2]}`;
};

// El campo es opcional: un valor vacío se considera válido.
export const isValidLinkedInUrl = (raw) => {
  if (raw === undefined || raw === null || !String(raw).trim()) return true;
  return normalizeLinkedInUrl(raw) !== null;
};
