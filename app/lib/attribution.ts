// First-touch attribution for the visit: which page a visitor landed on, where they came from
// and any UTM tags. Stored for the browser session and sent with every form, so each enquiry
// shows which guide or campaign brought it in.
const KEY = "bc_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type Attribution = Record<string, string>;

export function recordAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const url = new URL(window.location.href);
    const data: Attribution = { landing_page: url.pathname + url.search };
    if (document.referrer && new URL(document.referrer).host !== url.host) data.referrer = document.referrer;
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) data[k] = v;
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage blocked (private mode, strict settings): forms still work without attribution.
  }
}

export function appendAttribution(data: FormData) {
  data.set("page", window.location.pathname);
  try {
    const stored = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
    for (const [k, v] of Object.entries(stored)) data.set(k, v);
  } catch {
    // Ignore unreadable storage.
  }
  return data;
}
