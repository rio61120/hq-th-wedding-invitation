import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { FloralBranchDivider } from "./Decorations";

export function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhotoIndex(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPhotoIndex]);

  const photos = [
    {
      src: "/images/optimized/wedding-18.webp",
      title: "Ngày Chung Đôi",
      desc: "Hồng Quân và Thương Huyền bên nhau trong khu vườn xanh",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-1.webp",
      title: "Ánh Mắt Yêu Thương",
      desc: "Khoảnh khắc nhìn nhau bên đài phun nước",
      aspect: "wide",
    },
    {
      src: "/images/optimized/wedding-23.webp",
      title: "Dịu Dàng Bên Nhau",
      desc: "Khăn voan và bó hoa trong ánh sáng vàng ấm áp",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-17.webp",
      title: "Nắm Tay Trọn Đời",
      desc: "Nụ cười cô dâu và cái nắm tay của chú rể",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-19.webp",
      title: "Khăn Voan Trong Gió",
      desc: "Cùng nhau giữa khu vườn và làn nước lung linh",
      aspect: "wide",
    },
    {
      src: "/images/optimized/wedding-15.webp",
      title: "Bình Yên Có Nhau",
      desc: "Cái ôm dịu dàng trên lối vườn xanh",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-10.webp",
      title: "Khoảnh Khắc Ngọt Ngào",
      desc: "Bên nhau dưới khăn voan trong ánh nắng vàng",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-24.webp",
      title: "Lời Hẹn Trăm Năm",
      desc: "Bên nhau cùng bó hoa cưới trong ánh sáng dịu dàng",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-25.webp",
      title: "Hạnh Phúc Là Có Nhau",
      desc: "Nụ cười và bó hoa ghi lại ngày chung đôi",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-5.webp",
      title: "Nàng Thơ Trong Vườn",
      desc: "Thương Huyền với bó hoa cưới giữa khu vườn xanh",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-6.webp",
      title: "Ngày Mình Thành Đôi",
      desc: "Hồng Quân và Thương Huyền trong bộ ảnh cưới tại studio",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-8.webp",
      title: "Nụ Cười Chung Đôi",
      desc: "Cùng nhau rạng rỡ trong trang phục cưới",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-22.webp",
      title: "Bản Tình Ca Trong Vườn",
      desc: "Khoảnh khắc của đôi mình bên đài phun nước",
      aspect: "wide",
    },
    {
      src: "/images/optimized/wedding-27.webp",
      title: "Tay Trong Tay",
      desc: "Cận cảnh đôi bàn tay và chiếc nhẫn cưới",
      aspect: "wide",
    },
    {
      src: "/images/optimized/wedding-29.webp",
      title: "Khăn Voan Bay Nhẹ",
      desc: "Khăn voan bay bên cô dâu và chú rể giữa vườn",
      aspect: "wide",
    },
    {
      src: "/images/optimized/wedding-30.webp",
      title: "Bên Nhau Giữa Vườn Xanh",
      desc: "Cùng nhau lưu giữ khoảnh khắc bên đài phun nước",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-31.webp",
      title: "Hẹn Ước Dịu Dàng",
      desc: "Chân dung đôi mình bên những nhành hoa khô",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-32.webp",
      title: "Chạm Vào Yêu Thương",
      desc: "Cử chỉ dịu dàng chú rể dành cho cô dâu",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-34.webp",
      title: "Khoảnh Khắc Bình Yên",
      desc: "Ánh nhìn yêu thương giữa lối vườn xanh",
      aspect: "wide",
    },
    {
      src: "/images/optimized/wedding-36.webp",
      title: "Hạnh Phúc Đong Đầy",
      desc: "Hồng Quân và Thương Huyền rạng rỡ bên nhau",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-38.webp",
      title: "Chung Một Chặng Đường",
      desc: "Đôi mình cùng bó hoa cưới trong khu vườn",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-bop_6359.webp",
      title: "Ánh Nhìn Dành Cho Nhau",
      desc: "Chú rể nhìn cô dâu dịu dàng trong bộ ảnh studio",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-bop_6391.webp",
      title: "Chúng Mình Của Hôm Nay",
      desc: "Chân dung toàn thân cô dâu và chú rể trong trang phục cưới",
      aspect: "tall",
    },
    {
      src: "/images/optimized/wedding-bop_6744.webp",
      title: "Trọn Vẹn Một Lời Yêu",
      desc: "Đôi mình bên nhau trong ánh sáng vàng ấm áp",
      aspect: "tall",
    },
  ];

  const content = {
    sub: "THƯ VIỆN ẢNH",
    title: "ALBUM ẢNH CƯỚI",
    centerQuote: "TRONG TỪNG KHOẢNH KHẮC",
    viewAll: "Xem thêm ảnh",
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + photos.length) % photos.length,
      );
    }
  };

  const handleSwipeEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const deltaX = event.changedTouches[0].screenX - touchStart.current.x;
    const deltaY = event.changedTouches[0].screenY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) handleNext();
    else handlePrev();
  };

  return (
    <section id="gallery" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B6F5D] font-medium block mb-2">
            {content.sub}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#3D3028] font-light">
            {content.title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-12 h-px bg-[#BCA89F] mx-auto mt-4"
          />
        </motion.div>

        {/* Responsive masonry album */}
        <div className="columns-2 gap-3 lg:columns-3 lg:gap-6">
          <div className="mb-3 inline-block w-full break-inside-avoid rounded-xl border border-[#D5C2B4] bg-[#FAF7F2] p-4 text-center shadow-xs lg:mb-6 lg:rounded-2xl lg:p-8">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#8B6F5D]">
              yêu thương
            </span>
            <h3 className="font-serif text-xl leading-tight text-[#3D3028]">
              {content.centerQuote}
            </h3>
            <div className="my-2">
              <FloralBranchDivider className="w-full h-auto" />
            </div>
            {/* <button
              type="button"
              onClick={() => setSelectedPhotoIndex(0)}
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B6F5D] hover:text-[#3D3028]"
            >
              <span>{content.viewAll}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button> */}
          </div>

          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: (index % 2) * 0.1 }}
              type="button"
              aria-label={`${content.viewAll}: ${photo.title}`}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`group relative mb-3 inline-block w-full break-inside-avoid overflow-hidden rounded-xl border border-[#D5C2B4]/80 bg-[#EFE8DF] text-left shadow-sm lg:mb-6 lg:rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D] ${photo.aspect === "wide" ? "aspect-[3/2]" : "aspect-[2/3]"}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-white">
                <span className="block font-serif text-sm leading-tight">
                  {photo.title}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={photos[selectedPhotoIndex].title}
            onTouchStart={(event) => {
              touchStart.current = {
                x: event.changedTouches[0].screenX,
                y: event.changedTouches[0].screenY,
              };
            }}
            onTouchEnd={handleSwipeEnd}
            className="fixed inset-0 z-50 flex touch-pan-y items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-2 right-2 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                aria-label={"Đóng ảnh"}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                aria-label={"Ảnh trước"}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                aria-label={"Ảnh sau"}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Active Image */}
              <div className="relative max-h-[75vh] w-auto overflow-hidden rounded-xl shadow-2xl">
                <motion.img
                  key={photos[selectedPhotoIndex].src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  src={photos[selectedPhotoIndex].src}
                  alt={photos[selectedPhotoIndex].title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                  decoding="async"
                />
              </div>

              {/* Caption & Counter */}
              <div className="text-center text-white mt-4 space-y-1">
                <p className="font-serif text-lg tracking-wide">
                  {photos[selectedPhotoIndex].title}
                </p>
                <p className="text-xs text-white/70 font-light">
                  {photos[selectedPhotoIndex].desc}
                </p>
                <p className="text-[11px] text-white/50 tracking-widest pt-1 tabular-nums">
                  {selectedPhotoIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
