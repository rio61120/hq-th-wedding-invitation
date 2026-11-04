import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FloralCorner } from './Decorations';

interface Wish {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  avatarColor: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Nguyễn Thị Mai',
    content: 'Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long, mãi mãi thấu hiểu và yêu thương nhau như ngày đầu tiên! ♡',
    date: '14.10.2026',
    likes: 12,
    avatarColor: 'from-[#E2D5C8] to-[#C5A880]',
  },
  {
    id: '2',
    name: 'Trần Văn Hưng',
    content: 'Một khởi đầu thật đẹp! Chúc người anh em Hồng Quân rước được nàng thơ Thương Huyền về dinh vẹn tròn hạnh phúc.',
    date: '12.10.2026',
    likes: 8,
    avatarColor: 'from-[#D5C2B4] to-[#8B6F5D]',
  },
  {
    id: '3',
    name: 'Lê Thu Hà',
    content: 'Chúc mừng hai bạn! Cô dâu Huyền hôm nay xinh đẹp tuyệt trần. Chúc tổ ấm nhỏ luôn rộn rã tiếng cười vui!',
    date: '19.10.2026',
    likes: 15,
    avatarColor: 'from-[#FAF7F2] to-[#BCA89F]',
  },
];

export function GuestbookSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorWish, setAuthorWish] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isModalOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isModalOpen]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(DEFAULT_WISHES);
        localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(DEFAULT_WISHES));
      }
    } catch {
      setWishes(DEFAULT_WISHES);
    }
  }, []);

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    const updated = wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w));
    setWishes(updated);
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    try {
      localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorWish.trim()) return;

    const colors = [
      'from-[#E2D5C8] to-[#C5A880]',
      'from-[#D5C2B4] to-[#8B6F5D]',
      'from-[#FAF7F2] to-[#BCA89F]',
      'from-[#C8B6A6] to-[#A68A78]',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(
      now.getMonth() + 1
    ).padStart(2, '0')}.${now.getFullYear()}`;

    const newWishItem: Wish = {
      id: Date.now().toString(),
      name: authorName.trim(),
      content: authorWish.trim(),
      date: formattedDate,
      likes: 1,
      avatarColor: randomColor,
    };

    const nextList = [newWishItem, ...wishes];
    setWishes(nextList);
    setLikedMap((prev) => ({ ...prev, [newWishItem.id]: true }));
    try {
      localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(nextList));
    } catch {
      // ignore
    }

    setAuthorName('');
    setAuthorWish('');
    setIsModalOpen(false);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#A68A78', '#D5C2B4', '#8B6F5D'],
      });
    } catch {
      // ignore
    }
  };

  const content = {
    sub: 'LỜI CHÚC PHÚC',
    title: 'SỔ LỜI CHÚC',
    subtitle: 'Gửi những tâm tình và lời chúc ngọt ngào nhất tới đôi uyên ương',
    sendBtn: 'Gửi lời chúc',
    modalTitle: 'Gửi Lời Chúc Phúc',
    nameLabel: 'Tên của bạn',
    wishLabel: 'Lời chúc của bạn',
    wishPlaceholder: 'Viết lời chúc yêu thương gửi đến Hồng Quân & Thương Huyền...',
    submitBtn: 'Lưu lời chúc trên máy',
    localNotice: 'Lời chúc chỉ lưu trên trình duyệt này, chưa hiển thị với khách khác.',
  };

  return (
    <section id="guestbook" className="py-20 bg-[#FAF7F2] relative overflow-hidden">
      {/* Delicate floral corner decor at bottom-left */}
      <div className="absolute -bottom-6 -left-6 w-32 h-32 sm:w-44 sm:h-44 pointer-events-none select-none z-0">
        <FloralCorner position="bottom-left" className="w-full h-full opacity-80" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B6F5D] font-medium block mb-2">
            {content.sub}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.15em] text-[#3D3028] font-light">
            {content.title}
          </h2>
          <div className="w-12 h-px bg-[#BCA89F] mx-auto mt-4" />
        </div>

        {/* Wishes List */}
        <div className="space-y-4">
          {wishes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#F4EFEB]/80 hover:bg-[#F4EFEB] rounded-2xl p-5 sm:p-6 border border-[#D5C2B4]/60 transition-all shadow-2xs flex items-start gap-4"
            >
              {/* Circular Avatar */}
              <div
                className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.avatarColor} border border-white flex items-center justify-center shrink-0 shadow-xs text-[#5A4537] font-serif text-base font-semibold`}
              >
                {item.name.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif text-base text-[#3D3028] font-medium truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#A68A78] tabular-nums shrink-0 font-light">
                    {item.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#6E5343] font-light leading-relaxed">
                  {item.content}
                </p>

                <div className="flex items-center justify-end mt-2 pt-1">
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full transition-colors cursor-pointer ${
                      likedMap[item.id]
                        ? 'text-rose-600 bg-rose-50 font-medium'
                        : 'text-[#8B6F5D] hover:text-[#5A4537] hover:bg-black/5'
                    }`}
                  >
                    <Heart
                      className={`w-3 h-3 ${likedMap[item.id] ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                    <span className="tabular-nums">{item.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button: Gửi lời chúc */}
        <div className="text-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-full border border-[#8B6F5D] bg-[#FAF7F2] hover:bg-[#8B6F5D] text-[#5A4537] hover:text-white text-xs font-medium uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
          >
            {content.sendBtn}
          </button>
        </div>

      </div>

      {/* Guestbook Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div role="dialog" aria-modal="true" aria-label={content.modalTitle} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C2B4] p-6 sm:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#8B6F5D] hover:text-[#3D3028] rounded-full hover:bg-[#EFE8DF] transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B6F5D] font-medium">
                  {content.title}
                </span>
                <h3 className="font-serif text-2xl text-[#3D3028] mt-1 font-normal">
                  {content.modalTitle}
                </h3>
              </div>

              <form onSubmit={handleAddWish} className="space-y-4">
                <div>
                  <label htmlFor="guestbook-name" className="block text-xs font-medium uppercase tracking-wider text-[#6E5343] mb-1.5">
                    {content.nameLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="guestbook-name"
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Nguyễn Văn A..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C2B4] focus:outline-none focus:border-[#8B6F5D] text-xs sm:text-sm text-[#3D3028] placeholder:text-[#A68A78]/60 shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="guestbook-message" className="block text-xs font-medium uppercase tracking-wider text-[#6E5343] mb-1.5">
                    {content.wishLabel} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="guestbook-message"
                    rows={4}
                    required
                    value={authorWish}
                    onChange={(e) => setAuthorWish(e.target.value)}
                    placeholder={content.wishPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C2B4] focus:outline-none focus:border-[#8B6F5D] text-xs sm:text-sm text-[#3D3028] placeholder:text-[#A68A78]/60 resize-none shadow-2xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!authorName.trim() || !authorWish.trim()}
                    className="w-full py-3 px-6 rounded-xl bg-[#8B6F5D] hover:bg-[#6E5343] disabled:opacity-50 text-white text-xs font-medium uppercase tracking-widest shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{content.submitBtn}</span>
                  </button>
                </div>
                <p className="text-center text-[11px] leading-relaxed text-[#6E5343]">{content.localNotice}</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
