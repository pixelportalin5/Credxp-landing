"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MoveUpRight,
  FileText,
  Handshake,
  IndianRupee,
  Lock,
  ShieldCheck,
  Shield,
  Star,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountUpStat } from "./CountUpStat";
import { CredxpLogo } from "./CredxpLogo";
import { ForminatorCTA } from "./ForminatorCTA";
import { ForminatorModal } from "./ForminatorModal";
import { Navbar } from "./Navbar";
import {
  HERO_BACKGROUND,
  PORTFOLIO_GALLERY_IMAGES,
  SITE_IMAGES,
  WHY_CHOOSE_CARD_IMAGES,
} from "./siteImages";
import { SmoothScroll } from "./SmoothScroll";

/** Set true to show Directory, Investment Intelligence, Coworking, Partners, Client Signals, and Contact CTA blocks */
const SHOW_DEFERRED_SECTIONS = false;

const stats = [
  { value: 420, suffix: "+", label: "Offices", detail: "Premium listed workspaces across India's fastest growing business corridors." },
  { value: 18, suffix: "", label: "Cities Covered", detail: "Strategic access across financial districts, innovation hubs, and new CBDs." },
  { value: 960, suffix: "+", label: "Premium Clients", detail: "Trusted by founders, operators, funds, and enterprise workplace leaders." },
  { value: 12, suffix: "M", label: "Sq.ft Workspace Area", detail: "A deep network of high-performance commercial inventory." },
];

const investorTrustTestimonials = [
  { quote: "Highly professional team and transparent process.", name: "Ankit S." },
  { quote: "Best commercial investment decision we made.", name: "Priya M." },
  { quote: "Assured returns with complete peace of mind.", name: "Rakesh B." },
] as const;

const investorTrustStats = [
  ["₹24Cr+", "Assets Under Management"],
  ["300+", "Investors Onboarded"],
  ["100%", "Pre-Leased Security"],
] as const;

const directoryProperties = [
  {
    title: "Cyber Crest",
    location: "Golf Course Road, Gurgaon",
    price: "₹62 Cr",
    meta: "Grade A · 92K sq.ft",
    image: SITE_IMAGES.one,
  },
  {
    title: "Solara Road",
    location: "Bengaluru CBD",
    price: "₹28 Cr",
    meta: "Retail + Office · 38K sq.ft",
    image: SITE_IMAGES.two,
  },
  {
    title: "Apex Meridian",
    location: "Lower Parel, Mumbai",
    price: "₹85 Cr",
    meta: "Pre-leased · 120K sq.ft",
    image: SITE_IMAGES.three,
  },
];

const roiHighlights = [
  ["7.8%", "Projected Yield", "Across select pre-leased commercial assets."],
  ["12.4%", "Appreciation", "Estimated 5-year location-led upside."],
  ["96%", "Occupancy", "Portfolio-grade tenant retention signal."],
];

const coworkingSpaces = [
  ["Awfis", "₹9,990 / month", "Managed suites · meeting rooms"],
  ["WeWork", "₹14,999 / month", "Enterprise floors · lounges"],
  ["Smartworks", "₹8,499 / month", "Private cabins · parking"],
  ["BHIVE", "₹7,999 / month", "Startup hubs · flex desks"],
];

const partners = ["WeWork", "Awfis", "Smartworks", "BHIVE", "Regus", "IndiQube", "Table Space", "91Springboard"];

const howItWorksSteps = [
  {
    step: 1,
    title: "Choose Your Asset",
    copy: "Select your preferred pre-leased asset with complete transparency.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Invest Securely",
    copy: "Complete the investment process with ease and security.",
    icon: Handshake,
  },
  {
    step: 3,
    title: "Start Earning",
    copy: "Receive regular rental income with zero operational hassle.",
    icon: TrendingUp,
  },
] as const;

