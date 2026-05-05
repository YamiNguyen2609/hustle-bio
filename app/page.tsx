"use client";

import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import SocialLinks from "@/components/SocialLinks";
import { useDataContext } from "@/context/DataContext";

export default function Home() {
  const { loading, profile, socials, products, error } = useDataContext();

  if (loading) {
    return <main className="p-6 text-center text-lg font-semibold">Loading</main>;
  }

  if (error) {
    return <main className="p-6 text-center text-lg font-semibold text-red-600">{error}</main>;
  }

  return (
    <main>
      <Banner profile={profile} />
      <SocialLinks socials={socials} />
      <div className="mx-auto mt-3 w-full max-w-[760px] px-[10px]">
        <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(245,197,24,0.5)_25%,rgba(245,197,24,0.5)_75%,transparent_100%)]" />
      </div>
      <ProductList products={products} />
      <footer className="mx-auto w-full max-w-[760px] border-t border-[#f5c51840] px-[10px] pb-7 pt-[18px]">
        <p className="text-center text-[#6b6455]">
          {profile.footer_text || "Made with coffee by SheetCraft"}
          {profile.website ? (
            <a
              href={`https://${profile.website.replace(/^https?:\/\//, "")}`}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#c9a000]"
            >
              {" - "}
              {profile.website}
            </a>
          ) : null}
        </p>
      </footer>
    </main>
  );
}
