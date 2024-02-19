import { useMemo, useState } from "react";

// components
import { Accordion, Menu } from "./components";

// providers
import { useScholarship } from "providers";

function Faqs() {
  const { faqs, faqTypes } = useScholarship();

  const [filterBy, setFilterBy] = useState<number>(0);

  const filteredFaqs = useMemo(
    () => faqs.filter((faq) => faq.type === faqTypes[filterBy]),
    [filterBy, faqs]
  );

  return (
    <section
      id="faqs"
      className="section w-full flex flex-col mb-20 ipadPro:mb-0 mobile:px-7"
    >
      <div className="mb-10 ipad:mb-0 w-full flex items-center justify-between ipadPro:flex-col ipadPro:items-start ipadPro:justify-start ipadPro:gap-10">
        <h2>
          Frequently asked <br /> questions
        </h2>
        <div className="flex items-center gap-10 ipadPro:w-full ipad:flex-col ipad:items-start mobile:gap-2 ">
          <p className="w-[100px]">Filter by:</p>
          <Menu
            selected={filterBy}
            onChange={(active: number) => setFilterBy(active)}
            items={faqTypes}
          />
        </div>
      </div>
      <Accordion items={filteredFaqs} />
    </section>
  );
}

export default Faqs;
