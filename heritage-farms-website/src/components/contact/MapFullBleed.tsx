"use client";

const ADDRESS = "16 Twin Sisters Lake Road, Marmora, Ontario, Canada";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&z=14&output=embed`;

export function MapFullBleed() {
  return (
    <section
      aria-label="Map to Heritage Farms"
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#00312D]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Maintain aspect ratio to avoid CLS */}
        <div className="aspect-[16/9] md:aspect-[21/9]">
          <iframe
            title={`Map showing ${ADDRESS}`}
            src={EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>
      </div>
      {/* Accessible fallback link for keyboard/screen-reader users */}
      <p className="sr-only">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            ADDRESS
          )}`}
          rel="noopener noreferrer"
        >
          Open map to {ADDRESS}
        </a>
      </p>
    </section>
  );
}
