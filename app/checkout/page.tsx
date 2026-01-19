"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { logServerEvent, pushDataLayer } from "../../lib/analytics";

export default function CheckoutPage() {
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pushDataLayer("begin_checkout", {
      page_section: "checkout",
      value: 97.0
    });
    logServerEvent("begin_checkout", {
      page_section: "checkout",
      value: 97.0
    });
  }, []);

  const handleCreateCharge = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) throw new Error("Erro ao gerar cobrança");
      const data = await response.json();
      setPixCode(data.pixCopyPaste);
      setQrUrl(data.qrCodeUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-latte">
      <section className="container-safe py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-espresso">
              Finalizar inscrição
            </h1>
            <p className="text-sm text-espresso/70">
              Café da Manhã de Precificação — 26/01/2026 • 08:00 • Torre Tokio
              (Sala 1107)
            </p>
            <div className="card space-y-2 text-sm text-espresso/70">
              <p>Ingresso presencial (15 vagas)</p>
              <p className="text-lg font-semibold text-espresso">R$ 97,00</p>
            </div>
            <button
              onClick={handleCreateCharge}
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Gerando PIX..." : "Pagar com Pix"}
            </button>
            <a
              href={`${process.env.NEXT_PUBLIC_WHATSAPP_URL}?text=${encodeURIComponent(
                "Oi Dany, quero garantir minha vaga no Café da Manhã de Precificação."
              )}`}
              className="btn-secondary w-full"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                (pushDataLayer("click_whatsapp", { page_section: "checkout" }),
                logServerEvent("click_whatsapp", { page_section: "checkout" }))
              }
            >
              Comprar pelo WhatsApp
            </a>
          </div>
          <div className="card space-y-4">
            <h2 className="text-lg font-semibold text-espresso">PIX gerado</h2>
            {!pixCode ? (
              <p className="text-sm text-espresso/70">
                Clique em “Pagar com Pix” para gerar sua cobrança. Esta etapa é um
                stub pronto para integrar com Asaas/MercadoPago.
              </p>
            ) : (
              <>
                {qrUrl ? (
                  <div className="flex justify-center">
                    <Image
                      src={qrUrl}
                      alt="QR Code Pix"
                      width={220}
                      height={220}
                    />
                  </div>
                ) : null}
                <div>
                  <p className="text-xs uppercase tracking-wide text-espresso/60">
                    Pix copia e cola
                  </p>
                  <textarea
                    readOnly
                    className="mt-2 w-full rounded-xl border border-espresso/20 p-3 text-xs"
                    rows={4}
                    value={pixCode}
                  />
                </div>
                <button
                  className="btn-primary w-full"
                  onClick={() => (window.location.href = "/obrigado?status=stub")}
                >
                  Já paguei (simulação)
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
