import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

function scoreLead(data: {
  pain?: string;
  role?: string;
  revenue?: string;
  engagement?: boolean;
}) {
  let score = 0;
  if (data.pain) score += 30;
  if (data.role && /(dono|ceo|diretor|sócio|socio)/i.test(data.role)) score += 20;
  if (data.revenue) score += 10;
  if (data.engagement) score += 15;
  return score;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const score = scoreLead({
    pain: body.pain,
    role: body.role,
    revenue: body.revenue,
    engagement: body.engagement
  });

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      whatsapp: body.whatsapp,
      email: body.email ?? null,
      company: body.company ?? null,
      segment: body.segment ?? null,
      pain: body.pain ?? null,
      role: body.role ?? null,
      revenue: body.revenue ?? null,
      utmSource: body.utm_source ?? null,
      utmMedium: body.utm_medium ?? null,
      utmCampaign: body.utm_campaign ?? null,
      utmContent: body.utm_content ?? null,
      utmTerm: body.utm_term ?? null,
      score
    }
  });

  await prisma.eventLog.create({
    data: {
      eventName: "lead_form_submit",
      eventId: body.event_id ?? "",
      leadId: lead.id,
      payload: JSON.stringify(body)
    }
  });

  return NextResponse.json({ ok: true, leadId: lead.id });
}
