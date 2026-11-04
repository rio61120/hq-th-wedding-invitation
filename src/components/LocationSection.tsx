import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, ExternalLink, MapPin } from "lucide-react";
import { BotanicalBlossom } from "./Decorations";

export function LocationSection() {
  const [copied, setCopied] = useState(false);
  const [showSatellite, setShowSatellite] = useState(false);
  const address = "Số 25 - Ngõ 1 Phú Chung, Phường Phú Sơn, TP. Thanh Hóa";
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=k&z=15&output=embed`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const content = {
    sub: "ĐỊA ĐIỂM & CHỈ ĐƯỜNG",
    title: "ĐỊA ĐIỂM TỔ CHỨC",
    copy: "Sao chép địa chỉ",
    copied: "Đã sao chép địa chỉ",
    view: "Xem trên Google Maps",
    satellite: "Xem bản đồ vệ tinh",
    hide: "Thu gọn bản đồ",
  };

  return (
    <section id="location" className="relative bg-[#F4EFEB] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center sm:mb-12"
        >
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.3em] text-[#8B6F5D]">
            {content.sub}
          </span>
          <h2 className="font-serif text-3xl font-light tracking-[0.15em] text-[#3D3028] sm:text-4xl">
            {content.title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mx-auto mt-4 h-px w-12 bg-[#BCA89F]"
          />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-[#D5C2B4] bg-[#FAF7F2] shadow-sm"
        >
          {showSatellite ? (
            <div className="relative h-[320px] sm:h-[420px]">
              <iframe
                title={"Bản đồ vệ tinh địa điểm tổ chức"}
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <button
                type="button"
                onClick={() => setShowSatellite(false)}
                className="absolute right-3 top-3 inline-flex min-h-11 items-center rounded-full border border-[#D5C2B4] bg-[#FAF7F2]/95 px-4 text-xs font-medium text-[#6E5343] shadow-sm hover:bg-white"
              >
                {content.hide}
              </button>
            </div>
          ) : (
            <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-[#FAF7F2] p-6 sm:h-[420px]">
              <svg
                className="absolute inset-0 h-full w-full text-[#BCA89F]/40"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line
                  x1="20%"
                  y1="0"
                  x2="40%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="70%"
                  y1="0"
                  x2="30%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="40%"
                  x2="100%"
                  y2="60%"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="70%"
                  x2="100%"
                  y2="35%"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M 0 210 Q 140 100 280 220 T 560 150"
                  stroke="#8B6F5D"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  fill="none"
                  opacity="0.35"
                />
              </svg>
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-20 w-20 sm:h-30 sm:w-30">
                <BotanicalBlossom className="h-full w-full -rotate-12 drop-shadow-xs" />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-[#8B6F5D]/20" />
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#8B6F5D] text-white shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSatellite(true)}
                  className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#8B6F5D] bg-[#FAF7F2] px-5 text-xs font-medium uppercase tracking-wider text-[#6E5343] shadow-2xs transition-colors hover:bg-[#8B6F5D] hover:text-white"
                >
                  {content.satellite}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D5C2B4] bg-[#FAF7F2] px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#6E5343] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4 text-[#8B6F5D]" />
            )}
            <span>{copied ? content.copied : content.copy}</span>
          </button>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#8B6F5D] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#6E5343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D]"
          >
            <ExternalLink className="h-4 w-4" />
            <span>{content.view}</span>
          </a>
        </motion.div>
        <span className="sr-only" aria-live="polite">
          {copied ? content.copied : ""}
        </span>
      </div>
    </section>
  );
}
