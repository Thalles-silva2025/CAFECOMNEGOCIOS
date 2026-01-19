# Hub Business • Café da Manhã de Precificação

Landing page de alta conversão com tracking completo (GTM + dataLayer), checkout PIX stub e dashboard interno de leads.

## Deploy na Vercel (sem setup local)

1. Suba este repositório no GitHub/GitLab.
2. Na Vercel, crie um novo projeto e selecione o repositório.
3. Em **Environment Variables**, copie todas as chaves do `.env.example`.
4. Garanta que o build usa `npm run build`.
5. Clique em **Deploy**.

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
