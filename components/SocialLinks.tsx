import type { Social } from "@/types";
import Image from "next/image";
type SocialLinksProps = {
  socials: Social[];
};

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#0866FF",
  instagram: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  threads: "rgb(10, 10, 10)",
  tiktok: "#000",
  zalo: "#0068ff",
  website: "#00A1F5",
  youtube: "#FF0033",
};

function resolveIconBackground(color: string): string {
  return color.toLowerCase() === "gradient"
    ? "linear-gradient(140deg, #f58529, #dd2a7b, #8134af, #515bd4)"
    : color;
}

export default function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <section className="mx-auto w-full max-w-[860px] px-[10px] pb-[14px]">
      <p className="mb-3.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#6b6455]">
        Kết nối với mình
      </p>
      <div className="grid grid-cols-3 gap-2">
        {socials.map((social) => {
          const platformColor = PLATFORM_COLORS[social.platform.toLowerCase()] ?? social.icon_color ?? "#000000";
          return (
            <a
              key={`${social.platform}-${social.url}`}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="relative flex items-center px-1 overflow-hidden rounded-3xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: platformColor,
              }}
            >
              <span
                className="inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-xl"
              >
                <Image src={`/${social.platform}.svg`} alt={`${social.platform} icon`} width={20} height={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-[var(--font-syne)] text-sm font-bold text-white">{social.label}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
