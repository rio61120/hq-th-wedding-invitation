import React from 'react';
import { motion } from 'motion/react';
import { BotanicalBlossom } from './Decorations';

export function StorySection() {
  const content = {
    sub: 'CÂU CHUYỆN TÌNH YÊU',
    title: 'CHUYỆN CHÚNG MÌNH',
    quote: 'Có những chuyện đẹp nhất là chuyện đi về chung một nhà.',
    paragraph1:
      'Từ những ngày đầu gặp gỡ ngập ngừng nơi quán cà phê nhỏ vào một chiều thu Hà Nội se lạnh, cho đến những chuyến hành trình rong ruổi khắp mọi miền đất nước cùng nhau.',
    paragraph2:
      'Tình yêu của chúng mình không ồn ào, mà êm đềm như dòng nước, lớn dần qua từng cái nắm tay, từng ánh mắt thấu hiểu và sự sẻ chia giản dị mỗi ngày.',
  };

  return (
    <section id="story" className="py-20 relative overflow-hidden bg-[#FAF7F2]">
      {/* Transparent PNG Botanical Blossom in corner matching sketch 04 */}
      <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 pointer-events-none z-10 select-none">
        <BotanicalBlossom className="w-full h-full transform rotate-12 drop-shadow-xs" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Arched Photo Collage with clean frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Main Arched Photo */}
              <div className="relative aspect-[4/5] rounded-t-[180px] rounded-b-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/images/optimized/wedding-10.webp"
                  alt="Hồng Quân và Thương Huyền trong bộ ảnh cưới"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative Text & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:pl-6 text-center lg:text-left mt-8 lg:mt-0"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B6F5D] font-medium block mb-2">
              {content.sub}
            </span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#3D3028] uppercase font-light mb-6">
              {content.title}
            </motion.h2>

            {/* Poetic Quote Highlight */}
            <blockquote className="font-serif text-xl sm:text-2xl text-[#3D3028] italic font-normal leading-relaxed mb-6 pl-4 border-l-2 border-[#BCA89F]">
              "{content.quote}"
            </blockquote>

            <p className="text-sm sm:text-base text-[#6E5343] font-light leading-relaxed mb-4">
              {content.paragraph1}
            </p>

            <p className="text-sm sm:text-base text-[#6E5343] font-light leading-relaxed mb-8">
              {content.paragraph2}
            </p>

          </motion.div>

        </div>
      </div>

    </section>
  );
}
