# GTM Setup (GTM-PMZXQXD6)

## 1) Variáveis de Data Layer

Crie variáveis do tipo **Data Layer Variable**:

- `event_id`
- `page_section`
- `offer`
- `currency`
- `value`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `device_type`

## 2) Triggers (Custom Event)

Crie triggers para cada evento:

- `view_content`
- `scroll_depth_25`
- `scroll_depth_50`
- `scroll_depth_75`
- `scroll_depth_90`
- `video_start`
- `video_progress_25`
- `video_progress_50`
- `video_progress_75`
- `video_complete`
- `click_cta_primary`
- `click_whatsapp`
- `lead_form_start`
- `lead_form_submit`
- `generate_lead`
- `begin_checkout`
- `purchase`
- `time_on_page_30s`
- `time_on_page_90s`

## 3) Tags GA4 Event

Para cada trigger, crie uma tag **GA4 Event** com:

- Event Name: usar o nome do evento acima.
- Event Parameters: inclua `event_id`, `page_section`, `offer`, `currency`, `value`, `utm_*`, `device_type`.

## 4) Meta Pixel (via GTM)

Crie uma tag de Meta Pixel (template oficial ou HTML personalizado) e dispare:

- `ViewContent` -> `view_content`
- `Lead` -> `lead_form_submit`
- `InitiateCheckout` -> `begin_checkout`
- `Purchase` -> `purchase`

## 5) Consentimento (LGPD)

- Configure o Consent Mode no GTM.
- O site dispara `consent_update` com `consent_state`.
- Defina triggers para liberar tags apenas quando `analytics`/`marketing` = true.
