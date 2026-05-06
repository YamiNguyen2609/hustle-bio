import Image from "next/image";
import type { Social } from "@/types";

type SocialCardProps = {
  social: Social;
};

export default function SocialCard({ social }: SocialCardProps) {
  const PLATFORM_COLORS: Record<string, string> = {
    facebook: "#0866FF",
    instagram: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    threads: "rgb(10, 10, 10)",
    tiktok: "#000",
    zalo: "#0068ff",
    website: "#00A1F5",
    youtube: "#FF0033",
  };

  const platformColor = PLATFORM_COLORS[social.platform.toLowerCase()] ?? social.icon_color ?? "#000000";

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noreferrer"
      className="relative flex items-center overflow-hidden rounded-full pl-1 pr-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: platformColor,
      }}
    >
      <span className="inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-xl">
        <Image src={`/${social.platform}.svg`} alt={`${social.platform} icon`} width={22} height={22} />
      </span>
      <div className="min-w-0">
        <p className="truncate font-[var(--font-syne)] text-sm font-bold text-white">{social.label}</p>
      </div>
    </a>
  );
}
