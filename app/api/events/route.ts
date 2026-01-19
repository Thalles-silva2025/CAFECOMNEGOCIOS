import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  await prisma.eventLog.create({
    data: {
      eventName: body.event,
      eventId: body.event_id ?? "",
      payload: JSON.stringify(body)
    }
  });

  return NextResponse.json({ ok: true });
}
