import GenerateSection from "@/components/app/generate";
import SectionHeader from '@/components/section-header';

export default function NewPage() {
  return (
    <div className={"flex flex-col gap-8"}>
      <section className="container flex flex-col gap-2">
        <SectionHeader title={"Generate new color palette"} />
      </section>
      {/* @ts-ignore */}
      <GenerateSection />
    </div>
  );
}
