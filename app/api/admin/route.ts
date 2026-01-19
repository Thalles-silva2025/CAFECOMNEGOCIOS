import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [leads, pageViews, beginCheckout, purchases, whatsappClicks, videoCompletes] =
    await Promise.all([
      prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.eventLog.count({ where: { eventName: "view_content" } }),
      prisma.eventLog.count({ where: { eventName: "begin_checkout" } }),
      prisma.purchase.count(),
      prisma.eventLog.count({ where: { eventName: "click_whatsapp" } }),
      prisma.eventLog.count({ where: { eventName: "video_complete" } })
    ]);

  return NextResponse.json({
    leads,
    metrics: {
      pageViews,
      leads: leads.length,
      beginCheckout,
      purchases,
      whatsappClicks,
      videoCompletes
    }
  });
}