const whyChooseCredxpItems = [
  {
    title: "15+ Years in the Business",
    copy: "Over a decade of experience in real estate investment and wealth creation.",
    image: WHY_CHOOSE_CARD_IMAGES[0],
  },
  {
    title: "Multiple Self Owned Properties in NCR",
    copy: "Strong asset ownership across prime locations ensures better control and reliable returns.",
    image: WHY_CHOOSE_CARD_IMAGES[1],
  },
  {
    title: "Ethical Business",
    copy: "We believe in doing the right thing, the right way, always prioritizing your interests.",
    image: WHY_CHOOSE_CARD_IMAGES[2],
  },
  {
    title: "Transparent Deals",
    copy: "Clear terms, honest communication, and zero hidden surprises – that's our promise.",
    image: WHY_CHOOSE_CARD_IMAGES[3],
  },
  {
    title: "Confirmed Tenants",
    copy: "All our assets come with verified, high-quality tenants for consistent that's our promise.",
    image: WHY_CHOOSE_CARD_IMAGES[4],
  },
  {
    title: "Service Orient Company",
    copy: "All our assets come with verified, high-quality tenants for consistent rental income.",
    image: WHY_CHOOSE_CARD_IMAGES[5],
  },
  {
    title: "End to End Solution",
    copy: "From selection to management, we provide complete support at every step.",
    image: WHY_CHOOSE_CARD_IMAGES[6],
  },
  {
    title: "End to End Solution",
    copy: "From selection to management, we provide complete support at every step.",
    image: WHY_CHOOSE_CARD_IMAGES[7],
  },
  {
    title: "Dealing with Multiple Indian Blue Chip Companies",
    copy: "Trusted by leading corporates, ensuring long-term stability and assured returns.",
    image: WHY_CHOOSE_CARD_IMAGES[8],
  },
] as const;

const investmentHighlightBar = [
  { line1: "Rental Income", line2: "Opportunity", icon: TrendingUp },
  { line1: "Strategic", line2: "Investment", icon: ShieldCheck },
  { line1: "Long-Term", line2: "Wealth Creation", icon: Building2 },
  { line1: "Corporate Tenant", line2: "Security", icon: Lock },
] as const;

const footerColumns = [
  ["Explore", "Invest in Pre-leased", "Lease Corporate Space", "Coworking Spaces", "All Properties"],
  ["Resources", "Market Insights", "Area Guides", "Investment Reports", "FAQs"],
  ["Company", "About Us", "Partners", "Careers", "Contact"],
  ["Legal", "Privacy Policy", "Terms & Conditions", "RERA Disclosure", "Compliance"],
];

const testimonials = [
  {
    quote:
      "Credxp gave our leadership team a workspace search that felt as refined as the office we eventually moved into.",
    name: "Aarav Mehta",
    role: "Founder, Northstar Capital",
    image: SITE_IMAGES.one,
  },
  {
    quote:
      "The curation was exceptional. Every option matched our brand, security needs, and expansion plan from day one.",
    name: "Ira Kapoor",
    role: "COO, Synapse Labs",
    image: SITE_IMAGES.two,
  },
  {
    quote:
      "It is rare to see commercial real estate feel this premium, calm, and decisively modern.",
    name: "Kabir Sethi",
    role: "Workplace Director, VantaWorks",
    image: SITE_IMAGES.three,
  },
];

const faqItems = [
  {
    question: "What makes Space Corporate Park a good investment?",
    answer:
      "It is a premium pre-leased commercial asset in SPR Gurgaon with AAA corporate tenants, long-term lease security, and immediate rental income from day one.",
  },
  {
    question: "How much rental income can I expect?",
    answer:
      "Rental income depends on your investment size and the asset selected. Our team shares projected monthly returns, escalation terms, and yield benchmarks before you commit.",
  },
  {
    question: "Is the asset fully leased?",
    answer:
      "Yes. The asset is 100% pre-leased to established corporate tenants, so you start earning rental income without vacancy or tenant-hunting delays.",
  },
  {
    question: "What is the lock-in period?",
    answer:
      "Lease agreements typically run 9 years or longer with built-in rent escalation, giving investors long-term income visibility and stability.",
  },
  {
    question: "Who are the tenants?",
    answer:
      "The property is leased to reputed national and multinational brands, ensuring timely rent payments and professional lease compliance.",
  },
  {
    question: "How do I get started?",
    answer:
      "Share your investment budget and goals with our team. We will walk you through asset options, due diligence, and the secure onboarding process end to end.",
  },
];

const heroInvestmentBullets = [
  "Premium Pre-Leased Asset",
  "High Rental Yield Opportunity",
  "9-Year Secure Lease Tenure",
  "AAA Corporate Tenants",
];

const heroYieldStats = [
  ["12 – 15%", "Annual Rental Yield"],
  ["9 Years", "Secure Lease Tenure"],
  ["AAA", "Corporate Tenants"],
  ["100%", "Pre-Leased Asset"],
  ["SPR", "Prime Location"],
];

