import type { Metadata } from "next";
import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import SocialLinks from "@/components/SocialLinks";
import { getProducts, getProfile, getSocials } from "@/lib/googleSheets";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = profile.name
    ? `${profile.name} | Google Sheet Templates`
    : "SheetCraft | Google Sheet Templates";
  const description =
    profile.subheadline || "Google Sheet templates to help you work smarter and faster.";

  return {
    title,
    description,
  };
}

export default async function Home() {
  const [profile, socials, products] = await Promise.all([
    getProfile(),
    getSocials(),
    getProducts(),
  ]);

  return (
    <main>
      <Banner profile={profile} />
      <SocialLinks socials={socials} />
      <div className="section-shell divider-wrap">
        <div className="gold-divider" />
      </div>
      <ProductList products={products} />
      <footer className="section-shell page-footer">
        <p>
          {profile.footer_text || "Made with coffee by SheetCraft"}
          {profile.website ? (
            <a
              href={`https://${profile.website.replace(/^https?:\/\//, "")}`}
              target="_blank"
              rel="noreferrer"
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
