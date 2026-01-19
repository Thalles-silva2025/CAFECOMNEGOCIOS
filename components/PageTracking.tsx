"use client";

import { useEffect, useRef } from "react";
import { logServerEvent, pushDataLayer } from "../lib/analytics";
import { persistUtms, readUtmFromUrl } from "../lib/utm";

export function PageTracking() {
  const scrollMarks = useRef(new Set<number>());

  useEffect(() => {
    persistUtms(readUtmFromUrl());
  }, []);

  useEffect(() => {
    const viewTimer = window.setTimeout(() => {
      pushDataLayer("view_content", { page_section: "landing" });
      logServerEvent("view_content", { page_section: "landing" });
    }, 3000);

    const time30 = window.setTimeout(() => {
      pushDataLayer("time_on_page_30s", { page_section: "landing" });
    }, 30000);

    const time90 = window.setTimeout(() => {
      pushDataLayer("time_on_page_90s", { page_section: "landing" });
    }, 90000);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);
      [25, 50, 75, 90].forEach((mark) => {
        if (percent >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          pushDataLayer(`scroll_depth_${mark}`, {
            page_section: "landing"
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(viewTimer);
      window.clearTimeout(time30);
      window.clearTimeout(time90);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
