'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InvitationSection } from './components/InvitationSection';
import { StorySection } from './components/StorySection';
import { CountdownSection } from './components/CountdownSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { GiftQrSection } from './components/GiftQrSection';
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { MusicPlayer, MusicPlayerHandle } from './components/MusicPlayer';
import { FallingPetals } from './components/FallingPetals';
import { InvitationCover } from './components/InvitationCover';

export default function App({ invitedName }: { invitedName: string | null }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const [hasOpenedInvite, setHasOpenedInvite] = useState(!invitedName);
  const startImmediately = useRef(false);
  const musicRef = useRef<MusicPlayerHandle | null>(null);

  useEffect(() => {
    if (!autoScroll || (invitedName && !hasOpenedInvite)) return;

    let animationFrame = 0;
    let scrollActive = true;
    const cancel = () => {
      scrollActive = false;
      window.cancelAnimationFrame(animationFrame);
      setAutoScroll(false);
    };
    const cancelForKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End', 'Tab'].includes(event.key)) cancel();
    };
    const delay = startImmediately.current ? 0 : 5000;
    startImmediately.current = false;
    const timer = window.setTimeout(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let previousFrame = 0;
      let stableBottomSince: number | null = null;
      let previousHeight = 0;

      const scrollToEnd = (now: number) => {
        if (!scrollActive) return;
        const endY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const frameTime = previousFrame ? Math.min(now - previousFrame, 50) : 0;
        const nextY = reducedMotion ? endY : Math.min(endY, window.scrollY + frameTime * 0.1);
        window.scrollTo({ top: nextY, behavior: 'instant' });
        previousFrame = now;

        const pageHeight = document.documentElement.scrollHeight;
        if (window.scrollY >= endY - 1) {
          if (pageHeight !== previousHeight) {
            previousHeight = pageHeight;
            stableBottomSince = now;
          } else if (stableBottomSince === null) {
            stableBottomSince = now;
          } else if (now - stableBottomSince >= 1500) {
            setAutoScroll(false);
            return;
          }
        } else {
          stableBottomSince = null;
          previousHeight = pageHeight;
        }

        if (scrollActive) {
          animationFrame = window.requestAnimationFrame(scrollToEnd);
        } else {
          setAutoScroll(false);
        }
      };

      animationFrame = window.requestAnimationFrame(scrollToEnd);
    }, delay);

    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchmove', cancel, { passive: true });
    window.addEventListener('keydown', cancelForKey);
    return () => {
      scrollActive = false;
      window.clearTimeout(timer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchmove', cancel);
      window.removeEventListener('keydown', cancelForKey);
    };
  }, [autoScroll, hasOpenedInvite, invitedName]);

  const scrollToInvitation = () => {
    const el = document.getElementById('invitation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative">
    <div
      aria-hidden={Boolean(invitedName && !hasOpenedInvite)}
      inert={Boolean(invitedName && !hasOpenedInvite)}
      className="min-h-screen bg-[#FAF7F2] text-[#3D3028] relative selection:bg-[#D5C2B4] selection:text-[#2B221B] font-sans antialiased overflow-x-hidden"
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest('a[href^="#"], main button, #mobile-menu, button[aria-controls="mobile-menu"]')) {
          setAutoScroll(false);
        }
      }}
    >
      <FallingPetals />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-[#3D3028]">
        {'Bỏ qua điều hướng, đến nội dung'}
      </a>
      
      {/* Top Navbar */}
      <Navbar onOpenRsvp={scrollToRsvp} />

      <main id="main-content">
        {/* 01. HERO - Trang chủ & Save the Date */}
        <HeroSection onScrollToInvitation={scrollToInvitation} />

        {/* 02. INVITATION - Lời mời trang trong */}
        <InvitationSection />

        {/* OUR STORY - Câu chuyện tình yêu */}
        <StorySection />

        {/* COUNTDOWN - Đếm ngược ngày cưới */}
        <CountdownSection />

        {/* GALLERY - Thư viện ảnh cưới */}
        <GallerySection />

        {/* LOCATION - Địa điểm & chỉ đường */}
        <LocationSection />

        {/* GIFT QR - Hộp mừng cưới */}
        <GiftQrSection />

        {/* RSVP - Xác nhận tham dự */}
        <RsvpSection />

        {/* CLOSING - Lời cảm ơn & Hộp mừng cưới */}
        <ClosingSection />
      </main>

      <button
        type="button"
        role="switch"
        aria-checked={autoScroll}
        aria-label={'Tự động trình diễn thiệp cưới'}
        data-auto-scroll-toggle
        onClick={() => {
          if (!autoScroll) startImmediately.current = true;
          setAutoScroll((enabled) => !enabled);
        }}
        className="fixed right-3 bottom-[calc(7.75rem+env(safe-area-inset-bottom))] z-50 inline-flex h-20 w-11 flex-col items-center justify-center gap-2 rounded-full border border-[#BCA89F]/50 bg-[#FFFCF8]/95 p-1 text-[#5A4537] shadow-[0_6px_24px_rgba(80,59,45,0.15)] backdrop-blur-md transition-all hover:border-[#8B6F5D] hover:shadow-[0_9px_28px_rgba(80,59,45,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D] sm:right-6 sm:bottom-[4.75rem]"
      >
        <ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8B6F5D]" />
        <span aria-hidden="true" className={`inline-flex h-11 w-6 shrink-0 items-start justify-center rounded-full border p-px transition-colors duration-300 ${autoScroll ? 'border-[#8B6F5D] bg-[#8B6F5D]' : 'border-[#C5B8AD] bg-[#D8CCC0]'}`}>
          <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${autoScroll ? 'translate-y-5' : 'translate-y-0'}`} />
        </span>
      </button>

      {/* Nhạc nền dương cầm đám cưới kinh điển */}
      <MusicPlayer ref={musicRef} />
    </div>
    {invitedName && !hasOpenedInvite && (
      <InvitationCover
        invitedName={invitedName}
        onOpen={() => setHasOpenedInvite(true)}
        onStartOpen={() => musicRef.current?.play()}
      />
    )}
    </div>
    </MotionConfig>
  );
}
