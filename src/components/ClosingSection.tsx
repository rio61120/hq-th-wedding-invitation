import React from "react";
import { motion } from "motion/react";
import {
  FloralBranchDivider,
  BotanicalBlossom,
  MonogramHQ,
} from "./Decorations";

export function ClosingSection() {
  const content = {
    sub: "LỜI CẢM ƠN",
    thankYou: "Cảm Ơn!",
    body: "Cảm ơn bạn vì đã trở thành một phần trong câu chuyện của chúng tôi.",
    signature: "Hồng Quân & Thương Huyền",
  };

  return (
    <section
      id="closing"
      className="py-24 bg-[#FAF7F2] relative overflow-hidden"
    >
      {/* Top-Right Botanical Blossom PNG Decor matching sketch 11 */}
      <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 pointer-events-none select-none z-0">
        <BotanicalBlossom className="w-full h-full transform rotate-12 drop-shadow-xs" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Arched Couple Photo with crisp white frame */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-44 sm:w-56 aspect-[3/4] mx-auto rounded-t-[110px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white mb-8"
        >
          <img
            src="/images/optimized/wedding-23.webp"
            alt="Hồng Quân & Thương Huyền"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div> */}

        {/* Script Cảm Ơn! */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-script text-6xl sm:text-7xl text-[#3D3028] leading-tight my-2 font-normal"
        >
          {content.thankYou}
        </motion.h2>

        {/* Closing Thank You Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-[#6E5343] font-light max-w-md mx-auto leading-relaxed mt-3 mb-6"
        >
          {content.body}
        </motion.p>
        {/* Crisp Transparent PNG Floral Branch Divider */}
        <div className="my-6 max-w-xs sm:max-w-sm mx-auto">
          <FloralBranchDivider className="w-full h-auto drop-shadow-2xs" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <MonogramHQ className="w-12 h-12 drop-shadow-xs" />
          <p className="font-serif text-lg text-[#8B6F5D] tracking-[0.2em] uppercase font-light">
            {content.signature}
          </p>
        </div>

        {/* Footer copyright */}
        <div className="mt-16 pt-8 border-t border-[#BCA89F]/20 text-center text-[11px] text-[#A68A78] font-light">
          <p>© 2026 Hồng Quân &amp; Thương Huyền · Trọn đời bên nhau</p>
        </div>
      </div>

    </section>
  );
}
