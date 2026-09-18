import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { BUSINESS_CONFIG } from "@/lib/config";
import Image from "next/image";
import FAQSection from "@/components/shared/FAQSection";
import BrandCarousel from "@/components/shared/BrandCarousel";
import MeltingDrip from "@/components/shared/MeltingDrip";

export const metadata: Metadata = constructMetadata({
  title: "About Us | Boston Legend Ice Cream Truck",
  description: `Learn about the story behind ${BUSINESS_CONFIG.name}. We are Massachusetts' most trusted ice cream truck rental service.`,
  url: "/about",
});

const faqs = [
  {
    question: "Where are you based and how far do you travel?",
    answer: "We are based in Massachusetts and travel across the entire state. Depending on the distance, a small travel fee may apply, but we are happy to bring the joy to your location."
  },
  {
    question: "Are your trucks licensed and insured?",
    answer: "Absolutely. Boston Legend Ice Cream Truck is fully licensed, permitted, and carries comprehensive liability insurance. We adhere to the strictest health and safety standards."
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cream">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-coral/10 text-coral font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-6 border border-coral/20">
            🍦 About Boston Legend
          </span>
          <h1 className="font-display italic font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-charcoal mb-6">
            More Than <span className="text-coral">Ice Cream</span> <br />
            We Bring the Experience to You
          </h1>
          <p className="font-sans font-medium text-lg md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Boston Legend Ice Cream Truck is a mobile catering service bringing premium flavors, friendly service, and memorable experiences directly to celebrations throughout Greater Boston.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto">
            
            {/* Image Section - Floating Integrated Design */}
            <div className="w-full relative flex justify-center items-center px-4 sm:px-10">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] transition-transform duration-700 hover:scale-105">
                <Image 
                  src="/images/about.png" 
                  alt="Boston Legend Ice Cream Truck" 
                  fill 
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 right-0 sm:right-4 md:-right-8 bg-coral text-white p-6 sm:p-8 rounded-full w-28 h-28 sm:w-36 sm:h-36 flex flex-col items-center justify-center shadow-xl rotate-[12deg] border-4 border-white z-20 hover:rotate-0 transition-transform duration-500">
                <span className="font-display font-black text-3xl sm:text-4xl leading-none">10+</span>
                <span className="font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest text-center mt-1">Years of Joy</span>
              </div>
            </div>

            {/* Text Section - Premium Typography & Layout */}
            <div className="w-full">
              
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
                <div className="space-y-6 font-sans text-navy/80 text-[1.1rem] leading-relaxed font-medium">
                  <p>
                    From intimate birthday parties and neighborhood block parties to corporate gatherings, fundraisers, product launches, weddings, school celebrations, sporting events, photo sessions, and marketing activations, Boston Legend brings the excitement of an iconic ice cream truck directly to your venue.
                  </p>
                  <p>
                    Our goal is simple: make every event a little sweeter, more enjoyable, and more memorable. Instead of asking your guests to leave the celebration for dessert, we bring the experience directly to them — with convenient mobile service, a variety of delicious ice cream options, and a friendly team focused on making your event run smoothly.
                  </p>
                </div>
              </div>

              <div className="pl-4 sm:pl-8 border-l-4 border-coral/30 mb-14">
                <h3 className="font-display font-black text-3xl md:text-4xl text-navy mb-5 tracking-tight">
                  Premium Flavors.<br className="hidden sm:block" /> <span className="text-coral">Memorable Moments.</span>
                </h3>
                <div className="space-y-5 font-sans text-navy/70 text-lg leading-relaxed font-medium">
                  <p>
                    Boston Legend offers a variety of well-known ice cream brands and frozen treats, including Good Humor, Richie's Italian Ice, Popsicle, Blue Bunny, Hood, and Klondike, giving guests a selection that can suit different tastes and occasions.
                  </p>
                  <p>
                    But what makes the experience special is more than what's being served. Our distinctive truck becomes part of the event itself — creating an inviting focal point, a fun guest experience, and a memorable backdrop for photos and shared moments.
                  </p>
                </div>
              </div>

              <div className="bg-navy rounded-[2.5rem] p-8 sm:p-12 mb-14 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-coral/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <h3 className="font-display font-black text-3xl md:text-4xl text-white mb-6 relative z-10">
                  Made for <span className="text-coral">Every Occasion</span>
                </h3>
                <p className="font-sans text-white/80 text-lg leading-relaxed font-medium mb-8 relative z-10">
                  Whether you're celebrating a milestone, rewarding your team, bringing a community together, supporting a fundraiser, promoting a new product, or simply looking for something different for your guests, Boston Legend offers mobile ice cream catering designed around the occasion.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-white/90 font-bold relative z-10">
                  {["Birthday Parties", "Corporate Events", "Block Parties", "Fundraisers", "Launch Parties", "Marketing Events", "Wedding Receptions", "School Occasions", "Sports Events", "Reunions", "Photo Sessions", "Movie Nights & Events"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center shrink-0">
                        <span className="text-coral text-xs">✓</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pl-4 sm:pl-8 border-l-4 border-mint/40 mb-14">
                <h3 className="font-display font-black text-3xl md:text-4xl text-navy mb-5 tracking-tight">
                  Serving <span className="text-mint-dark">Greater Boston</span>
                </h3>
                <p className="font-sans text-navy/70 text-lg leading-relaxed font-medium">
                  Boston Legend travels throughout Greater Boston, bringing mobile ice cream catering directly to homes, businesses, venues, schools, community events, and private celebrations. The company describes its service as convenient, on-the-go catering designed for events both large and small.
                </p>
              </div>

              <div className="bg-gradient-to-br from-coral/10 to-coral/5 p-8 sm:p-10 rounded-3xl border border-coral/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-60 group-hover:opacity-80 transition-opacity" />
                <h3 className="font-display font-black text-2xl text-navy mb-4 flex items-center gap-2">
                  <span className="text-coral">✦</span> Our Commitment
                </h3>
                <p className="font-sans text-navy/80 text-lg leading-relaxed font-medium mb-4">
                  At Boston Legend, we believe catering should be more than simply serving food. It's about creating an experience your guests can enjoy, remember, and talk about.
                </p>
                <p className="font-sans text-navy/80 text-lg leading-relaxed font-medium mb-6">
                  Great events create memories. We bring the sweetness that makes them even more memorable.
                </p>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white">
                  <p className="font-display font-black text-[1.15rem] text-coral text-center">
                    Premium Ice Cream. Mobile Service. Unforgettable Experiences. 🍦🚐
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
        {/* Cream Drip coming DOWN from the Story Section into the Promise Section */}
        <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
          <MeltingDrip color="#FFFBF5" height={200} variant="random" />
        </div>
        
        <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 pt-20 md:pt-32">
          <div className="text-center mb-20">
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
              The {BUSINESS_CONFIG.name} Promise
            </h2>
            <p className="font-sans font-medium text-xl text-white/70 max-w-2xl mx-auto">
              What sets us apart isn't just our ice cream—it's how we serve it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Punctuality", desc: "We arrive early, set up seamlessly, and are ready to serve exactly when you need us.", color: "text-coral" },
              { num: "02", title: "Premium Quality", desc: "We only serve the most popular, high-quality, pre-packaged ice cream brands everyone loves.", color: "text-gold" },
              { num: "03", title: "Immaculate Cleanliness", desc: "Our vehicles are detailed daily and pass all board of health inspections with flying colors.", color: "text-mint" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-colors">
                <div className={`font-display font-black text-5xl mb-6 opacity-80 ${item.color}`}>{item.num}</div>
                <h3 className="font-sans font-bold text-2xl text-white mb-4">{item.title}</h3>
                <p className="font-sans text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        BrandCarousel has a pink background.
        It sits below the Navy Promise Section, so its top drip should be Navy (#0B1021).
      */}
      <BrandCarousel topDripColor="#0B1021" />

      {/* Contextual FAQ */}
      <FAQSection 
        title="About Our Service"
        subtitle="Common questions about how we operate."
        items={faqs}
      />
    </div>
  );
}
