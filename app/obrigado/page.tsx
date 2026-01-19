"use client";

import { useEffect } from "react";
import { logServerEvent, pushDataLayer } from "../../lib/analytics";

export default function ObrigadoPage() {
  useEffect(() => {
    pushDataLayer("purchase", {
      page_section: "obrigado",
      value: 97.0
    });
    logServerEvent("purchase", {
      page_section: "obrigado",
      value: 97.0
    });
    fetch("/api/webhooks/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "stub_paid",
        value: 97.0,
        currency: "BRL"
      })
    }).catch(() => null);
  }, []);

  return (
    <main className="min-h-screen bg-latte">
      <section className="container-safe py-16">
        <div className="card space-y-4">
          <h1 className="text-3xl font-semibold text-espresso">
            Inscrição confirmada!
          </h1>
          <p className="text-sm text-espresso/70">
            Você garantiu sua vaga no Café da Manhã de Precificação. Em breve a
            equipe entra em contato para detalhes finais.
          </p>
          <a
            href="/"
            className="btn-secondary"
          >
            Voltar para a landing
          </a>
          <a
            href={process.env.NEXT_PUBLIC_WHATSAPP_URL}
            className="btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Falar com a Dany no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
