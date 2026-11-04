import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FloralBranchDivider,
  BotanicalBlossom,
  MonogramHQ,
} from "./Decorations";
import { Gift, Copy, Check, X } from "lucide-react";

export function ClosingSection() {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  useEffect(() => {
    if (!showGiftModal) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowGiftModal(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showGiftModal]);

  const groomBank = {
    bank: "Vietcombank",
    accountNumber: "1029384756",
    name: "NGUYEN HONG QUAN",
  };

  const brideBank = {
    bank: "Techcombank",
    accountNumber: "1903456789012",
    name: "TRAN THUONG HUYEN",
  };

  const handleCopyGroom = () => {
    navigator.clipboard.writeText(groomBank.accountNumber);
    setCopiedGroom(true);
    setTimeout(() => setCopiedGroom(false), 2000);
  };

  const handleCopyBride = () => {
    navigator.clipboard.writeText(brideBank.accountNumber);
    setCopiedBride(true);
    setTimeout(() => setCopiedBride(false), 2000);
  };

  const content = {
    sub: "LỜI CẢM ƠN",
    thankYou: "Cảm Ơn!",
    body: "Cảm ơn bạn vì đã trở thành một phần trong câu chuyện của chúng tôi.",
    signature: "Hồng Quân & Thương Huyền",
    giftBoxBtn: "Hộp mừng cưới (Gửi quà cưới)",
    giftModalTitle: "Hộp Mừng Cưới",
    giftModalDesc:
      "Sự hiện diện và lời chúc phúc của bạn là món quà ý nghĩa nhất. Nếu bạn muốn gửi lời chúc mừng từ xa, có thể gửi qua số tài khoản dưới đây:",
    groomTitle: "Chú Rể: Hồng Quân",
    brideTitle: "Cô Dâu: Thương Huyền",
    copyText: "Sao chép số TK",
    copiedText: "Đã sao chép!",
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
            aria-label={content.giftModalTitle}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C2B4] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowGiftModal(false)}
                className="absolute top-4 right-4 p-2 text-[#8B6F5D] hover:text-[#3D3028] rounded-full hover:bg-[#EFE8DF] transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#EAE2D7] text-[#8B6F5D] flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#3D3028] font-normal">
                  {content.giftModalTitle}
                </h3>
                <p className="text-xs text-[#8B6F5D] font-light max-w-md mx-auto mt-2 leading-relaxed">
                  {content.giftModalDesc}
                </p>
              </div>

              {/* Groom and Bride Bank Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {/* Groom Card */}
                <div className="p-5 rounded-2xl bg-[#F4EFEB] border border-[#D5C2B4] flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8B6F5D] font-semibold block mb-1">
                      {content.groomTitle}
                    </span>
                    <p className="font-serif text-base font-medium text-[#3D3028]">
                      {groomBank.name}
                    </p>
                    <p className="text-xs text-[#6E5343] mt-1">
                      {groomBank.bank}
                    </p>
                    <p className="font-mono text-sm tracking-wider text-[#8B6F5D] font-bold mt-2">
                      {groomBank.accountNumber}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyGroom}
                    className="mt-4 px-3 py-2 rounded-xl border border-[#BCA89F] bg-white text-[11px] font-medium text-[#6E5343] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {copiedGroom ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#8B6F5D]" />
                    )}
                    <span>
                      {copiedGroom ? content.copiedText : content.copyText}
                    </span>
                  </button>
                </div>

                {/* Bride Card */}
                <div className="p-5 rounded-2xl bg-[#F4EFEB] border border-[#D5C2B4] flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8B6F5D] font-semibold block mb-1">
                      {content.brideTitle}
                    </span>
                    <p className="font-serif text-base font-medium text-[#3D3028]">
                      {brideBank.name}
                    </p>
                    <p className="text-xs text-[#6E5343] mt-1">
                      {brideBank.bank}
                    </p>
                    <p className="font-mono text-sm tracking-wider text-[#8B6F5D] font-bold mt-2">
                      {brideBank.accountNumber}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyBride}
                    className="mt-4 px-3 py-2 rounded-xl border border-[#BCA89F] bg-white text-[11px] font-medium text-[#6E5343] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {copiedBride ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#8B6F5D]" />
                    )}
                    <span>
                      {copiedBride ? content.copiedText : content.copyText}
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="px-8 py-2.5 rounded-full bg-[#8B6F5D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#6E5343] transition-colors cursor-pointer shadow-xs"
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
