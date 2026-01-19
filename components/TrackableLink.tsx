"use client";

import Link from "next/link";
import { ComponentProps } from "react";
import { logServerEvent, pushDataLayer } from "../lib/analytics";

type Props = ComponentProps<typeof Link> & {
  eventName: string;
  pageSection: string;
};

export function TrackableLink({ eventName, pageSection, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        pushDataLayer(eventName, { page_section: pageSection });
        logServerEvent(eventName, { page_section: pageSection });
        onClick?.(event);
      }}
    />
  );
}
