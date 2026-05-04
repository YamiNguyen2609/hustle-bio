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
    <section className="banner-wrap">
      <div className="banner-grid-glow" />
      <div className="banner-content section-shell">
        <div
          className="fade-up"
          style={{
            animationDelay: "0.02s",
            width: "100%",
            maxWidth: "860px",
            margin: "0 auto 20px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(245, 197, 24, 0.25)",
          }}
        >
          <Image
            src={profile.banner_url || fallbackBanner}
            alt="Banner"
            width={1600}
            height={500}
            style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
            unoptimized
          />
        </div>

        <div className="avatar-wrap fade-up" style={{ animationDelay: "0.08s" }}>
          <Image
            src={profile.avatar_url || fallbackAvatar}
            alt={profile.name || "Avatar"}
            width={112}
            height={112}
            unoptimized
          />
        </div>

        <h1 className="banner-title fade-up" style={{ animationDelay: "0.14s", marginBottom: 0 }}>
          {profile.name || "Temply"}
        </h1>
      </div>
    </section>
  );
}
