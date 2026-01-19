"use client";

import { FormEvent, useState } from "react";
import { getEventId, pushDataLayer } from "../lib/analytics";
import { getUtmPayload } from "../lib/utm";

export function MiniLeadForm() {
  const [status, setStatus] = useState<"idle" | "success" | "loading">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      event_id: getEventId(),
      ...getUtmPayload()
    };
    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "hero_two_step" })
      });
      if (!response.ok) throw new Error("Failed");
      pushDataLayer("lead_form_submit", { page_section: "hero_two_step" });
      pushDataLayer("generate_lead", { page_section: "hero_two_step" });
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <div className="card border border-accent/20 bg-white/90">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-espresso">
          Receba a validação rápida da Dany em 2 passos
        </p>
        <span className="badge">Two-step</span>
      </div>
      <p className="text-xs text-espresso/70">
        Informe seu nome e WhatsApp. Em seguida, finalize sua vaga.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input
          name="name"
          placeholder="Seu nome"
          required
          className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
        />
        <input
          name="whatsapp"
          placeholder="WhatsApp"
          required
          className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
        />
        <button type="submit" className="btn-primary">
          {status === "loading" ? "Enviando..." : "Enviar e garantir"}
        </button>
        {status === "success" ? (
          <p className="text-xs text-emerald-600">
            Pronto! Agora clique em “Garantir minha vaga”.
          </p>
        ) : null}
      </form>
    </div>
  );
}
