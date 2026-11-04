import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { BotanicalBlossom } from "./Decorations";

export function CountdownSection() {
  // Wedding ceremony: November 16, 2026 at 2:00 PM in Vietnam.
  const targetDate = new Date("2026-11-16T14:00:00+07:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const labels = {
    sub: "ĐẾM NGƯỢC NGÀY CƯỚI",
    title: "NGÀY HẠNH PHÚC",
    days: "Ngày",
    hours: "Giờ",
    minutes: "Phút",
    seconds: "Giây",
    message: "Cùng đếm ngược tới khoảnh khắc hạnh phúc nhất của chúng mình",
  };

  return (
    <section id="countdown" className="py-20 relative bg-[#F4EFEB]">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B6F5D] font-medium block mb-2">
          {labels.sub}
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#3D3028] font-light mb-3"
        >
          {labels.title}
        </motion.h2>
        <p className="text-xs sm:text-sm text-[#8B6F5D] font-light max-w-md mx-auto mb-4">
          {labels.message}
        </p>

        {/* Transparent PNG Botanical Magnolia Blossom centered right above counters matching sketch 06 */}
        <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto -mb-4 sm:-mb-6 pointer-events-none select-none">
          <BotanicalBlossom className="w-full h-full drop-shadow-xs" />
        </div>

        {/* 4 Counter Columns matching sketch with clean styling */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {/* Days */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D5C2B4]/70 shadow-sm"
          >
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#3D3028] font-light tabular-nums">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8B6F5D] mt-2 font-medium">
              {labels.days}
            </span>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D5C2B4]/70 shadow-sm"
          >
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#3D3028] font-light tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8B6F5D] mt-2 font-medium">
              {labels.hours}
            </span>
          </motion.div>

          {/* Minutes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D5C2B4]/70 shadow-sm"
          >
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#3D3028] font-light tabular-nums">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8B6F5D] mt-2 font-medium">
              {labels.minutes}
            </span>
          </motion.div>

          {/* Seconds */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D5C2B4]/70 shadow-sm"
          >
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#8B6F5D] font-light tabular-nums animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8B6F5D] mt-2 font-medium">
              {labels.seconds}
            </span>
          </motion.div>
        </div>

        {/* Subtle decorative heart divider */}
        <div className="flex items-center justify-center gap-3 mt-12 opacity-60">
          <span className="h-px w-16 bg-[#BCA89F]" />
          <Heart className="w-3.5 h-3.5 text-[#8B6F5D] fill-[#8B6F5D]/20" />
          <span className="h-px w-16 bg-[#BCA89F]" />
        </div>
      </div>
    </section>
  );
}
