import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// utils
import { ReactQueryKeys } from "utils";

// components
import { Navbar, SplashScreen, StickyBar } from "components";

// sections
import { About, Faqs, Hero, Testimonials, NotFound } from "sections";

// providers
import { ScholarshipProvider, useHarbourSpaceApiClient } from "providers";
import { ScholarshipRawData } from "providers/Scholarship/types";

function ScholarshipView() {
  const harbourSpaceClient = useHarbourSpaceApiClient();

  const { slug } = useParams<{ slug: string }>();

  // Queries
  const { data, error, isLoading } = useQuery<ScholarshipRawData>({
    queryKey: [ReactQueryKeys.Scholarships],
    queryFn: () =>
      harbourSpaceClient.scholarshipApiClient.getBySlug(slug ?? ""),
    enabled: !!slug,
  });

  return (
    <>
      {!slug || !slug?.length ? (
        <NotFound />
      ) : (
        <>
          <SplashScreen isLoading={isLoading} error={error} />
          {error === null && data ? (
            <ScholarshipProvider data={data}>
              <Navbar />
              <main>
                <Hero />
                <About />
                <Testimonials />
                <Faqs />
              </main>
              <StickyBar />
            </ScholarshipProvider>
          ) : null}
        </>
      )}
    </>
  );
}

export default ScholarshipView;
