type YouTubeEmbedProps = {
  /** Pass either a full YouTube URL or a bare video ID */
  urlOrId: string;
  title?: string;
  start?: number;
  className?: string;
};

function parseYouTubeId(input: string): string {
  // Accept youtu.be, youtube.com/watch?v=, or a raw ID
  try {
    if (!input.includes("http")) return input;
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return id;
      // /embed/:id or /shorts/:id
      const parts = u.pathname.split("/");
      return parts.pop() || "";
    }
  } catch {}
  return input;
}

export default function YouTubeEmbed({
  urlOrId,
  title = "YouTube video",
  start = 0,
  className = "",
}: YouTubeEmbedProps) {
  const id = parseYouTubeId(urlOrId);
  // privacy-enhanced domain
  const src = `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0&controls=1&start=${start}`;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-md ${className}`}>
      {/* 16:9 aspect without plugin */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {/* Accessible fallback */}
      <p className="sr-only">
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open video on YouTube
        </a>
      </p>
    </div>
  );
}
