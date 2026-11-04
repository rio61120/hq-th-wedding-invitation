import React from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { BotanicalBlossom, MonogramHQ } from "./Decorations";

interface HeroSectionProps {
  onScrollToInvitation: () => void;
}

export function HeroSection({ onScrollToInvitation }: HeroSectionProps) {
  const content = {
    saveTheDate: "NGÀY CHUNG ĐÔI",
    groom: "Hồng Quân",
    bride: "Thương Huyền",
    date: "16 . 11 . 2026",
    cta: "Xem thiệp mời",
    subtext: "Một ngày đặc biệt, một khởi đầu trọn đời",
  };

  return (
    <section
      id="hero"
      className="relative bg-[#FAF7F2] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Top-Right Signature Botanical Blossom PNG Decor matching sketch 01 & 02 */}
      <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 md:-top-10 md:-right-10 w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 pointer-events-none z-10 select-none">
        <BotanicalBlossom className="w-full h-full transform rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Elegant Typography & Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            {/* Monogram Seal + NGÀY CHUNG ĐÔI */}
            <div className="inline-flex items-center gap-3 mb-6">
              {/* <MonogramHQ className="w-10 h-10 sm:w-11 sm:h-11" /> */}
              <span className="h-px w-6 bg-[#BCA89F]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8B6F5D] font-medium">
                {content.saveTheDate}
              </span>
              <span className="h-px w-6 bg-[#BCA89F]" />
            </div>

            {/* Couple Names in signature editorial font */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#3D3028] tracking-tight leading-[1.15] mb-4 text-balance">
              <span className="hero-name font-script text-5xl sm:text-6xl lg:text-7xl font-normal tracking-normal leading-[1.05] block text-[#6E5343]">
                {content.groom}
              </span>
              <span className="hero-name font-script text-3xl sm:text-4xl text-[#8B6F5D] my-1 block font-normal">
                &amp;
              </span>
              <span className="hero-name font-script text-5xl sm:text-6xl lg:text-7xl font-normal tracking-normal leading-[1.05] block text-[#6E5343]">
                {content.bride}
              </span>
            </h1>

            {/* Date in spaced tabular font */}
            <p className="font-serif text-lg sm:text-xl tracking-[0.25em] text-[#6E5343] mt-2 mb-3 font-light">
              {content.date}
            </p>

            <p className="text-xs sm:text-sm text-[#8B6F5D] font-light max-w-sm mb-8">
              {content.subtext}
            </p>

            {/* Action button */}
            <div>
              <button
                onClick={onScrollToInvitation}
                className="group px-8 py-3 rounded-full border border-[#8B6F5D] bg-[#FAF7F2] hover:bg-[#8B6F5D] text-[#5A4537] hover:text-white text-xs tracking-widest uppercase font-medium transition-all duration-300 shadow-2xs hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{content.cta}</span>
                <ArrowDown className="scroll-cue w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Signature Arched Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              {/* Outer decorative arch hairline */}
              <div className="absolute -inset-3.5 rounded-t-[205px] rounded-b-3xl border border-[#BCA89F]/40 pointer-events-none" />

              {/* Arch Photo Container */}
              <div className="relative aspect-[3/4] w-full rounded-t-[190px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/optimized/wedding-18.webp"
                  alt="Hồng Quân & Thương Huyền"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  fetchPriority="high"
                  decoding="async"
                />

                {/* Subtle warm overlay scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B221B]/40 via-transparent to-transparent pointer-events-none" />

                {/* Arch floating tag */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md py-2.5 px-4 rounded-xl border border-white/60 text-center shadow-xs"
                >
                  <p className="font-serif text-xs text-[#5A4537] tracking-widest uppercase">
                    Hạnh phúc bắt đầu từ đây · 16.11.2026
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
