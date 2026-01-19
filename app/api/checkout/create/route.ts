import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST() {
  const stubPix = {
    pixCopyPaste:
      "00020126580014BR.GOV.BCB.PIX0136stub-precificacao-hub-business520400005303986540597.005802BR5925HUB BUSINESS PRECIFICACAO6009GOIANIA62070503***6304ABCD",
    qrCodeUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=PIX_STUB_HUB_BUSINESS"
  };

  await prisma.eventLog.create({
    data: {
      eventName: "checkout_create",
      eventId: "stub",
      payload: stubPix
    }
  });

  return NextResponse.json(stubPix);
}
