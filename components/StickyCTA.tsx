"use client";

import { logServerEvent, pushDataLayer } from "../lib/analytics";

type Props = {
  price: string;
  whatsappUrl: string;
};

export function StickyCTA({ price, whatsappUrl }: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[92%] -translate-x-1/2 rounded-full bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-2">
        <a
          href="/checkout"
          className="btn-primary flex-1 text-center text-xs"
          onClick={() =>
            (pushDataLayer("click_cta_primary", { page_section: "sticky" }),
            logServerEvent("click_cta_primary", { page_section: "sticky" }))
          }
        >
          {price} • Garantir vaga
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary text-xs"
          onClick={() =>
            (pushDataLayer("click_whatsapp", { page_section: "sticky" }),
            logServerEvent("click_whatsapp", { page_section: "sticky" }))
          }
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
