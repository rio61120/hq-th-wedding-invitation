import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send } from "lucide-react";
import { BotanicalBlossom } from "./Decorations";

export function RsvpSection() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState("1");
  const [guestOf, setGuestOf] = useState<"groom" | "bride" | "both">("both");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#A68A78", "#D5C2B4", "#8B6F5D", "#E2D5C8", "#C5A880"],
        });
      } catch {
        // Fallback
      }

      // Save XÁC NHẬN THAM DỰ to localStorage
      try {
        const existing = JSON.parse(
          localStorage.getItem("wedding_rsvp_list") || "[]",
        );
        existing.push({
          name,
          attending,
          guestsCount: attending === "yes" ? guestsCount : "0",
          guestOf,
          message,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("wedding_rsvp_list", JSON.stringify(existing));
      } catch {
        // storage disabled fallback
      }
    }, 600);
  };

  const content = {
    sub: "XÁC NHẬN THAM DỰ",
    title: "XÁC NHẬN THAM DỰ",
    subtitle: "Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng tôi",
    attendingYes: "Tôi sẽ tham dự",
    attendingNo: "Rất tiếc, tôi không thể tham dự",
    nameLabel: "Họ và tên của bạn",
    namePlaceholder: "Nguyễn Văn A...",
    guestCountLabel: "Số người tham dự",
    guestOfLabel: "Bạn là khách mời của",
    guestGroom: "Nhà Trai",
    guestBride: "Nhà Gái",
    guestBoth: "Cả hai bạn",
    messageLabel: "Lời nhắn gửi chúc phúc",
    messagePlaceholder:
      "Gửi những lời chúc mừng yêu thương đến cô dâu & chú rể...",
    submitBtn: "Lưu xác nhận",
    submittingText: "Đang lưu...",
    successTitle: "Đã lưu phản hồi trên thiết bị này",
    successDescYes:
      "Chúng mình rất háo hức và mong chờ được đón tiếp bạn trong ngày trọng đại!",
    successDescNo:
      "Chúng mình rất tiếc vì bạn không thể tới dự, nhưng luôn biết ơn tình cảm và sự quan tâm ấm áp của bạn!",
    localNotice:
      "Phản hồi chỉ được lưu trong trình duyệt này, chưa gửi tới cô dâu chú rể.",
    sendAnother: "Gửi phản hồi khác",
  };

  return (
    <section id="rsvp" className="py-20 bg-[#F4EFEB] relative">
      <div className="max-w-2xl mx-auto px-6">
        {/* XÁC NHẬN THAM DỰ Card with clean, sharp design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#D5C2B4] relative overflow-hidden"
        >
          {/* Transparent PNG Botanical Blossom in bottom-right corner matching sketch 09 */}
          <div className="absolute top-0 left-0 rotate-45 w-44 h-44 sm:w-60 sm:h-60 pointer-events-none select-none z-0">
            <BotanicalBlossom className="w-full h-full transform -rotate-20 drop-shadow-xs" />
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            {/* <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B6F5D] font-medium block mb-1">
              {content.sub}
            </span> */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className=" text-xl sm:text-3xl text-[#8B6F5D] leading-none my-2 font-bold">
              {content.title}
            </motion.h2>
            <p className="text-xs sm:text-sm text-[#8B6F5D] font-light max-w-md mx-auto">
              {content.subtitle}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                {/* Radio Options: Attending Yes / No */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      attending === "yes"
                        ? "border-[#8B6F5D] bg-white text-[#3D3028] font-medium shadow-2xs ring-1 ring-[#8B6F5D]"
                        : "border-[#D5C2B4]/60 bg-white/50 text-[#6E5343] hover:border-[#BCA89F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === "yes"}
                      onChange={() => setAttending("yes")}
                      className="accent-[#8B6F5D] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">
                      {content.attendingYes}
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      attending === "no"
                        ? "border-[#8B6F5D] bg-white text-[#3D3028] font-medium shadow-2xs ring-1 ring-[#8B6F5D]"
                        : "border-[#D5C2B4]/60 bg-white/50 text-[#6E5343] hover:border-[#BCA89F]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                      className="accent-[#8B6F5D] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">
                      {content.attendingNo}
                    </span>
                  </label>
                </div>

                {/* Name Input */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block text-xs font-medium uppercase tracking-wider text-[#6E5343] mb-1.5"
                  >
                    {content.nameLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={content.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5C2B4] focus:outline-none focus:border-[#8B6F5D] focus:ring-1 focus:ring-[#8B6F5D] text-xs sm:text-sm text-[#3D3028] placeholder:text-[#A68A78]/60 transition-colors shadow-2xs"
                  />
                </div>

                {/* Guest Count (if attending) */}
                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div>
                      <label
                        htmlFor="rsvp-guests"
                        className="block text-xs font-medium uppercase tracking-wider text-[#6E5343] mb-1.5"
                      >
                        {content.guestCountLabel}
                      </label>
                      <select
                        id="rsvp-guests"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5C2B4] focus:outline-none focus:border-[#8B6F5D] text-xs sm:text-sm text-[#3D3028] transition-colors shadow-2xs cursor-pointer"
                      >
                        <option value="1">1 người</option>
                        <option value="2">2 người (+1 người đi cùng)</option>
                        <option value="3">3 người (Gia đình)</option>
                        <option value="4">4+ người</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="rsvp-guest-of"
                        className="block text-xs font-medium uppercase tracking-wider text-[#6E5343] mb-1.5"
                      >
                        {content.guestOfLabel}
                      </label>
                      <select
                        id="rsvp-guest-of"
                        value={guestOf}
                        onChange={(e) =>
                          setGuestOf(
                            e.target.value as "groom" | "bride" | "both",
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5C2B4] focus:outline-none focus:border-[#8B6F5D] text-xs sm:text-sm text-[#3D3028] transition-colors shadow-2xs cursor-pointer"
                      >
                        <option value="both">{content.guestBoth}</option>
                        <option value="groom">{content.guestGroom}</option>
                        <option value="bride">{content.guestBride}</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="block text-xs font-medium uppercase tracking-wider text-[#6E5343] mb-1.5"
                  >
                    {content.messageLabel}
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={content.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5C2B4] focus:outline-none focus:border-[#8B6F5D] focus:ring-1 focus:ring-[#8B6F5D] text-xs sm:text-sm text-[#3D3028] placeholder:text-[#A68A78]/60 resize-none transition-colors shadow-2xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#8B6F5D] hover:bg-[#6E5343] active:scale-[0.99] disabled:opacity-50 text-white text-xs sm:text-sm font-medium uppercase tracking-widest shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting ? content.submittingText : content.submitBtn}
                  </span>
                </button>
                <p className="text-center text-[11px] leading-relaxed text-[#6E5343]">
                  {content.localNotice}
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#EAE2D7] text-[#8B6F5D] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#3D3028]">
                  {content.successTitle}
                </h3>
                <p className="text-sm text-[#6E5343] font-light max-w-md mx-auto leading-relaxed">
                  {attending === "yes"
                    ? content.successDescYes
                    : content.successDescNo}
                </p>
                <p className="text-xs text-[#6E5343] max-w-md mx-auto">
                  {content.localNotice}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName("");
                      setMessage("");
                    }}
                    className="text-xs uppercase tracking-wider text-[#8B6F5D] underline underline-offset-4 hover:text-[#5A4537] cursor-pointer"
                  >
                    {content.sendAnother}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
