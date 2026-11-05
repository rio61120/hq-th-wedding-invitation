import React from "react";
import { motion } from "motion/react";
import { FloralBranchDivider } from "./Decorations";

const giftQrs = [
  {
    title: "Chú Rể: Hồng Quân",
    src: "/QRs/chu_re_QR.jpg",
    alt: "Mã QR mừng cưới chú rể Hồng Quân",
  },
  {
    title: "Cô Dâu: Thương Huyền",
    src: "/QRs/co_dau_QR.jpg",
    alt: "Mã QR mừng cưới cô dâu Thương Huyền",
  },
];

export function GiftQrSection() {
  return (
    <section id="gift" className="relative bg-[#F4EFEB] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center sm:mb-12"
        >
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.3em] text-[#8B6F5D]">
            Hộp mừng cưới
          </span>
          <h2 className="font-serif text-3xl font-light tracking-[0.12em] text-[#3D3028] sm:text-4xl">
            Gửi lời chúc yêu thương
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-[#6E5343] sm:text-base">
            Sự hiện diện và lời chúc phúc của bạn là món quà ý nghĩa nhất. Nếu
            muốn gửi lời chúc từ xa, bạn có thể quét mã QR bên dưới.
          </p>
          <FloralBranchDivider className="mx-auto mt-5 w-40 opacity-80" />
        </motion.header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {giftQrs.map((qr, index) => (
            <motion.article
              key={qr.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.12 }}
              className="rounded-3xl border border-[#D5C2B4] bg-[#FAF7F2] p-4 shadow-sm sm:p-6"
            >
              <h3 className="mb-4 text-center font-serif text-lg text-[#5A4537] sm:text-xl">
                {qr.title}
              </h3>
              <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-[#EEE5DC] bg-white p-2">
                <img
                  src={qr.src}
                  alt={qr.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                />
              </div>
              <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#A68A78]">
                Quét mã để gửi lời chúc
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
