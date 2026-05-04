import type { Social } from "@/types";

type SocialLinksProps = {
  socials: Social[];
};

function PlatformIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  switch (key) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M23 12a28 28 0 0 1-.36 4.84 3.3 3.3 0 0 1-2.3 2.33C18.33 19.7 12 19.7 12 19.7s-6.33 0-8.34-.53a3.3 3.3 0 0 1-2.3-2.33A28 28 0 0 1 1 12a28 28 0 0 1 .36-4.84 3.24 3.24 0 0 1 2.3-2.31C5.67 4.3 12 4.3 12 4.3s6.33 0 8.34.55a3.24 3.24 0 0 1 2.3 2.31A28 28 0 0 1 23 12ZM10 15.5l6-3.5-6-3.5v7Z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M13.5 9H16V6h-2.5A4.5 4.5 0 0 0 9 10.5V13H6v3h3v6h3v-6h3l1-3h-4v-2.5c0-.83.67-1.5 1.5-1.5Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.4-2.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
          />
        </svg>
      );
    case "threads":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14.8 10.1a3.8 3.8 0 0 0-3.9-2.2c-2.1 0-3.6 1.1-3.6 2.8 0 1.9 1.4 2.5 3.7 2.9 1.9.3 2.4.8 2.4 1.7 0 .8-.7 1.4-1.9 1.4-1.3 0-2.2-.7-2.3-1.8H6.7c.1 2.4 2 4 4.7 4 2.8 0 4.8-1.5 4.8-3.9 0-2.1-1.3-3.2-3.9-3.7-1.9-.3-2.3-.7-2.3-1.3 0-.6.5-1.1 1.5-1.1.9 0 1.6.4 1.8 1.2h1.5Z"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
      );
  }
}

function resolveIconBackground(color: string): string {
  return color.toLowerCase() === "gradient"
    ? "linear-gradient(140deg, #f58529, #dd2a7b, #8134af, #515bd4)"
    : color;
}

export default function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <section className="section-shell social-shell">
      <p className="social-kicker">Ket noi voi minh</p>
      <div className="social-grid">
        {socials.map((social) => (
          <a
            key={`${social.platform}-${social.url}`}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="social-card fade-up"
          >
            <span
              className="social-icon"
              style={{ background: resolveIconBackground(social.icon_color || "#000000") }}
            >
              <PlatformIcon platform={social.platform} />
            </span>
            <div>
              <p className="social-label">{social.label}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
