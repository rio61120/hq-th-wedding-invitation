import React from 'react';
import { motion } from 'motion/react';
import { TraditionalGateIcon, FloralArchIcon, FloralBranchDivider, FloralCorner } from './Decorations';
import { Clock, Home, Calendar, MapPin } from 'lucide-react';

interface EventsSectionProps {
  onScrollToLocation: () => void;
}

export function EventsSection({ onScrollToLocation }: EventsSectionProps) {
  const content = {
    sub: 'THÔNG TIN SỰ KIỆN',
    title: 'LỊCH CƯỚI',
    event1: {
      name: 'Lễ Nạp Tài (Lễ Ăn Hỏi)',
      date: '14 . 11 . 2026',
      time: '',
      venueType: 'Tư gia nhà trai',
      address: 'Số 25 - Ngõ 1 Phú Chung, Phường Phú Sơn - TP. Thanh Hóa',
      calLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+N%E1%BA%A1p+T%C3%A0i+-+H%E1%BB%93ng+Qu%C3%A2n+%26+Th%C6%B0%C6%A1ng+Huy%E1%BB%81n&dates=20261114/20261115&location=S%E1%BB%91+25+-+Ng%C3%B5+1+Ph%C3%BA+Chung%2C+Ph%C6%B0%E1%BB%9Dng+Ph%C3%BA+S%C6%A1n+-+TP+Thanh+H%C3%B3a',
    },
    event2: {
      name: 'Lễ Thành Hôn',
      date: '16 . 11 . 2026',
      time: 'Vào lúc 14:00',
      venueType: 'Tư gia nhà trai',
      address: 'Số 25 - Ngõ 1 Phú Chung, Phường Phú Sơn - TP. Thanh Hóa',
      calLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+-+H%E1%BB%93ng+Qu%C3%A2n+%26+Th%C6%B0%C6%A1ng+Huy%E1%BB%81n&dates=20261116T070000Z/20261116T080000Z&location=S%E1%BB%91+25+-+Ng%C3%B5+1+Ph%C3%BA+Chung%2C+Ph%C6%B0%E1%BB%9Dng+Ph%C3%BA+S%C6%A1n+-+TP+Thanh+H%C3%B3a',
    },
    calBtn: 'Thêm vào lịch',
    mapBtn: 'Chỉ đường',
  };

  return (
    <section id="events" className="py-20 bg-[#F4EFEB]/60 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B6F5D] font-medium block mb-2">
            {content.sub}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#3D3028] font-light">
            {content.title}
          </h2>
          <div className="w-12 h-px bg-[#BCA89F] mx-auto mt-4" />
        </div>

        {/* Two Event Cards with Central Divider */}
        <div className="relative bg-[#FAF7F2] rounded-3xl p-8 sm:p-14 shadow-lg border border-[#D5C2B4] overflow-hidden">
          {/* Subtle Corner Flourishes */}
          <FloralCorner position="top-left" className="absolute -top-2 -left-2 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none drop-shadow-2xs" />
          <FloralCorner position="top-right" className="absolute -top-2 -right-2 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none drop-shadow-2xs" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start relative z-10">
            
            {/* Vertical hairline divider for md+ */}
            <div className="hidden md:block absolute top-4 bottom-4 left-1/2 w-px -translate-x-1/2 bg-[#BCA89F]/30" />

            {/* Event 1: Lễ Nạp Tài */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-3 rounded-full bg-[#F4EFEB] border border-[#D5C2B4]/60">
                <TraditionalGateIcon className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#3D3028] font-normal">
                  {content.event1.name}
                </h3>
                <p className="font-serif text-base tracking-[0.2em] text-[#8B6F5D] mt-1 font-light">
                  {content.event1.date}
                </p>
              </div>

              {content.event1.time && (
                <div className="inline-flex items-center gap-1.5 text-xs text-[#6E5343] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#8B6F5D]" />
                  <span>{content.event1.time}</span>
                </div>
              )}

              <div className="pt-2 text-center max-w-xs space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3D3028]">
                  <Home className="w-3.5 h-3.5 text-[#8B6F5D]" />
                  <span>{content.event1.venueType}</span>
                </div>
                <p className="text-xs text-[#6E5343] font-light leading-relaxed">
                  {content.event1.address}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={content.event1.calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[#8B6F5D] text-[#6E5343] hover:bg-[#8B6F5D] hover:text-white text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3 h-3" />
                  <span>{content.calBtn}</span>
                </a>
                <button
                  onClick={onScrollToLocation}
                  className="px-4 py-2 rounded-full border border-[#D5C2B4] text-[#8B6F5D] hover:bg-[#FAF7F2] text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{content.mapBtn}</span>
                </button>
              </div>
            </motion.div>

            {/* Event 2: Lễ Thành Hôn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-3 rounded-full bg-[#F4EFEB] border border-[#D5C2B4]/60">
                <FloralArchIcon className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#3D3028] font-normal">
                  {content.event2.name}
                </h3>
                <p className="font-serif text-base tracking-[0.2em] text-[#8B6F5D] mt-1 font-light">
                  {content.event2.date}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#6E5343] font-medium">
                <Clock className="w-3.5 h-3.5 text-[#8B6F5D]" />
                <span>{content.event2.time}</span>
              </div>

              <div className="pt-2 text-center max-w-xs space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3D3028]">
                  <Home className="w-3.5 h-3.5 text-[#8B6F5D]" />
                  <span>{content.event2.venueType}</span>
                </div>
                <p className="text-xs text-[#6E5343] font-light leading-relaxed">
                  {content.event2.address}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={content.event2.calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#8B6F5D] text-white hover:bg-[#6E5343] text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-3 h-3" />
                  <span>{content.calBtn}</span>
                </a>
                <button
                  onClick={onScrollToLocation}
                  className="px-4 py-2 rounded-full border border-[#D5C2B4] text-[#8B6F5D] hover:bg-[#FAF7F2] text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{content.mapBtn}</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
