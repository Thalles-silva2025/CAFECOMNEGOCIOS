"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, pushConsentToDataLayer, saveConsent } from "../lib/consent";

const defaultState = {
  essential: true,
  analytics: false,
  marketing: false
};

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setState(stored);
      pushConsentToDataLayer(stored);
      return;
    }
    setOpen(true);
    pushConsentToDataLayer(defaultState);
  }, []);

  const acceptAll = () => {
    const newState = { essential: true, analytics: true, marketing: true };
    saveConsent(newState);
    pushConsentToDataLayer(newState);
    setOpen(false);
  };

  const acceptEssential = () => {
    saveConsent(defaultState);
    pushConsentToDataLayer(defaultState);
    setOpen(false);
  };

  const saveCustom = () => {
    saveConsent(state);
    pushConsentToDataLayer(state);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 p-4 shadow-lg backdrop-blur">
      <div className="container-safe flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-espresso">
            Cookies e privacidade
          </p>
          <p className="text-xs text-espresso/70">
            Usamos cookies essenciais para funcionar e, com sua permissão, para
            análise e marketing. Você pode ajustar quando quiser.
          </p>
          {showManage ? (
            <div className="mt-2 flex flex-col gap-2 text-xs text-espresso/80">
              {(["analytics", "marketing"] as const).map((key) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state[key]}
                    onChange={(event) =>
                      setState((prev) => ({
                        ...prev,
                        [key]: event.target.checked
                      }))
                    }
                    className="accent-espresso"
                  />
                  {key === "analytics"
                    ? "Analytics (GTM/GA4)"
                    : "Marketing (Meta Pixel)"}
                </label>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button className="btn-secondary" onClick={acceptEssential}>
            Somente essencial
          </button>
          <button className="btn-secondary" onClick={() => setShowManage(true)}>
            Gerenciar
          </button>
          <button className="btn-primary" onClick={acceptAll}>
            Aceitar tudo
          </button>
          {showManage ? (
            <button className="btn-primary" onClick={saveCustom}>
              Salvar preferências
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
