import Image from "next/image";
import { PageTracking } from "../components/PageTracking";
import { VideoPlayer } from "../components/VideoPlayer";
import { LeadForm } from "../components/LeadForm";
import { MiniLeadForm } from "../components/MiniLeadForm";
import { StickyCTA } from "../components/StickyCTA";
import { ExitIntent } from "../components/ExitIntent";
import { TrackableLink } from "../components/TrackableLink";
import { TrackableAnchor } from "../components/TrackableAnchor";

const headlineVariants = {
  A: "Pare de chutar preço. Construa a precificação que paga seu custo fixo e sobra lucro.",
  B: "Seu negócio não precisa vender mais — precisa cobrar certo.",
  C: "Uma manhã prática para sair com o preço certo na mão."
};

function getVariantHeadline(variant?: string) {
  if (!variant) return headlineVariants.A;
  return headlineVariants[variant as keyof typeof headlineVariants] || headlineVariants.A;
}

export default function Home({
  searchParams
}: {
  searchParams?: { variant?: string };
}) {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || "";
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || "";
  const price = "R$ 97,00";
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "#";
  const headline = getVariantHeadline(searchParams?.variant);

  return (
    <main className="bg-latte">
      <PageTracking />
      <ExitIntent whatsappUrl={whatsappUrl} />
      <section className="relative overflow-hidden pb-16 pt-10">
        <div className="container-safe grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <Image src={logoUrl} alt="Hub Business" width={140} height={48} />
              ) : null}
              <span className="badge">Presencial • Goiânia • 15 vagas</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-espresso sm:text-5xl">
              {headline}
            </h1>
            <p className="text-lg text-espresso/70">
              Workshop prático: você sai com a lógica do preço aplicada no seu
              negócio, considerando custos, impostos e margem.
            </p>
            <div className="flex flex-wrap gap-3">
              {["26/01", "08:00", "Torre Tokio (Sala 1107)", "15 vagas"].map(
                (chip) => (
                  <span key={chip} className="badge">
                    {chip}
                  </span>
                )
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackableLink
                href="/checkout"
                className="btn-primary"
                eventName="click_cta_primary"
                pageSection="hero"
              >
                Garantir minha vaga por {price}
              </TrackableLink>
              <TrackableAnchor
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                eventName="click_whatsapp"
                pageSection="hero"
              >
                Falar com a Dany no WhatsApp
              </TrackableAnchor>
            </div>
            <p className="text-sm text-espresso/60">
              Workshop prático. Você sai com a lógica do preço aplicada no seu
              negócio.
            </p>
          </div>
          <MiniLeadForm />
        </div>
      </section>

      <section className="container-safe py-16" id="video">
        <div className="grid gap-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="section-title">Veja o que acontece em 8 minutos</h2>
            <TrackableLink
              href="/checkout"
              className="btn-primary hidden sm:inline-flex"
              eventName="click_cta_primary"
              pageSection="video"
            >
              Quero minha vaga
            </TrackableLink>
          </div>
          <VideoPlayer videoUrl={videoUrl} />
          <TrackableLink
            href="/checkout"
            className="btn-primary sm:hidden"
            eventName="click_cta_primary"
            pageSection="video"
          >
            Garantir minha vaga
          </TrackableLink>
        </div>
      </section>

      <section className="container-safe py-16">
        <h2 className="section-title">O que você vai construir na prática</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Formação de custos (produto e serviço)",
            "Como considerar custo fixo no preço",
            "Como inserir impostos corretamente no custo",
            "Como inserir taxas (cartão, marketplace, etc.)",
            "Como definir margem ideal e validar preço",
            "Como usar o Precifica-Pro para conferir tudo em minutos"
          ].map((item) => (
            <div key={item} className="card text-sm text-espresso/80">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="container-safe py-16" id="diagnostico">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <h2 className="section-title">Mini-diagnóstico (lead)</h2>
            <p className="text-sm text-espresso/70">
              Preencha rápido para resgatar sua vaga caso haja abandono e para a
              equipe entender seu cenário.
            </p>
            <div className="card text-sm text-espresso/70">
              Bônus para quem falar com a equipe ao final: livro digital +
              condição especial no local.
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="container-safe py-16">
        <h2 className="section-title">Como funciona a manhã (90 min)</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "0–10: Abertura e alinhamento",
            "10–40: Workshop (mão na massa)",
            "40–55: Validação e estrutura (Precifica-Pro)",
            "55–70: Próximos passos (para quem quiser avançar)",
            "70–90: Networking e dúvidas"
          ].map((item) => (
            <div key={item} className="card text-sm text-espresso/80">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="container-safe py-16">
        <div className="rounded-3xl border border-espresso/10 bg-white p-8">
          <h2 className="section-title">Bônus + condição especial</h2>
          <p className="mt-3 text-sm text-espresso/70">
            Para quem conversar com a equipe no final, entregaremos um livro
            digital e uma condição especial presencial. Sem promessas
            exageradas, apenas um próximo passo bem orientado.
          </p>
        </div>
      </section>

      <section className="container-safe py-16">
        <h2 className="section-title">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {[
            {
              q: "Já tenho ERP / contador",
              a: "Ótimo. A metodologia complementa seu ERP e traduz os custos em decisões de preço com margem real."
            },
            {
              q: "R$97 vale?",
              a: "O objetivo é sair com a lógica pronta para aplicar no seu negócio. É prático e direto."
            },
            {
              q: "O que levar?",
              a: "Leve notebook ou planilhas com seus custos básicos. Quanto mais dados, mais rápido avançamos."
            },
            {
              q: "Posso levar sócio?",
              a: "Sim, comprando um ingresso por pessoa. São apenas 15 vagas presenciais."
            },
            {
              q: "Não tenho tempo",
              a: "É uma manhã objetiva de 90 minutos. Se você não corrigir preço, o custo do erro é diário."
            },
            {
              q: "Meu produto tem margem apertada",
              a: "Justamente por isso o encontro existe: para mapear custos e definir margem realista."
            },
            {
              q: "Tenho medo de aumentar preço",
              a: "Você terá critérios claros para justificar o preço e validar antes de aplicar."
            }
          ].map((item) => (
            <div key={item.q} className="card">
              <p className="text-sm font-semibold text-espresso">{item.q}</p>
              <p className="mt-2 text-sm text-espresso/70">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackableLink
            href="/checkout"
            className="btn-primary"
            eventName="click_cta_primary"
            pageSection="faq"
          >
            Garantir minha vaga
          </TrackableLink>
          <TrackableAnchor
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            eventName="click_whatsapp"
            pageSection="faq"
          >
            Falar com a Dany
          </TrackableAnchor>
        </div>
      </section>

      <footer className="border-t border-espresso/10 bg-white py-10">
        <div className="container-safe grid gap-4 text-sm text-espresso/70 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-espresso">Café da Manhã de Precificação</p>
            <p>26/01/2026 • 08:00 • Torre Tokio — Sala 1107</p>
            <p>
              Av. Dep. Jamel Cecílio, 2690 - Jardim Goiás, Goiânia - GO, 74810-100
            </p>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL}
              className="text-espresso underline"
              target="_blank"
              rel="noreferrer"
            >
              Ver no Google Maps
            </a>
          </div>
          <div className="space-y-2">
            <p>
              WhatsApp:{" "}
              <TrackableAnchor
                href={whatsappUrl}
                className="text-espresso underline"
                target="_blank"
                rel="noreferrer"
                eventName="click_whatsapp"
                pageSection="footer"
              >
                Falar com a Dany
              </TrackableAnchor>
            </p>
            <p>
              Suporte:{" "}
              <span className="text-espresso">
                {process.env.SUPPORT_EMAIL || "suporte@hubbusiness.com"}
              </span>
            </p>
            <div className="flex gap-4">
              <a href="/privacidade" className="underline">
                Privacidade
              </a>
              <a href="/termos" className="underline">
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
      <StickyCTA price={price} whatsappUrl={whatsappUrl} />
    </main>
  );
}
