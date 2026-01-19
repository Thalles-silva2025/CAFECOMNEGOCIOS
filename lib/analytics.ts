import { v4 as uuidv4 } from "uuid";
import { getUtmPayload } from "./utm";

const EVENT_ID_KEY = "hb_event_id";

export function getEventId() {
  if (typeof window === "undefined") return "";
  const existing = window.sessionStorage.getItem(EVENT_ID_KEY);
  if (existing) return existing;
  const id = uuidv4();
  window.sessionStorage.setItem(EVENT_ID_KEY, id);
  return id;
}

export function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function pushDataLayer(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const eventId = getEventId();
  const utms = getUtmPayload();
  const basePayload = {
    event,
    event_id: eventId,
    offer: "cafe_precificacao_97",
    currency: "BRL",
    device_type: getDeviceType(),
    ...utms,
    ...payload
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(basePayload);
}

export async function logServerEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const eventId = getEventId();
  const utms = getUtmPayload();
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        event_id: eventId,
        device_type: getDeviceType(),
        ...utms,
        ...payload
      })
    });
  } catch (error) {
    console.error("Falha ao registrar evento", error);
  }
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
