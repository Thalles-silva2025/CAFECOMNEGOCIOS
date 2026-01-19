"use client";

import { AnchorHTMLAttributes } from "react";
import { logServerEvent, pushDataLayer } from "../lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  pageSection: string;
};

export function TrackableAnchor({ eventName, pageSection, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        pushDataLayer(eventName, { page_section: pageSection });
        logServerEvent(eventName, { page_section: pageSection });
        onClick?.(event);
      }}
    />
  );
}
