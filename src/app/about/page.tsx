import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import FAQSection from "@/components/shared/FAQSection";
import BrandCarousel from "@/components/shared/BrandCarousel";

export const metadata: Metadata = constructMetadata({
  title: "About Us | American Legend Ice Cream Truck",
  description: `An American Tradition, Reimagined for Today. We are New England's most trusted ice cream truck rental service.`,
  url: "/about",
});

const faqs = [
  {
    question: "Where are you based and how far do you travel?",
    answer: "We travel across all of New England. Depending on the distance, a small travel fee may apply, but we are happy to bring the joy to your location."
  },
  {
    question: "Are your trucks licensed and insured?",
    answer: "Absolutely. We are fully licensed, permitted, and carry comprehensive liability insurance. We adhere to the strictest health and safety standards."
  },
  {
    question: "Do you have options for people with allergies?",
    answer: "Yes! We carry a wide variety of pre-packaged treats, including nut-free, dairy-free, and gluten-free options. Because our items are pre-packaged, the risk of cross-contamination is significantly reduced."
  },
  {
    question: "How far in advance should we book?",
    answer: "We recommend booking as early as possible, especially for weekend events in the summer, as our calendar fills up quickly. However, we always try our best to accommodate last-minute requests if we have a truck available."
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-cream">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-0 md:pt-44 overflow-hidden bg-cream">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-coral/10 text-coral font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-6 border border-coral/20">
            About Us
          </span>
          <h1 className="font-display italic font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-charcoal mb-4">
            American Legend Ice Cream Truck
          </h1>
          <p className="font-sans font-medium text-xl md:text-2xl text-coral max-w-3xl mx-auto leading-relaxed">
            An American Tradition, Reimagined for Today
          </p>
        </div>

        {/* Image blended into the cream background — no frame, no badge */}
        <div className="relative w-full max-w-2xl mx-auto mt-8 px-6 md:px-12">
          <Image
            src="/images/about_us.png"
            alt="American Legend Ice Cream Truck"
            width={900}
            height={700}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-16 md:py-24 relative bg-cream">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto">
            <div className="w-full space-y-12">

              <div className="prose prose-lg md:prose-xl text-charcoal/80 font-sans font-medium leading-relaxed max-w-none">
                <p>
                  Since 1999, American Legend Ice Cream Truck has been bringing smiles, excitement, and unforgettable moments to celebrations throughout New England.
                </p>
                <p>
                  We serve birthdays, weddings, school events, corporate gatherings, employee appreciation events, private parties, and community celebrations with the classic American ice cream truck experience generations have grown up loving.
                </p>
                <p>
                  But we have learned something important after decades in this business and thousands upon thousands of smiling faces:
                </p>
              </div>

              <div className="bg-[#FFFDF8] rounded-[2.5rem] p-10 sm:p-14 border border-navy/5 shadow-xl text-center relative overflow-hidden">
                <h2 className="font-display italic font-bold text-3xl sm:text-4xl md:text-5xl text-navy drop-shadow-sm">
                  We Don&apos;t Sell Ice Cream.<br/>
                  <span className="text-coral">We Make Memories.</span>
                </h2>
              </div>

              <div className="prose prose-lg md:prose-xl text-charcoal/80 font-sans font-medium leading-relaxed max-w-none">
                <p>
                  You can buy ice cream almost anywhere. When you book American Legend, you are looking for something more.
                </p>
                <p>
                  You are looking for that moment when the truck arrives. Children get excited. Adults remember their own childhood. Friends, families, classmates, and coworkers gather together. For a little while, something as simple as an ice cream truck becomes part of a celebration people remember.
                </p>
                <p className="text-2xl font-bold text-navy">
                  That is what we deliver.
                </p>
                <p>
                  The neighborhood ice cream truck is a special part of American culture and tradition, and we are proud to help keep it alive. At the same time, we believe tradition should move forward with the people it serves.
                </p>
                <p>
                  That is why American Legend combines the nostalgia of the classic ice cream truck with today&apos;s technology, easy online reservations, and AI-powered instant quotes. Customers can begin planning faster and more conveniently while still receiving the personal, human experience that has always defined our service.
                </p>
              </div>

              <div className="pl-6 sm:pl-8 border-l-4 border-coral/40">
                <h3 className="font-display font-black text-3xl md:text-4xl text-navy mb-6 tracking-tight">
                  Our Mission
                </h3>
                <div className="space-y-5 font-sans text-charcoal/80 text-lg md:text-xl leading-relaxed font-medium">
                  <p>
                    Our mission is simple: create happiness, bring people together, and turn celebrations into lasting memories.
                  </p>
                  <p>
                    We don&apos;t measure success only by how many ice creams we serve. We measure it by the smiles we see, the experiences we create, and the memories our customers and their guests take home.
                  </p>
                  <p>
                    Technology will continue to change. The way people plan and book celebrations will continue to change.
                  </p>
                  <p className="font-bold text-navy text-2xl mt-8">
                    But one thing should never change:
                  </p>
                  <p className="font-bold text-coral text-3xl font-display italic drop-shadow-sm">
                    The smile when the ice cream truck arrives.
                  </p>
                  <p>
                    That is American Legend Ice Cream Truck—honoring yesterday&apos;s American tradition, serving today&apos;s celebrations, and preparing for tomorrow.
                  </p>
                </div>
              </div>

              <div className="pt-12 text-center">
                <p className="font-bold text-navy text-xl uppercase tracking-widest mb-4">
                  Serving New England Since 1999
                </p>
                <p className="font-medium text-charcoal/60 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                  Birthdays • Weddings • Schools • Corporate Events • Private Parties • Community Celebrations
                </p>
                <div className="flex flex-col gap-3 font-display italic font-bold text-xl sm:text-2xl text-navy">
                  <p>American Culture. Modern Technology. Timeless Memories.</p>
                  <p className="text-coral">Yesterday&apos;s Tradition. Today&apos;s Technology. Tomorrow&apos;s Memories.</p>
                  <p>We Don&apos;t Sell Ice Cream. We Make Memories.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* BrandCarousel and FAQ */}
      <div className="bg-cream">
        <BrandCarousel topDripColor="#FFFBF5" />
      </div>

      <div className="bg-cream pb-24">
        <FAQSection
          title="About Our Service"
          subtitle="Common questions about how we operate."
          items={faqs}
        />
      </div>
    </div>
  );
}


