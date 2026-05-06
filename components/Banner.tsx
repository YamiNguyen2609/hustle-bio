import Image from "next/image";
import type { Profile } from "@/types";

type BannerProps = {
  profile: Profile;
};

export default function Banner({ profile }: BannerProps) {
  const fallbackBanner =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='500' viewBox='0 0 1600 500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23131b34'/%3E%3Cstop offset='100%25' stop-color='%2326304f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='500' fill='url(%23g)'/%3E%3Ccircle cx='350' cy='130' r='180' fill='rgba(0,151,178,0.18)'/%3E%3Ccircle cx='1220' cy='300' r='220' fill='rgba(0,151,178,0.14)'/%3E%3C/svg%3E";
  return (
    <section className="relative overflow-hidden px-0 pb-[42px] text-white">
      <div className="relative z-[1] mx-auto w-full max-w-[860px]">
        <div
          className="mx-auto mb-5 w-full max-w-[860px] overflow-hidden"
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

        <div className="flex max-w-[640px] mb-0 items-center gap-4 backdrop-blur-[2px] max-[480px]:flex-col max-[480px]:items-center px-[10px]">
          <div
            className="h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full border-2 border-[#0097b2]"
            style={{ animationDelay: "0.08s" }}
          >
          {profile.avatar_url ? ( <Image
              src={profile.avatar_url}
              alt={profile.name || "Avatar"}
              width={60}
              height={60}
              className="h-full w-full object-cover"
              unoptimized
            />) : null}
          </div>

          <div className="min-w-0 text-left max-[480px]:text-center">
            <p
              className="text-2xl text-[#2e5f6b] mb-3 font-[var(--font-syne)] leading-[1.1] tracking-[-0.02em] font-semibold"
              style={{ animationDelay: "0.14s" }}
            >
              {profile.name || "Temply"}
            </p>
            <p className="text-[#2e5f6b] text-sm sm:text-base text-justify max-[480px]:text-center">{profile.tagline || profile.headline || "Template creator"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
