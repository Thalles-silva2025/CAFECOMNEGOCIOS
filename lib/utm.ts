export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
];

const STORAGE_KEY = "hb_utms";
const COOKIE_KEY = "hb_utms";

export function readUtmFromUrl(): UtmParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return UTM_KEYS.reduce((acc, key) => {
    const value = params.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {} as UtmParams);
}

export function persistUtms(utms: UtmParams) {
  if (typeof window === "undefined") return;
  const hasValues = Object.values(utms).some(Boolean);
  if (!hasValues) return;
  const payload = JSON.stringify({
    ...utms,
    stored_at: Date.now()
  });
  window.localStorage.setItem(STORAGE_KEY, payload);
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(payload)}; max-age=${60 * 60 * 24 * 7}; path=/`;
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as UtmParams & { stored_at?: number };
    const output: UtmParams = {};
    UTM_KEYS.forEach((key) => {
      if (parsed[key]) output[key] = parsed[key];
    });
    return output;
  } catch {
    return {};
  }
}

export function getUtmPayload() {
  const utms = getStoredUtms();
  return {
    utm_source: utms.utm_source ?? null,
    utm_medium: utms.utm_medium ?? null,
    utm_campaign: utms.utm_campaign ?? null,
    utm_content: utms.utm_content ?? null,
    utm_term: utms.utm_term ?? null
  };
}
