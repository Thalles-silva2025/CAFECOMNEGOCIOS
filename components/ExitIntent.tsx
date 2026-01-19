"use client";

import { useEffect, useState } from "react";
import { logServerEvent, pushDataLayer } from "../lib/analytics";

type Props = {
  whatsappUrl: string;
};

export function ExitIntent({ whatsappUrl }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setOpen(true);
      }
    };
    if (window.innerWidth >= 1024) {
      window.addEventListener("mouseout", handleMouseLeave);
    }
    return () => window.removeEventListener("mouseout", handleMouseLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="card max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Quer garantir a vaga?</h3>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="text-espresso/60"
          >
            ✕
          </button>
        </div>
        <p className="mt-2 text-sm text-espresso/70">
          As 15 vagas são presenciais e o encontro é mão na massa. Fale com a
          Dany agora.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-4 w-full"
          onClick={() =>
            (pushDataLayer("click_whatsapp", { page_section: "exit_intent" }),
            logServerEvent("click_whatsapp", { page_section: "exit_intent" }))
          }
        >
          Falar com a Dany no WhatsApp
        </a>
      </div>
    </div>
  );
}
