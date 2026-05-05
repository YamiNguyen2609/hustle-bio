import Image from "next/image";
import type { Profile } from "@/types";

type BannerProps = {
  profile: Profile;
};

export default function Banner({ profile }: BannerProps) {
  const fallbackBanner =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='500' viewBox='0 0 1600 500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23131b34'/%3E%3Cstop offset='100%25' stop-color='%2326304f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='500' fill='url(%23g)'/%3E%3Ccircle cx='350' cy='130' r='180' fill='rgba(245,197,24,0.18)'/%3E%3Ccircle cx='1220' cy='300' r='220' fill='rgba(245,197,24,0.14)'/%3E%3C/svg%3E";
  const fallbackAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112' viewBox='0 0 112 112'%3E%3Crect width='112' height='112' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' font-size='44' fill='%23f5c518' dy='.3em'%3EH2M%3C/text%3E%3C/svg%3E";

  return (
    <section className="relative overflow-hidden bg-[#1a1a2e] px-0 pb-[42px] pt-[34px] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(245,197,24,0.2),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(245,197,24,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,197,24,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(245,197,24,0.1)_1px,transparent_1px)] bg-[size:26px_26px] opacity-25" />
      <div className="relative z-[1] mx-auto w-full max-w-[760px] px-[18px] text-center">
        <div
          className="mx-auto mb-5 w-full max-w-[860px] overflow-hidden rounded-2xl border border-[#f5c51840]"
          style={{
            animationDelay: "0.02s",
          }}
        >
          <Image
            src={profile.banner_url || fallbackBanner}
            alt="Banner"
            width={1600}
            height={500}
            className="block h-[220px] w-full object-cover"
            unoptimized
          />
        </div>

        <div
          className="mx-auto mb-3.5 h-[116px] w-[116px] overflow-hidden rounded-full border-2 border-[#f5c518] shadow-[0_0_0_6px_rgba(245,197,24,0.15)]"
          style={{ animationDelay: "0.08s" }}
        >
          <Image
            src={profile.avatar_url || fallbackAvatar}
            alt={profile.name || "Avatar"}
            width={112}
            height={112}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>

        <h1
          className="mx-auto mb-0 max-w-[640px] font-[var(--font-syne)] text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.02em]"
          style={{ animationDelay: "0.14s" }}
        >
          {profile.name || "Temply"}
        </h1>
      </div>
    </section>
  );
}
