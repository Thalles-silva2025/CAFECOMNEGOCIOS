"use client";

import { FormEvent, useState } from "react";
import { getEventId, pushDataLayer } from "../lib/analytics";
import { getUtmPayload } from "../lib/utm";

const segments = ["Comércio", "Serviços", "Indústria", "Outro"];
const pains = [
  "Margem baixa",
  "Preço no feeling",
  "Impostos confusos",
  "Taxas corroendo",
  "Custo fixo alto",
  "Concorrência"
];

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      event_id: getEventId(),
      ...getUtmPayload()
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao salvar lead");
      pushDataLayer("lead_form_submit", { page_section: "lead_form" });
      pushDataLayer("generate_lead", { page_section: "lead_form" });
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => {
        if (!started) {
          pushDataLayer("lead_form_start", { page_section: "lead_form" });
          setStarted(true);
        }
      }}
      className="grid gap-4"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
            Nome
          </label>
          <input
            name="name"
            required
            placeholder="Seu nome"
            className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
            WhatsApp
          </label>
          <input
            name="whatsapp"
            required
            placeholder="(62) 9 9999-9999"
            className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
            Empresa
          </label>
          <input
            name="company"
            placeholder="Nome da empresa"
            className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
            Cargo
          </label>
          <input
            name="role"
            placeholder="Dono, CEO, Gestor"
            className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
            Segmento
          </label>
          <select
            name="segment"
            className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>
            {segments.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
            Principal dor
          </label>
          <select
            name="pain"
            className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>
            {pains.map((pain) => (
              <option key={pain} value={pain}>
                {pain}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-espresso/70">
          Faixa de faturamento (opcional)
        </label>
        <input
          name="revenue"
          placeholder="Ex: 20k a 100k/mês"
          className="rounded-xl border border-espresso/20 px-4 py-3 text-sm"
        />
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Quero orientação da Dany"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-emerald-600">
          Perfeito. A Dany pode te orientar agora pelo WhatsApp.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-500">
          Não conseguimos enviar agora. Tente novamente ou fale com a Dany.
        </p>
      ) : null}
    </form>
  );
}
