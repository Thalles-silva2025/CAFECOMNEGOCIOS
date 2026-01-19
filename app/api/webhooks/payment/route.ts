import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// TODO: Integrar com Asaas/MercadoPago para confirmar pagamentos reais.
export async function POST(request: NextRequest) {
  const body = await request.json();

  await prisma.purchase.create({
    data: {
      status: body.status ?? "paid",
      value: Number(body.value ?? 97),
      currency: body.currency ?? "BRL",
      leadId: body.lead_id ?? null
    }
  });

  await prisma.eventLog.create({
    data: {
      eventName: "payment_webhook",
      eventId: body.event_id ?? "",
      payload: JSON.stringify(body)
    }
  });

  return NextResponse.json({ received: true });
}