const dreamOutcomeCards = [
  {
    title: "Consistent Rental Income You Can Count On",
    copy: "Earn stable, high rental income every month from a pre-leased, premium commercial asset.",
    image: PORTFOLIO_GALLERY_IMAGES[1],
    icon: IndianRupee,
  },
  {
    title: "Long-Term Growth & Wealth Creation",
    copy: "Situated in a prime location with strong appreciation potential for long-term wealth build-up.",
    image: PORTFOLIO_GALLERY_IMAGES[2],
    icon: BarChart3,
  },
  {
    title: "Hassle-Free Investment with Zero Operations",
    copy: "Fully managed investment with tenant security and zero day-to-day responsibility.",
    image: SITE_IMAGES.two,
    icon: ShieldCheck,
  },
] as const;

const heroBottomHighlights = [
  {
    title: "Investment starts at ₹50 Lakhs*",
    subtitle: "One-time Investment",
    icon: Building2,
  },
  {
    title: "Earn rental income upto ₹4,50,000 per month*",
    subtitle: "From Day One",
    icon: TrendingUp,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

function CircularTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeIndex]);

  const move = (direction: "previous" | "next") => {
    setActiveIndex((current) => {
      if (direction === "previous") return (current - 1 + testimonials.length) % testimonials.length;
      return (current + 1) % testimonials.length;
    });
  };

  const getCardState = (index: number) => {
    const total = testimonials.length;
    const previous = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;

    if (index === activeIndex) {
      return { x: "0%", y: 0, rotate: 0, rotateY: 0, scale: 1, zIndex: 3, opacity: 1, filter: "blur(0px)" };
    }
    if (index === previous) {
      return { x: "-24%", y: 22, rotate: -7, rotateY: 5, scale: 0.88, zIndex: 2, opacity: 0.68, filter: "blur(0.2px)" };
    }
    if (index === next) {
      return { x: "24%", y: 22, rotate: 7, rotateY: -5, scale: 0.88, zIndex: 2, opacity: 0.68, filter: "blur(0.2px)" };
    }
    return { x: "0%", y: 44, rotate: 0, rotateY: 0, scale: 0.7, zIndex: 1, opacity: 0, filter: "blur(2px)" };
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`red-border-box surface-card-light rounded-2xl p-6 transition duration-300 ${
              index === activeIndex ? "border-red-600 bg-white shadow-md" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveIndex(index)}
          >
            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-red-600 text-red-600" />
              ))}
            </div>
            <p className="text-sm italic leading-7 text-[#555555]">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-[#111111]">{testimonial.name}</p>
            <p className="text-xs text-[#888888]">{testimonial.role}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="relative mx-auto h-[28rem] w-full max-w-[28rem] [perspective:1600px] lg:mx-0 lg:ml-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`carousel-${testimonial.name}`}
              animate={getCardState(index)}
              transition={{ type: "spring", stiffness: 82, damping: 24, mass: 0.9 }}
              className="absolute inset-x-0 mx-auto h-full w-[72%] origin-center overflow-hidden rounded-2xl border border-red-600/25 bg-neutral-900 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] hover:scale-105"
                style={{ backgroundImage: `url('${testimonial.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
              <div className="absolute left-4 top-4 rounded-xl border border-red-600/30 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-500 backdrop-blur-xl">
                Client Signal
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/60 p-4 text-white backdrop-blur-xl">
                <p className="text-sm font-medium">{testimonial.name}</p>
                <p className="mt-1 text-xs text-white/55">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-center lg:text-left"
          >
            <p className="section-label mb-4">Client Signal</p>
            <blockquote className="text-balance text-2xl font-bold uppercase leading-tight tracking-wide text-[#111111] sm:text-3xl">
              {active.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${active.name}-${word}-${index}`}
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.45, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-[0.24em] inline-block normal-case"
                >
                  {word}
                </motion.span>
              ))}
            </blockquote>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-3 lg:justify-start">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => move("previous")}
            className="grid size-11 place-items-center rounded-xl border border-red-600/30 bg-white text-[#111111] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => move("next")}
            className="grid size-11 place-items-center rounded-xl border border-red-600/30 bg-white text-[#111111] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-[#111111]">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-red-600 transition duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-[#eeeeee] px-5 py-4 text-sm leading-7 text-[#666666]">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

const PORTFOLIO_SLIDE_GAP = 16;
const PORTFOLIO_TRANSITION_MS = 750;

function PortfolioGalleryCarousel() {
  const images = PORTFOLIO_GALLERY_IMAGES;
  const imageCount = images.length;
  const loopSlides = [...images, ...images];
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [slideStep, setSlideStep] = useState(496);

  const activeDot = index % imageCount;

  const goTo = (nextIndex: number, withAnimation = true) => {
    setAnimate(withAnimation);
    setIndex(nextIndex);
  };

  const move = (direction: "prev" | "next") => {
    if (direction === "next") {
      goTo(index + 1);
      return;
    }
    if (index === 0) {
      goTo(imageCount - 1);
      return;
    }
    goTo(index - 1);
  };

  useEffect(() => {
    const measure = () => {
      const slide = trackRef.current?.querySelector<HTMLElement>("[data-portfolio-slide]");
      if (slide) setSlideStep(slide.offsetWidth + PORTFOLIO_SLIDE_GAP);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (index !== imageCount) return;

    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, PORTFOLIO_TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [index, imageCount]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <button
        type="button"
        aria-label="Previous gallery image"
        onClick={() => move("prev")}
        className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-red-600/30 bg-white text-[#111111] shadow-lg transition hover:border-red-600 hover:bg-red-600 hover:text-white sm:left-5 sm:size-12"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Next gallery image"
        onClick={() => move("next")}
        className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-red-600/30 bg-white text-[#111111] shadow-lg transition hover:border-red-600 hover:bg-red-600 hover:text-white sm:right-5 sm:size-12"
      >
        <ChevronRight size={22} />
      </button>

      <div className="overflow-hidden">
        <motion.div
          ref={trackRef}
          animate={{ x: -index * slideStep }}
          transition={
            animate
              ? { duration: PORTFOLIO_TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0 }
          }
          className="flex py-1"
          style={{ gap: PORTFOLIO_SLIDE_GAP }}
        >
          {loopSlides.map((image, slideIndex) => (
            <div
              key={`portfolio-${slideIndex % imageCount}-${slideIndex}`}
              data-portfolio-slide={slideIndex === 0 ? true : undefined}
              className="w-[88vw] shrink-0 sm:w-[64vw] md:w-[50vw] lg:w-[440px] xl:w-[480px]"
            >
              <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-red-600/15 shadow-md">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url('${image}')` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {images.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            aria-label={`Go to gallery slide ${dotIndex + 1}`}
            onClick={() => goTo(dotIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIndex === activeDot ? "w-8 bg-red-600" : "w-3 bg-[#cccccc]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DreamOutcomeCard({
  title,
  copy,
  image,
  icon: Icon,
  index,
}: {
  title: string;
  copy: string;
  image: string;
  icon: typeof IndianRupee;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-light group flex h-full flex-col overflow-hidden rounded-2xl border border-red-600/15"
    >
      <div className="relative h-44 overflow-hidden sm:h-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute left-4 top-4 grid size-12 place-items-center rounded-full border border-red-600/30 bg-red-600 text-white shadow-lg">
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-base font-bold leading-snug text-[#111111] sm:text-lg">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#666666]">{copy}</p>
        <div className="mt-5 flex justify-end">
          <span className="grid size-9 place-items-center rounded-full border border-red-600/20 bg-[#fafafa] text-red-600 transition duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function HomePage() {
  const [investmentFormOpen, setInvestmentFormOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--light-section)] text-[#111111]">
      <SmoothScroll />
      <Navbar onOpenForm={() => setInvestmentFormOpen(true)} />
      <ForminatorModal open={investmentFormOpen} onClose={() => setInvestmentFormOpen(false)} formId={14} />

      {/* HERO — investment layout, landing page hero image */}
      <section
        id="home"
        className="section-hero relative z-10 min-h-screen overflow-hidden bg-[#030303]"
        style={{ fontFamily: "'Inter', 'Satoshi', 'General Sans', sans-serif" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_BACKGROUND}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.92)_0%,rgba(3,3,3,0.78)_42%,rgba(3,3,3,0.35)_68%,rgba(3,3,3,0.15)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.35)_0%,transparent_50%,rgba(3,3,3,0.55)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-6 pt-28 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center py-6">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
              className="max-w-xl"
            >
              <motion.h1
                variants={reveal}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="heading-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl xl:text-[3.25rem]"
              >
                Invest in <span className="text-red-600">Yield</span>. Invest in{" "}
                <span className="text-red-600">Growth</span>.
              </motion.h1>
              <motion.ul
                variants={reveal}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 space-y-2.5"
              >
                {heroInvestmentBullets.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/90 sm:text-base">
                    <CheckCircle2 size={18} className="shrink-0 text-red-600" />
                    {item}
                  </li>
                ))}
              </motion.ul>
              <motion.div
                variants={reveal}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 flex items-start gap-2 text-sm text-white/85 sm:text-base"
              >
                <MapPin size={18} className="mt-0.5 shrink-0 text-red-600" />
                <span>
                  <span className="font-semibold text-white">Premium Corporate Park</span>
                  <br />
                  Sector 66/69, SPR Gurgaon
                </span>
              </motion.div>
              <motion.div variants={reveal} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <ForminatorCTA onOpenForm={() => setInvestmentFormOpen(true)} className="btn-primary mt-8">
                  Get Investment Details
                  <ArrowRight size={18} />
                </ForminatorCTA>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rounded-2xl border border-red-600/40 bg-[#070b14]/75 p-4 backdrop-blur-md sm:p-5"
          >
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-red-600 sm:text-sm">
              High-Yield Investment Highlights
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {heroBottomHighlights.map(({ title, subtitle, icon: Icon }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-xl border border-red-600/25 bg-[#0a1020]/60 p-3 sm:p-4"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-full border border-red-600/40 bg-red-600/10 text-red-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase leading-snug text-white sm:text-sm">{title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/55">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-red-600/25 pt-4 sm:grid-cols-5">
              {heroYieldStats.map(([value, label]) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-bold text-red-600 sm:text-base">{value}</p>
                  <p className="mt-1 text-[9px] uppercase leading-snug tracking-wide text-white/55">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF #2 + DREAM OUTCOME */}
      <section
        id="about"
        className="relative z-20 section-light px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl lg:text-[2.75rem]">
                Your Search for Safe, High-Yield Investments Ends Here.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#555555]">
                Most investors struggle to find real estate assets that offer high rental income, long-term security,
                and zero operational hassle.{" "}
                <span className="font-semibold text-red-600">Spaze Corporate Park</span> offers all that and more.
              </p>
              <ForminatorCTA onOpenForm={() => setInvestmentFormOpen(true)} className="btn-primary mt-8">
                Explore Opportunity
                <ArrowRight size={16} />
              </ForminatorCTA>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-red-600/20 shadow-xl lg:aspect-auto lg:min-h-[22rem]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-105"
                style={{ backgroundImage: `url('${SITE_IMAGES.three}')` }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 lg:mt-20"
          >
            <p className="section-label text-center">Dream Outcome Summary</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {dreamOutcomeCards.map((card, index) => (
                <DreamOutcomeCard key={card.title} {...card} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY INVESTORS */}
      <section className="relative z-20 section-dark px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="section-label mb-10 text-center sm:mb-12"
          >
            Trusted by 250+ Investors
          </motion.p>

          <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:gap-10 xl:grid-cols-[1.75fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {investorTrustTestimonials.map((item, index) => (
                <motion.blockquote
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col rounded-2xl border border-red-600/25 bg-[#0a0a0a] p-5 sm:p-6"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        className="fill-red-600 text-red-600"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-white/90 sm:text-[0.9375rem]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-5 text-sm font-medium text-white/70">— {item.name}</footer>
                </motion.blockquote>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 items-center gap-4 rounded-2xl border border-red-600/25 bg-[#0a0a0a] px-4 py-8 sm:px-6 lg:px-8"
            >
              {investorTrustStats.map(([value, label], index) => (
                <div
                  key={label}
                  className={`text-center ${index > 0 ? "border-l border-white/15 pl-4 sm:pl-6" : ""}`}
                >
                  <p className="text-xl font-bold text-red-600 sm:text-2xl lg:text-3xl">{value}</p>
                  <p className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-wide text-white/55 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CREDXP */}
      <section className="relative z-20 section-dark px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 max-w-4xl text-center sm:mb-14"
          >
            <h2 className="heading-display text-2xl text-white sm:text-3xl lg:text-4xl">
              Why Choose <span className="text-white">Cred</span>
              <span className="text-red-600">Xp</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {whyChooseCredxpItems.map((item, index) => (
              <motion.article
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-red-600/25 bg-[#0a0a0a] text-center"
              >
                <div className="relative h-32 w-full overflow-hidden sm:h-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    onError={(event) => {
                      const img = event.currentTarget;
                      if (img.dataset.fallbackApplied) return;
                      img.dataset.fallbackApplied = "true";
                      img.src = PORTFOLIO_GALLERY_IMAGES[0];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-transparent" />
                  {index === 0 ? (
                    <span className="absolute left-3 top-3 rounded-full border border-red-600/40 bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white">
                      15+
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col px-4 py-5 sm:px-5 sm:py-6">
                  <h3 className="heading-display text-[0.65rem] leading-snug text-white sm:text-xs lg:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.6875rem] leading-6 text-white/60 sm:text-xs sm:leading-6">
                    {item.copy}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PORTFOLIO */}
      <section
        id="properties"
        className="relative z-20 section-light overflow-hidden py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="section-label mb-4">Featured Portfolio</p>
            <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl lg:text-5xl">
              Spaces engineered for presence.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#555555]">
              A cinematic selection of flagship offices, private headquarters, and architectural floors curated with the precision of a luxury performance brand.
            </p>
          </motion.div>
        </div>

        <div className="mt-12">
          <PortfolioGalleryCarousel />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-20 section-dark px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="section-label mb-10 sm:mb-12"
          >
            How It Works
          </motion.p>

          <div className="grid gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-6 lg:gap-8">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="contents">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center md:items-start md:text-left"
                  >
                    <div className="mb-5 grid size-16 place-items-center rounded-full border-2 border-red-600 text-red-600 sm:size-[4.5rem]">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Step {step.step}</p>
                    <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-7 text-white/65">{step.copy}</p>
                  </motion.div>
                  {index < howItWorksSteps.length - 1 ? (
                    <div
                      aria-hidden
                      className="hidden items-center justify-center md:flex md:pt-8"
                    >
                      <div className="h-px w-full min-w-[2rem] border-t-2 border-dashed border-red-600/50 lg:min-w-[3rem]" />
                      <ArrowRight size={18} className="mx-1 shrink-0 text-red-600" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-20 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="section-label mb-8 sm:mb-10"
          >
            Frequently Asked Questions
          </motion.h2>
          <FAQAccordion />
        </div>
      </section>

      {/* TAKE ACTION TODAY */}
      <section className="relative z-20 border-y border-red-600/15 bg-white px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-7xl flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-10"
        >
          <div className="flex items-start gap-4 lg:max-w-sm lg:shrink-0">
            <div className="grid size-12 shrink-0 place-items-center rounded-full border border-red-600/30 bg-red-600/10 text-red-600">
              <Clock size={24} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="heading-display text-base text-[#111111] sm:text-lg">
                Why Should You Take Action Today?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#555555]">
                Limited inventory. High demand. Secure your high-yield asset before it&apos;s gone!
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-red-600/25 bg-[#fafafa] px-5 py-5 sm:flex-row sm:gap-8 sm:px-8 lg:py-6">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="grid size-11 shrink-0 place-items-center rounded-full border border-red-600/30 bg-red-600/10 text-red-600">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#111111]">Investment Starts At</p>
                <p className="mt-1 text-xl font-bold text-[#111111] sm:text-2xl">
                  <span className="text-red-600">₹50</span> Lakhs*
                </p>
                <p className="mt-1 text-xs text-[#666666]">One-time Investment</p>
              </div>
            </div>
            <div className="hidden h-14 w-px bg-red-600/20 sm:block" aria-hidden />
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="grid size-11 shrink-0 place-items-center rounded-full border border-red-600/30 bg-red-600/10 text-red-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#111111]">Earn Rental Income Upto</p>
                <p className="mt-1 text-xl font-bold text-[#111111] sm:text-2xl">₹4,50,000</p>
                <p className="text-sm font-bold text-[#111111]">Per Month*</p>
                <p className="mt-1 text-xs text-[#666666]">From Day One</p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3 lg:items-end">
            <ForminatorCTA
              onOpenForm={() => setInvestmentFormOpen(true)}
              className="btn-primary w-full min-w-[14rem] justify-center sm:w-auto"
            >
              Get Investment Details
              <ArrowRight size={16} />
            </ForminatorCTA>
            <p className="max-w-[14rem] text-center text-xs leading-5 text-[#666666] lg:text-right">
              Don&apos;t miss out on this prime investment opportunity!
            </p>
          </div>
        </motion.div>
      </section>

      {/* INVESTMENT HIGHLIGHTS BAR */}
      <section className="relative z-20 section-dark px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {investmentHighlightBar.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`${item.line1}-${item.line2}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-red-600 text-red-600 sm:size-14">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
                      {item.line1}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
                      {item.line2}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {SHOW_DEFERRED_SECTIONS ? (
        <>
      {/* DIRECTORY PREVIEW */}
      <section className="relative z-20 section-light px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-label mb-4">Directory Preview</p>
              <h2 className="heading-display max-w-3xl text-3xl text-[#111111] sm:text-4xl">
                Available commercial addresses, edited down.
              </h2>
            </div>
            <a href="#contact" className="btn-primary !text-xs">
              Request full directory
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {directoryProperties.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-2xl border border-[#dddddd] bg-white transition duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${item.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-4 left-4 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">{item.price}</p>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[#777777]">{item.location}</p>
                  <h3 className="mt-2 text-xl font-bold uppercase tracking-wide text-[#111111]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#666666]">{item.meta}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT INTELLIGENCE */}
      <section className="relative z-20 section-light px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="red-border-box surface-card-light grid gap-10 rounded-2xl p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
            <div>
              <p className="section-label mb-4">Investment Intelligence</p>
              <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl">
                ROI clarity before the first site visit.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#666666]">
                Yield, appreciation, and occupancy signals are presented as directional indicators to help investors compare premium opportunities.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {roiHighlights.map(([value, label, detail], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="red-border-box rounded-2xl bg-[#fafafa] p-5"
                >
                  <p className="text-4xl font-bold text-red-600">{value}</p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#555555]">{label}</p>
                  <p className="mt-3 text-sm leading-6 text-[#666666]">{detail}</p>
                  <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#eeeeee]">
                    <div className="h-full rounded-full bg-red-600" style={{ width: `${72 + index * 8}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COWORKING */}
      <section className="relative z-20 section-light px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="section-label mb-4">Coworking & Flex</p>
            <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl">
              Flexible workspaces from premium operators.
            </h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coworkingSpaces.map(([brand, price, detail], index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group red-border-box surface-card-light rounded-2xl p-6 text-center transition duration-500 hover:-translate-y-1 hover:border-red-600/60"
              >
                <div className="icon-circle mx-auto mb-5 size-14 text-lg font-bold">{brand.charAt(0)}</div>
                <h3 className="heading-display text-base text-[#111111]">{brand}</h3>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-red-600">{price}</p>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS */}
      <section className="relative z-20 section-light px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden red-border-box surface-card-light rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="relative overflow-hidden rounded-2xl border border-red-600/15 bg-[radial-gradient(circle_at_16%_20%,rgba(239,35,28,0.08),transparent_28%),#ffffff] px-5 py-12 sm:px-8 lg:px-12">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="section-label mb-4">Trusted Partners</p>
              <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl">
                A private network of workspace operators and commercial partners.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#666666]">
                Credxp connects premium inventory, flexible operators, and commercial intelligence into one refined workspace ecosystem.
              </p>
            </div>

            <div className="relative z-10 mt-12 space-y-4">
              <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
                <div className="partner-marquee flex w-max gap-4">
                  {[...partners, ...partners].map((partner, index) => (
                    <div
                      key={`${partner}-top-${index}`}
                      className="min-w-40 rounded-2xl border border-red-600/15 bg-white px-6 py-4 text-center text-sm font-medium text-[#444444] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-600/40 hover:text-[#111111]"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
                <div className="partner-marquee-reverse flex w-max gap-4">
                  {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, index) => (
                    <div
                      key={`${partner}-bottom-${index}`}
                      className="min-w-40 rounded-2xl border border-red-600/10 bg-[#fafafa] px-6 py-4 text-center text-sm font-medium text-[#666666] transition duration-300 hover:-translate-y-1 hover:border-red-600/40 hover:text-[#111111]"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 grid gap-4 border-t border-red-600/15 pt-8 sm:grid-cols-3">
              {[
                ["50M+", "sq.ft partner portfolio"],
                ["200+", "active commercial assets"],
                ["15+", "premium flex operators"],
              ].map(([value, label]) => (
                <div key={label} className="red-border-box rounded-2xl bg-[#fafafa] p-5 text-center">
                  <p className="text-3xl font-bold text-red-600">{value}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#888888]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS + TESTIMONIALS - Trusted section */}
      <section className="relative z-20 section-light px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-14 max-w-4xl text-center"
          >
            <p className="section-label mb-4">Client Signals</p>
            <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl lg:text-5xl">
              Chosen by teams that obsess over every detail.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#666666]">
              A calm, premium layer for companies that expect their real-estate search to match the quality of their brand.
            </p>
          </motion.div>

          <CircularTestimonials />

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <p className="section-label mb-4">Credxp By Numbers</p>
              <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl">
                Scale, curated with precision.
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-[#666666]">
                A tighter view of the network behind every shortlist, designed to feel measured, calm, and premium.
              </p>
            </motion.div>
            <div className="border-t border-red-600/20">
              {stats.map((stat, index) => (
                <CountUpStat key={stat.label} {...stat} index={index} variant="light" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section
        id="contact"
        className="relative z-20 section-light px-5 py-16 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card-light mx-auto max-w-7xl overflow-hidden rounded-2xl border border-red-600/20 p-6 sm:p-8"
        >
          <div className="grid items-center gap-8 lg:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="icon-circle size-12 shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="section-label mb-2">Private Access</p>
                <h2 className="heading-display text-xl text-[#111111] sm:text-2xl">
                  Build your company&apos;s next landmark address.
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {roiHighlights.slice(0, 2).map(([value, label]) => (
                <div key={label} className="red-border-box rounded-2xl bg-[#fafafa] p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-[#777777]">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <a href="mailto:hello@credxp.com" className="btn-primary">
                Get Started
                <ArrowRight size={16} />
              </a>
              <p className="text-xs text-[#666666] lg:text-right">
                Tell us how your team works. Credxp will curate a precise shortlist of premium commercial spaces.
              </p>
            </div>
          </div>

          {/* Full contact section content */}
          <div className="mt-10 grid gap-6 border-t border-red-600/15 pt-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-red-600/15 bg-[#fafafa] p-8">
              <p className="mb-6 inline-flex rounded-xl border border-red-600/30 bg-red-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                Private Access
              </p>
              <h2 className="heading-display text-3xl text-[#111111] sm:text-4xl">
                Build your company&apos;s next landmark address.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#666666]">
                Tell us how your team works. Credxp will curate a precise shortlist of premium commercial spaces designed around your brand, growth path, and executive priorities.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary" href="mailto:hello@credxp.com">
                  Get Started
                  <ArrowRight size={17} />
                </a>
                <a className="btn-outline !text-xs" href="#properties">
                  View Collection
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-red-600/15 bg-white p-6 sm:p-8">
              <div className="absolute -right-24 -top-24 size-64 rounded-full bg-red-600/10 blur-3xl" />
              <div className="relative flex h-full min-h-[20rem] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="rounded-xl border border-[#eeeeee] bg-[#fafafa] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#777777]">
                    Specialist Desk
                  </p>
                  <span className="grid size-11 place-items-center rounded-xl bg-red-600 text-white">
                    <MoveUpRight size={17} />
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    ["Name", "Your full name"],
                    ["Requirement", "Investment / lease / coworking"],
                    ["Budget", "Preferred range"],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 rounded-2xl border border-red-600/10 bg-[#fafafa] p-4 transition duration-300 hover:bg-white"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-red-600/15 text-xs font-semibold text-red-600">
                        0{index + 1}
                      </span>
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-[#888888]">{label}</span>
                        <span className="mt-1 block text-sm text-[#444444]">{value}</span>
                      </span>
                    </div>
                  ))}
                  <a
                    href="mailto:hello@credxp.com"
                    className="mt-2 flex items-center justify-between rounded-2xl bg-red-600 px-5 py-4 text-sm font-semibold uppercase tracking-wider text-white transition duration-300 hover:bg-white hover:text-black"
                  >
                    Book Consultation
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
        </>
      ) : null}

      {/* FOOTER */}
      <footer
        id="contact"
        className="relative z-20 section-dark border-t border-red-600/25 px-5 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1.4fr]">
            <div>
              <CredxpLogo className="h-10 w-auto max-w-[10.5rem] object-contain" />
              <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                Futuristic commercial real estate for premium offices, signature floors, and immersive workspaces.
              </p>
              <div className="mt-8 rounded-2xl border border-red-600/25 bg-[#0a0a0a] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Newsletter</p>
                <div className="mt-3 flex gap-2">
                  <span className="flex-1 rounded-xl border border-red-600/20 bg-[#111111] px-4 py-3 text-sm text-white/35">
                    insights@company.com
                  </span>
                  <button type="button" aria-label="Subscribe to newsletter" className="grid size-12 place-items-center rounded-xl bg-red-600 text-white transition hover:bg-white hover:text-[#111111]">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map(([title, ...items]) => (
                <div key={title}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{title}</h3>
                  <div className="mt-5 grid gap-3">
                    {items.map((item) => (
                      <a key={item} href="#home" className="text-sm text-white/55 transition hover:text-red-600">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 flex flex-col gap-3 border-t border-red-600/25 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Credxp. Premium commercial workspace platform.</p>
            <p className="flex items-center gap-2">
              <Shield size={14} className="text-red-600" />
              hello@credxp.com · LinkedIn · Instagram
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
