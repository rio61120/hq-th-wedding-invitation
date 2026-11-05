import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FloralBranchDivider,
  BotanicalBlossom,
  MonogramHQ,
} from "./Decorations";
import { Gift, X } from "lucide-react";

export function ClosingSection() {
  const [showGiftModal, setShowGiftModal] = useState(false);

  useEffect(() => {
    if (!showGiftModal) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowGiftModal(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showGiftModal]);

  const content = {
    sub: "LỜI CẢM ƠN",
    thankYou: "Cảm Ơn!",
    body: "Cảm ơn bạn vì đã trở thành một phần trong câu chuyện của chúng tôi.",
    signature: "Hồng Quân & Thương Huyền",
    giftBoxBtn: "Hộp mừng cưới (Gửi quà cưới)",
    giftModalTitle: "Hộp Mừng Cưới",
    giftModalDesc:
      "Sự hiện diện và lời chúc phúc của bạn là món quà ý nghĩa nhất. Nếu muốn gửi lời chúc từ xa, bạn có thể quét mã QR bên dưới.",
    groomTitle: "Chú Rể: Hồng Quân",
    brideTitle: "Cô Dâu: Thương Huyền",
  };

  return (
    <section
      id="closing"
      className="py-24 bg-[#F4EFEB] relative overflow-hidden"
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
        {/* Gift Box / Mừng cưới Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowGiftModal(true)}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#8B6F5D] bg-[#FAF7F2] px-8 py-3 text-xs font-medium uppercase tracking-wider text-[#5A4537] shadow-2xs transition-all duration-300 hover:bg-[#8B6F5D] hover:text-white hover:shadow-md"
          >
            <Gift className="h-3.5 w-3.5" />
            <span>{content.giftBoxBtn}</span>
          </button>
        </div>

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

      {/* Gift Box Modal */}
      <AnimatePresence>
        {showGiftModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A211B]/60 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-[#D5C2B4] bg-gradient-to-b from-[#FFFCF8] to-[#F4EFEB] p-5 shadow-2xl sm:p-9"
            >
              <button
                onClick={() => setShowGiftModal(false)}
                className="absolute right-3 top-3 flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-[#8B6F5D] transition-colors hover:bg-[#EFE8DF] hover:text-[#3D3028] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D] sm:right-5 sm:top-5"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-7 text-center sm:mb-8">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#D5C2B4] bg-white text-[#8B6F5D] shadow-sm">
                  <Gift className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[#A68A78]">
                  Hồng Quân &amp; Thương Huyền
                </p>
                <h3 id="gift-modal-title" className="font-serif text-2xl font-normal text-[#3D3028] sm:text-3xl">
                  {content.giftModalTitle}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-[#6E5343]">
                  {content.giftModalDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {[
                  {
                    title: content.groomTitle,
                    src: "/QRs/chu_re_QR.jpg",
                    alt: "Mã QR mừng cưới chú rể Hồng Quân",
                  },
                  {
                    title: content.brideTitle,
                    src: "/QRs/co_dau_QR.jpg",
                    alt: "Mã QR mừng cưới cô dâu Thương Huyền",
                  },
                ].map((qr) => (
                  <div
                    key={qr.src}
                    className="rounded-2xl border border-[#D9C9BC] bg-white/80 p-3 text-center shadow-sm sm:p-4"
                  >
                    <h4 className="mb-3 font-serif text-lg text-[#5A4537]">
                      {qr.title}
                    </h4>
                    <div className="aspect-[3/2] overflow-hidden rounded-xl border border-[#EEE5DC] bg-white">
                      <img
                        src={qr.src}
                        alt={qr.alt}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </div>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#A68A78]">
                      Quét mã để gửi lời chúc
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 text-center">
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="min-h-11 cursor-pointer rounded-full bg-[#8B6F5D] px-8 text-xs font-medium uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#6E5343] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D]"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
