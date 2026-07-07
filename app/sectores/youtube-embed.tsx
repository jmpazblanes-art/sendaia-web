"use client";

import { useState } from "react";

// Embed de YouTube con lazy-load (miniatura + play; el iframe carga al pulsar).
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: "16 / 9", background: "#000", border: "1px solid rgba(212,175,55,0.25)" }}
    >
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} className="group absolute inset-0 h-full w-full" aria-label={`Reproducir: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,8,0.6), rgba(6,6,8,0.15))" }} />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{ background: "var(--accent)" }}
          >
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden>
              <path d="M21 13L0 25.99V0L21 13Z" fill="#0b0b16" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
