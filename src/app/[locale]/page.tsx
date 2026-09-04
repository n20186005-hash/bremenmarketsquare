import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Highlights from '@/components/Highlights';
import Story from '@/components/Story';
import WeatherPanel from '@/components/WeatherPanel';
import Facilities from '@/components/Facilities';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';
import { buildTouristAttractionJsonLd, buildFaqJsonLd } from '@/lib/structured-data';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = buildTouristAttractionJsonLd(locale as 'zh' | 'en' | 'de');
  const messages = (await getMessages({ locale: locale as 'zh' | 'en' | 'de' })) as any;
  const faqItems = (messages?.faq?.items || []).map((item: { q: string; a: string }) => ({
    question: item.q,
    answer: item.a,
  }));
  const faqJsonLd = buildFaqJsonLd(faqItems);

  return (
    <>
      {/* Structured data: TouristAttraction (local SEO / entity signals) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Structured data: FAQPage (featured snippet / AI overview eligibility) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Highlights />
        <Story />
        <WeatherPanel locale={locale as 'zh' | 'en' | 'de'} />
        <Facilities />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <RouteSection />
        <PhotoSpotsSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
