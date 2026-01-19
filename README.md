# Hub Business • Café da Manhã de Precificação

Landing page de alta conversão com tracking completo (GTM + dataLayer), checkout PIX stub e dashboard interno de leads.

## Setup local

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

A aplicação roda em `http://localhost:3000`.

## Deploy na Vercel

1. Crie um novo projeto na Vercel apontando para este repositório.
2. Configure as variáveis de ambiente conforme o `.env.example`.
3. Garanta que o build usa `npm run build`.

## Variáveis de ambiente

Veja `.env.example` para todas as chaves necessárias.

## Tracking / QA checklist

1. **GTM Preview**: confirme se os eventos aparecem (`view_content`, `scroll_depth_*`, `video_*`, `click_cta_primary`, `click_whatsapp`, `lead_form_submit`, `begin_checkout`, `purchase`).
2. **GA4 Realtime**: valide se os eventos estão chegando com `event_id` e UTMs.
3. **Meta Pixel Test** (via GTM): cheque disparos de `ViewContent`, `Lead`, `InitiateCheckout`, `Purchase`.
4. **Consentimento LGPD**: confirme que tags só disparam após consentimento.

## Observações

- O checkout PIX é um stub com `TODO` para integração real (Asaas/MercadoPago).
- O admin `/admin` requer `ADMIN_PASSWORD`.
