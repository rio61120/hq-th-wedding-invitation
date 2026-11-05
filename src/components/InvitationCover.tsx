'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MailOpen, Pause, Play } from 'lucide-react';
import { FloralBranchDivider, MonogramHQ } from './Decorations';

const photos = [
  '/images/optimized/wedding-18.webp',
  '/images/optimized/wedding-1.webp',
  '/images/optimized/wedding-23.webp',
  '/images/optimized/wedding-17.webp',
  '/images/optimized/wedding-19.webp',
  '/images/optimized/wedding-15.webp',
  '/images/optimized/wedding-10.webp',
  '/images/optimized/wedding-24.webp',
  '/images/optimized/wedding-25.webp',
  '/images/optimized/wedding-5.webp',
  '/images/optimized/wedding-6.webp',
  '/images/optimized/wedding-8.webp',
  '/images/optimized/wedding-22.webp',
  '/images/optimized/wedding-27.webp',
  '/images/optimized/wedding-29.webp',
  '/images/optimized/wedding-30.webp',
  '/images/optimized/wedding-31.webp',
  '/images/optimized/wedding-32.webp',
  '/images/optimized/wedding-34.webp',
  '/images/optimized/wedding-36.webp',
  '/images/optimized/wedding-38.webp',
  '/images/optimized/wedding-bop_6359.webp',
  '/images/optimized/wedding-bop_6391.webp',
  '/images/optimized/wedding-bop_6744.webp',
];

export function InvitationCover({
  invitedName,
  onOpen,
}: {
  invitedName: string;
  onOpen: () => void;
}) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!isPlaying || isOpening) return;
    const timer = window.setInterval(
      () => setActivePhoto((index) => (index + 1) % photos.length),
      3000,
    );
    return () => window.clearInterval(timer);
  }, [isOpening, isPlaying]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isOpening) return;
    const timer = window.setTimeout(onOpen, 760);
    return () => window.clearTimeout(timer);
  }, [isOpening, onOpen]);

  return (
    <motion.main
      className="fixed inset-0 z-[100] bg-[#FAF7F2]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="personal-invitation-title"
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: 0.55, delay: isOpening ? 0.2 : 0 }}
    >
      <motion.section
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden rounded-none bg-[#FAF7F2]"
        aria-label="Thiệp mời cưới"
      >
        <motion.div
          className="relative min-h-0 flex-[3] overflow-hidden bg-[#34251f]"
          animate={isOpening ? { y: '-105%' } : { y: 0 }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={activePhoto}
              src={photos[activePhoto]}
              alt={`Ảnh cưới Hồng Quân và Thương Huyền ${activePhoto + 1}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.015 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            aria-label={isPlaying ? 'Tạm dừng trình chiếu ảnh' : 'Tiếp tục trình chiếu ảnh'}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white shadow-lg backdrop-blur-md transition hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPlaying ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5" aria-hidden="true">
            {photos.map((photo, index) => (
              <span
                key={photo}
                className={`h-1 rounded-full transition-all duration-500 ${index === activePhoto ? 'w-5 bg-white' : 'w-1 bg-white/55'}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative flex min-h-0 flex-[2] flex-col items-center justify-start overflow-y-auto px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-center sm:px-10 sm:py-4"
          animate={isOpening ? { y: '110%' } : { y: 0 }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          <MonogramHQ className="mb-2 h-10 w-10 sm:mb-3 sm:h-12 sm:w-12" />
          <h1 className="flex shrink-0 items-baseline justify-center gap-1 whitespace-nowrap leading-none sm:gap-2" id="personal-invitation-title">
            <span className="font-script text-[clamp(1.5rem,6vw,3rem)] text-[#3D3028]">Hồng Quân</span>
            <span className="font-serif text-base italic font-light text-[#8B6F5D] sm:text-2xl">&amp;</span>
            <span className="font-script text-[clamp(1.5rem,6vw,3rem)] text-[#3D3028]">Thương Huyền</span>
          </h1>
          <p className="mt-2 shrink-0 text-[10px] font-medium uppercase tracking-[0.28em] text-[#98735D] sm:text-xs">
            Trân trọng kính mời
          </p>
          <p className="mt-1 max-w-full shrink-0 break-words font-serif text-xl leading-tight text-[#3D3028] sm:text-2xl" title={invitedName}>
            {invitedName}
          </p>
          <button
            type="button"
            disabled={isOpening}
            onClick={() => setIsOpening(true)}
            className="mt-4 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#8B6F5D] px-7 py-3 text-sm font-medium text-white shadow-[0_8px_22px_rgba(91,66,49,0.22)] transition hover:bg-[#745744] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D] disabled:cursor-wait sm:mt-5"
          >
            <MailOpen aria-hidden="true" className="h-4 w-4" />
            Xem thiệp
          </button>
          <div className="mt-2 w-full shrink-0 sm:mt-3">
            <FloralBranchDivider className="h-auto w-40 opacity-90 sm:w-56" />
          </div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
