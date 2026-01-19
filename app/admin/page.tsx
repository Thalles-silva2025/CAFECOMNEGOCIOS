"use client";

import { useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  company?: string;
  segment?: string;
  pain?: string;
  score: number;
  createdAt: string;
  utmCampaign?: string;
};

type Metrics = {
  pageViews: number;
  leads: number;
  beginCheckout: number;
  purchases: number;
  whatsappClicks: number;
  videoCompletes: number;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [campaignFilter, setCampaignFilter] = useState("");

  const filteredLeads = useMemo(() => {
    if (!campaignFilter) return leads;
    return leads.filter((lead) => lead.utmCampaign === campaignFilter);
  }, [campaignFilter, leads]);

  const loadData = async (pwd: string) => {
    const response = await fetch(`/api/admin?password=${encodeURIComponent(pwd)}`);
    if (!response.ok) return false;
    const data = await response.json();
    setLeads(data.leads);
    setMetrics(data.metrics);
    return true;
  };

  const handleLogin = async () => {
    const ok = await loadData(password);
    if (ok) {
      setAuthenticated(true);
      window.localStorage.setItem("hb_admin_password", password);
    }
  };

  const exportCsv = () => {
    const csvRows = [
      ["id", "name", "whatsapp", "company", "segment", "pain", "score", "createdAt", "utmCampaign"],
      ...filteredLeads.map((lead) => [
        lead.id,
        lead.name,
        lead.whatsapp,
        lead.company ?? "",
        lead.segment ?? "",
        lead.pain ?? "",
        lead.score.toString(),
        lead.createdAt,
        lead.utmCampaign ?? ""
      ])
    ];
    const csvContent = csvRows.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("hb_admin_password");
    if (saved) {
      loadData(saved).then((ok) => {
        if (ok) {
          setAuthenticated(true);
          setPassword(saved);
        }
      });
    }
  }, []);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-latte">
        <section className="container-safe py-16">
          <div className="card max-w-md space-y-4">
            <h1 className="text-2xl font-semibold text-espresso">Acesso admin</h1>
            <input
              type="password"
              className="rounded-xl border border-espresso/20 px-4 py-3"
              placeholder="Senha de admin"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn-primary" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-latte">
      <section className="container-safe py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-espresso">Dashboard</h1>
          <button className="btn-secondary" onClick={exportCsv}>
            Exportar CSV
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics ? (
            <>
              <div className="card">
                <p className="text-xs uppercase text-espresso/60">Page Views</p>
                <p className="text-2xl font-semibold text-espresso">{metrics.pageViews}</p>
              </div>
              <div className="card">
                <p className="text-xs uppercase text-espresso/60">Leads</p>
                <p className="text-2xl font-semibold text-espresso">{metrics.leads}</p>
              </div>
              <div className="card">
                <p className="text-xs uppercase text-espresso/60">Begin Checkout</p>
                <p className="text-2xl font-semibold text-espresso">{metrics.beginCheckout}</p>
              </div>
              <div className="card">
                <p className="text-xs uppercase text-espresso/60">Purchases</p>
                <p className="text-2xl font-semibold text-espresso">{metrics.purchases}</p>
              </div>
              <div className="card">
                <p className="text-xs uppercase text-espresso/60">WhatsApp Clicks</p>
                <p className="text-2xl font-semibold text-espresso">{metrics.whatsappClicks}</p>
              </div>
              <div className="card">
                <p className="text-xs uppercase text-espresso/60">Video Completes</p>
                <p className="text-2xl font-semibold text-espresso">{metrics.videoCompletes}</p>
              </div>
            </>
          ) : null}
        </div>
        <div className="mt-10 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-espresso">Leads</h2>
          <input
            placeholder="Filtrar por utm_campaign"
            value={campaignFilter}
            onChange={(event) => setCampaignFilter(event.target.value)}
            className="rounded-xl border border-espresso/20 px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-4 overflow-auto rounded-2xl border border-espresso/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-espresso/5 text-espresso/70">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">WhatsApp</th>
                <th className="p-3">Empresa</th>
                <th className="p-3">Segmento</th>
                <th className="p-3">Dor</th>
                <th className="p-3">Score</th>
                <th className="p-3">UTM</th>
                <th className="p-3">Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-espresso/10">
                  <td className="p-3 font-medium text-espresso">{lead.name}</td>
                  <td className="p-3">{lead.whatsapp}</td>
                  <td className="p-3">{lead.company ?? "-"}</td>
                  <td className="p-3">{lead.segment ?? "-"}</td>
                  <td className="p-3">{lead.pain ?? "-"}</td>
                  <td className="p-3">{lead.score}</td>
                  <td className="p-3">{lead.utmCampaign ?? "-"}</td>
                  <td className="p-3">
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 ? (
                <tr>
                  <td className="p-4 text-sm text-espresso/60" colSpan={8}>
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
