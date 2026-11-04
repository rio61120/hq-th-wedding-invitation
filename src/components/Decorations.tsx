import React from 'react';
import { motion } from 'motion/react';
import lotusBlossom from '../assets/decors/lotus_blossom.png';
import floralDivider from '../assets/decors/floral_divider.png';
import cornerFloral from '../assets/decors/corner_floral.png';
import monogramSeal from '../assets/decors/monogram_seal.png';

// Transparent PNG Decor Asset paths (100% transparent backgrounds)
export const PNG_DECORS = {
  lotusBlossom,
  floralDivider,
  cornerFloral,
  monogramSeal,
};

// 1. Monogram HQ using authentic transparent wax seal stamp
export function MonogramHQ({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <motion.img
        initial={{ opacity: 0, scale: 0.82, rotate: -12 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        src={PNG_DECORS.monogramSeal.src}
        alt=""
        className="seal-motion w-full h-full object-contain filter drop-shadow-xs"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// 2. Transparent Botanical Magnolia Blossom PNG
export function BotanicalBlossom({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <motion.img
        initial={false}
        whileInView={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
        src={PNG_DECORS.lotusBlossom.src}
        alt=""
        className="botanical-motion w-full h-full object-contain"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// 3. Transparent Floral Branch Divider PNG
export function FloralBranchDivider({ className = "w-72 sm:w-80 h-auto" }: { className?: string }) {
  return (
    <div className={`relative mx-auto pointer-events-none select-none ${className}`}>
      <motion.img
        initial={{ opacity: 0, scaleX: 0.75 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        src={PNG_DECORS.floralDivider.src}
        alt=""
        className="w-full h-auto object-contain"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// 4. Transparent Corner Floral Flourish PNG
export function FloralCorner({
  className = "w-24 h-24 sm:w-32 sm:h-32",
  position = "top-left",
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const transform = {
    "top-left": "scaleX(-1)",
    "top-right": "",
    "bottom-left": "scale(-1, -1)",
    "bottom-right": "scaleY(-1)",
  }[position];

  return (
    <div
      style={{ transform }}
      className={`pointer-events-none select-none ${className}`}
    >
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: position.startsWith('bottom') ? 0.15 : 0 }}
        src={PNG_DECORS.cornerFloral.src}
        alt=""
        className="w-full h-full object-contain"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// 5. Traditional Betrothal Gate (Lễ Nạp Tài) Icon
export function TraditionalGateIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#8B6F5D] ${className}`}
    >
      <path
        d="M6 14 C12 11, 28 11, 34 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 12 L14 7 H26 L32 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M20 4 V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 14 V34" stroke="currentColor" strokeWidth="1.2" />
      <path d="M28 14 V34" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 20 H28" stroke="currentColor" strokeWidth="0.8" />
      <path d="M10 34 H30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 6. Floral Wedding Ceremony Arch (Lễ Thành Hôn) Icon
export function FloralArchIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#8B6F5D] ${className}`}
    >
      <path
        d="M10 34 V18 C10 11.5, 14.5 7, 20 7 C25.5 7, 30 11.5, 30 18 V34"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M14 34 V18 C14 13.5, 16.5 10.5, 20 10.5 C23.5 10.5, 26 13.5, 26 18 V34"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      <circle cx="20" cy="7" r="2" fill="currentColor" fillOpacity="0.7" />
      <path d="M7 34 H33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
