# Event Taxonomy

Eventos enviados via `dataLayer.push` e também registrados em `/api/events` (quando aplicável).

## Parâmetros padrão

- `event_id`
- `page_section`
- `offer` = `cafe_precificacao_97`
- `currency` = `BRL`
- `value` (quando aplicável)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `device_type`

## Eventos principais

| Evento | Quando dispara | Observações |
| --- | --- | --- |
| `view_content` | 3s após carregar a landing | Conta page views |
| `scroll_depth_25/50/75/90` | Ao atingir profundidades | Landing |
| `video_start` | Start do vídeo | YouTube API |
| `video_progress_25/50/75` | Progresso do vídeo | YouTube API |
| `video_complete` | 100% do vídeo | YouTube API |
| `click_cta_primary` | Clique no CTA de compra | Hero, vídeo, FAQ, sticky |
| `click_whatsapp` | Clique em WhatsApp | Hero, sticky, footer, exit-intent, checkout |
| `lead_form_start` | Foco no formulário | Mini diagnóstico |
| `lead_form_submit` | Envio de formulário | Lead principal ou two-step |
| `generate_lead` | Após submit com sucesso | Lead principal ou two-step |
| `begin_checkout` | Ao entrar no `/checkout` | Value=97.00 |
| `purchase` | Ao chegar em `/obrigado` | Value=97.00 |
| `time_on_page_30s/90s` | Tempo na landing | Landing |

## Notas de deduplicação

- `event_id` é gerado por sessão e anexado a todos os eventos.
- UTM é persistido por 7 dias.
