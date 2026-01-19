"use client";

import { useEffect, useRef, useState } from "react";
import { logServerEvent, pushDataLayer } from "../lib/analytics";

type Props = {
  videoUrl: string;
};

function extractVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu")) {
      if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
      const parts = parsed.pathname.split("/").filter(Boolean);
      return parts[parts.length - 1];
    }
  } catch {
    return "";
  }
  return "";
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          events: {
            onReady: (event: { target: { playVideo: () => void } }) => void;
            onStateChange: (event: { data: number }) => void;
          };
        }
      ) => {
        getDuration: () => number;
        getCurrentTime: () => number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function VideoPlayer({ videoUrl }: Props) {
  const [ready, setReady] = useState(false);
  const progressMarks = useRef(new Set<number>());
  const playerRef = useRef<{ getDuration: () => number; getCurrentTime: () => number } | null>(
    null
  );

  useEffect(() => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    const scriptId = "youtube-iframe-api";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT!.Player("yt-player", {
        videoId,
        events: {
          onReady: () => setReady(true),
          onStateChange: (event) => {
            if (event.data === 1) {
              pushDataLayer("video_start", { page_section: "video" });
              logServerEvent("video_start", { page_section: "video" });
            }
          }
        }
      });
    };

    const interval = window.setInterval(() => {
      if (!playerRef.current) return;
      const duration = playerRef.current.getDuration();
      if (!duration) return;
      const current = playerRef.current.getCurrentTime();
      const percent = Math.round((current / duration) * 100);
      [25, 50, 75, 100].forEach((mark) => {
        if (percent >= mark && !progressMarks.current.has(mark)) {
          progressMarks.current.add(mark);
          const eventName = mark === 100 ? "video_complete" : `video_progress_${mark}`;
          pushDataLayer(eventName, { page_section: "video" });
          if (mark === 100) {
            logServerEvent("video_complete", { page_section: "video" });
          }
        }
      });
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, [videoUrl]);

  const videoId = extractVideoId(videoUrl);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-espresso/10 bg-black/90">
      <div className="aspect-video" id="yt-player" />
      {!ready ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
          Carregando vídeo...
        </div>
      ) : null}
    </div>
  );
}
