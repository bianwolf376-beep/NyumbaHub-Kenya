import { counties } from "./counties";
import CountyCard from "./CountyCard";

import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/common/Section";

export default function CountiesExplorer() {
  return (
    <Section>

      <SectionTitle>
        Browse by County
      </SectionTitle>

      <SectionSubtitle>
        Explore rental homes and properties across Kenya.
      </SectionSubtitle>

      <div className="mt-16 grid gap-6 md:grid-cols-3 xl:grid-cols-4">

        {counties.map((county) => (
          <CountyCard
            key={county}
            county={county}
          />
        ))}

      </div>

    </Section>
  );
}