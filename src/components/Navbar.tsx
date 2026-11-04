import React, { useState, useEffect } from 'react';
import { MonogramHQ } from './Decorations';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRsvp: () => void;
}

export function Navbar({ onOpenRsvp }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowNames(window.scrollY >= 300);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Trang chủ' },
    { href: '#story', label: 'Chuyện tình yêu' },
    { href: '#invitation', label: 'Thiệp mời' },
    { href: '#gallery', label: 'Thư viện' },
    { href: '#rsvp', label: 'Xác nhận' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#D5C2B4]/40'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        
        {/* Zone 1: Brand title / Monogram */}
        <a
          href="#hero"
          aria-label={'Hồng Quân & Thương Huyền — Trang chủ'}
          className="flex items-center gap-2 sm:gap-3 shrink-0 group"
        >
          <MonogramHQ className="w-12 h-12" />
          <span
            aria-hidden={!showNames}
            className={`header-names font-script sm:font-serif text-lg min-[375px]:text-[22px] sm:text-lg leading-tight tracking-normal sm:tracking-tight text-[#3D3028] whitespace-nowrap font-normal ${showNames ? 'is-visible' : ''}`}
          >
            <span className="header-name">Hồng Quân</span>{' '}
            <span className="header-name sm:font-script sm:text-xl text-[#8B6F5D]">&amp;</span>{' '}
            <span className="header-name">Thương Huyền</span>
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav aria-label={'Điều hướng chính'} className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#6E5343]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#3D3028] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#8B6F5D] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}


        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRsvp}
            className="hidden sm:inline-flex px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#8B6F5D] hover:bg-[#6E5343] rounded-full transition-colors whitespace-nowrap shadow-xs"
          >
            {'Gửi lời chúc'}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-11 min-w-11 p-2 text-[#6E5343] hover:text-[#3D3028] rounded-lg"
            aria-label={mobileMenuOpen ? ('Đóng menu') : ('Mở menu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#FAF7F2] border-b border-[#D5C2B4] px-6 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav aria-label={'Điều hướng di động'} className="flex flex-col space-y-1 text-xs uppercase tracking-widest font-medium text-[#6E5343]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center py-2 hover:text-[#3D3028] border-b border-[#EFE8DF]"
              >
                {link.label}
              </a>
            ))}


            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRsvp();
              }}
              className="w-full mt-2 py-2.5 text-center text-xs uppercase tracking-wider font-medium text-white bg-[#8B6F5D] rounded-full"
            >
              {'Gửi lời chúc'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
