import type { Social } from "@/types";
import SocialCard from "./SocialCard";

type SocialLinksProps = {
  socials: Social[];
  className?: string
};

export default function SocialLinks({ socials, className }: SocialLinksProps) {
  if (!className) className = "max-[480px]:grid-cols-2 gap-3";
  return (
    <section className="mx-auto w-full max-w-[860px] px-[10px] pb-[14px]">
      <p className="mb-3.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#6b6455]">
        Kết nối với mình
      </p>
      <div style={{ ['--cols' as string]: socials.length }} className={`grid ${className} grid-cols-[repeat(var(--cols),minmax(0,1fr))]`}>
        {socials.map((social) => (
          <SocialCard key={`${social.platform}-${social.url}`} social={social} />
        ))}
      </div>
    </section>
  );
}
