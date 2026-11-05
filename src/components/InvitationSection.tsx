import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FloralCorner, FloralBranchDivider, MonogramHQ } from "./Decorations";
import { Calendar, Check, Copy, MapPin } from "lucide-react";

export function InvitationSection() {
  const [activeEvent, setActiveEvent] = useState<"wedding" | "vuQuy">("wedding");
  const [copiedAddress, setCopiedAddress] = useState(false);

  const content = {
    tagline: "LỜI MỜI TRANG TRỌNG",
    heading: "TRÂN TRỌNG KÍNH MỜI",
    subtext: "Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi",
    groom: "Hồng Quân",
    bride: "Thương Huyền",
    groomSide: "Đại diện Nhà Trai",
    brideSide: "Đại diện Nhà Gái",
    groomFather: "Ông Lý Văn Tuấn",
    groomMother: "Bà Nguyễn Thị Hạnh",
    brideFather: "Ông Nguyễn Văn Cường",
    brideMother: "Bà Đoàn Thị Thanh Nguyệt",
    groomAddress: "Số 25 - Ngõ 1 Phú Chung, Phường Phú Sơn, Thanh Hóa",
    brideAddress: "Tổ Ngân, Phường Bách Quang, Thái Nguyên",
    weddingTab: "Lễ thành hôn",
    vuQuyTab: "Nạp tài vu quy",
    weddingTitle: "LỄ THÀNH HÔN",
    vuQuyTitle: "NẠP TÀI VU QUY",
    month: "THÁNG MƯỜI MỘT",
    weddingWeekday: "THỨ HAI",
    weddingLunarDate: "Tức ngày 08 tháng 10 năm Bính Ngọ",
    at: "Vào lúc",
    groomVenue: "TƯ GIA NHÀ TRAI",
    brideVenue: "TƯ GIA NHÀ GÁI",
    directions: "Chỉ đường",
    copyAddress: "Sao chép",
    copiedAddress: "Đã sao chép",
    calendarBtn: "Lưu vào Lịch",
    calendarDesc:
      "Thêm ngày vui vào lịch điện thoại để nhận thông báo nhắc hẹn",
  };

  const isWedding = activeEvent === "wedding";
  const eventDirection = isWedding ? -1 : 1;
  const changeEvent = (nextEvent: "wedding" | "vuQuy") => {
    if (nextEvent !== activeEvent) setActiveEvent(nextEvent);
  };
  const event = {
    date: "16",
    title: isWedding ? content.weddingTitle : content.vuQuyTitle,
    weekday: content.weddingWeekday,
    lunarDate: content.weddingLunarDate,
    time: isWedding ? "14:00" : null,
    venue: isWedding ? content.groomVenue : content.brideVenue,
  };
  const address = isWedding
    ? "Số 25 - Ngõ 1 Phú Chung, Phường Phú Sơn, TP. Thanh Hóa"
    : content.brideAddress;
  const mapQuery = isWedding
    ? address
    : String.raw`21°30'29.9"N 105°52'41.1"E`;
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      setCopiedAddress(false);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      `${event.title} - Hồng Quân & Thương Huyền`,
    );
    const details = encodeURIComponent(
      `Hân hạnh đón tiếp quý khách tới tham dự ${event.title} của Hồng Quân & Thương Huyền${event.time ? ` lúc ${event.time}` : ""}.\nĐịa chỉ: ${address}`,
    );
    // Wedding uses a one-hour block; vu quy has no confirmed time, so add it as an all-day event.
    const dates = isWedding
      ? "20261116T070000Z/20261116T080000Z"
      : "20261116/20261117";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${encodeURIComponent(address)}`;
    window.open(googleCalUrl, "_blank");
  };

  return (
    <section id="invitation" className="py-20 bg-[#F4EFEB] relative">
      <div className="max-w-3xl mx-auto px-3 lg:px-6">
        {/* Main Invitation Card matching sketch 03 with transparent floral corners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF7F2] rounded-3xl p-3 lg:p-6 sm:p-12 md:p-16 shadow-xl border border-[#D5C2B4] overflow-hidden text-center"
        >
          {/* Prominent Transparent PNG Corner Florals matching sketch 03 in all 4 corners */}
          <FloralCorner
            position="top-left"
            className="absolute -top-2 -left-2 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 z-20 pointer-events-none drop-shadow-2xs"
          />
          <FloralCorner
            position="bottom-left"
            className="absolute -bottom-2 -left-2 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 z-20 pointer-events-none drop-shadow-2xs"
          />
          <FloralCorner
            position="top-right"
            className="absolute -top-2 -right-2 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 z-20 pointer-events-none drop-shadow-2xs"
          />
          <FloralCorner
            position="bottom-right"
            className="absolute -bottom-2 -right-2 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 z-20 pointer-events-none drop-shadow-2xs"
          />

          {/* Inner double border */}
          <div className="border border-[#BCA89F]/40 rounded-2xl p-4 sm:p-10 relative z-10 bg-white/50">
            {/* Wax Seal Monogram at top of invitation */}
            <div className="flex justify-center mb-4">
              <MonogramHQ className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-sm" />
            </div>

            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8B6F5D] font-medium mb-3">
              {content.tagline}
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#3D3028] font-normal mb-3"
            >
              {content.heading}
            </motion.h2>

            <p className="text-sm sm:text-base text-[#6E5343] font-light max-w-md mx-auto leading-relaxed mb-6">
              {content.subtext}
            </p>

            {/* Names in signature romantic script */}
            <div className="my-6">
              <span className="font-script text-5xl sm:text-6xl text-[#3D3028] block">
                {content.groom}
              </span>
              <span className="font-serif italic text-2xl text-[#8B6F5D] my-1 block font-light">
                &amp;
              </span>
              <span className="font-script text-5xl sm:text-6xl text-[#3D3028] block">
                {content.bride}
              </span>
            </div>

            {/* Delicate transparent PNG Floral Branch Divider matching sketch */}
            <div className="my-6 max-w-md mx-auto">
              <FloralBranchDivider className="w-full h-auto opacity-90" />
            </div>

            {/* Parents Information */}
            <div className="mx-auto flex max-w-xl flex-nowrap gap-2 border-t border-[#BCA89F]/20 pt-6 text-xs text-[#5A4537] sm:gap-6 sm:text-sm">
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium uppercase tracking-wider text-[#8B6F5D] text-[11px]">
                  {content.groomSide}
                </p>
                <p className="font-serif text-base text-[#3D3028]">
                  <span className="block whitespace-nowrap">{content.groomFather}</span>
                  <span className="block whitespace-nowrap">{content.groomMother}</span>
                </p>
                <p className="text-[11px] text-[#8B6F5D]">
                  {content.groomAddress}
                </p>
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium uppercase tracking-wider text-[#8B6F5D] text-[11px]">
                  {content.brideSide}
                </p>
                <p className="font-serif text-base text-[#3D3028]">
                  <span className="block whitespace-nowrap">{content.brideFather}</span>
                  <span className="block whitespace-nowrap">{content.brideMother}</span>
                </p>
                <p className="text-[11px] text-[#8B6F5D]">
                  {content.brideAddress}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-6">
              <div
                role="tablist"
                aria-label="Chọn sự kiện"
                className="mx-auto flex max-w-lg rounded-full border border-[#D5C2B4] bg-white/70 p-1"
              >
                <button
                  id="event-tab-wedding"
                  type="button"
                  role="tab"
                  aria-selected={isWedding}
                  aria-controls="invitation-event-panel"
                  tabIndex={isWedding ? 0 : -1}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      changeEvent("vuQuy");
                      document.getElementById("event-tab-vu-quy")?.focus();
                    }
                  }}
                  onClick={() => changeEvent("wedding")}
                  className={`min-h-11 flex-1 rounded-full px-2 text-sm font-serif italic transition-colors sm:px-3 sm:text-lg ${isWedding ? "bg-[#8B6F5D] text-white" : "text-[#6E5343] hover:bg-[#F4EFEB]"}`}
                >
                  {content.weddingTab}
                </button>
                <button
                  id="event-tab-vu-quy"
                  type="button"
                  role="tab"
                  aria-selected={!isWedding}
                  aria-controls="invitation-event-panel"
                  tabIndex={!isWedding ? 0 : -1}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      changeEvent("wedding");
                      document.getElementById("event-tab-wedding")?.focus();
                    }
                  }}
                  onClick={() => changeEvent("vuQuy")}
                  className={`min-h-11 flex-1 rounded-full px-2 text-sm font-serif italic transition-colors sm:px-3 sm:text-lg ${!isWedding ? "bg-[#8B6F5D] text-white" : "text-[#6E5343] hover:bg-[#F4EFEB]"}`}
                >
                  {content.vuQuyTab}
                </button>
              </div>

              <AnimatePresence
                mode="wait"
                initial={false}
                custom={eventDirection}
              >
                <motion.div
                  key={activeEvent}
                  custom={eventDirection}
                  variants={{
                    enter: (direction: number) => ({
                      opacity: 0,
                      x: direction * 24,
                    }),
                    center: { opacity: 1, x: 0 },
                    exit: (direction: number) => ({
                      opacity: 0,
                      x: direction * -24,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  id="invitation-event-panel"
                  role="tabpanel"
                  aria-labelledby={isWedding ? "event-tab-wedding" : "event-tab-vu-quy"}
                  className="mx-auto mt-6 max-w-md"
                >
                  <h3 className="font-serif text-xl tracking-[0.1em] text-[#3D3028] sm:text-3xl sm:tracking-[0.12em]">
                  {event.title}
                  {event.time && (
                    <span className="mt-1 block text-sm tracking-normal text-[#6E5343]">
                      {content.at} {event.time}
                    </span>
                  )}
                </h3>

                <div className="my-6 border-y border-[#D5C2B4]/30 py-6">
                  <p className="mb-2 text-center text-xs tracking-[0.2em] text-[#8B6F5D]">
                    {content.month}
                  </p>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-10 text-xs leading-none tracking-wider text-[#6E5343]">
                    <span className="">{event.weekday}</span>
                    <div
                      role="img"
                      aria-label={`${event.date} tháng 11 năm 2026`}
                      className="flex items-center justify-center gap-1 font-serif text-6xl leading-none text-[#3D3028] tabular-nums"
                    >
                      <span aria-hidden="true">1</span>
                      <span
                        className="relative h-[1em] w-[0.7em] [perspective:240px]"
                        aria-hidden="true"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={event.date[1]}
                            initial={{ rotateX: -90, y: 12, opacity: 0 }}
                            animate={{ rotateX: 0, y: 0, opacity: 1 }}
                            exit={{ rotateX: 90, y: -12, opacity: 0 }}
                            transition={{ duration: 0.32, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            {event.date[1]}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    </div>
                    <span className="ml-5 leading-none">2026</span>
                  </div>
                  <p className="mt-4 font-serif text-base italic text-[#8B6F5D]">
                    ({event.lunarDate})
                  </p>
                </div>

                <div className="space-y-2">
                  <MapPin
                    className="mx-auto h-4 w-4 text-[#8B6F5D]"
                    aria-hidden="true"
                  />
                  <p className="font-serif text-sm font-medium tracking-[0.15em] text-[#8B6F5D]">
                    {event.venue}
                  </p>
                  <p className="text-xs leading-relaxed text-[#6E5343]">
                    {address}
                  </p>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#8B6F5D] px-5 text-xs text-white transition-colors hover:bg-[#6E5343]"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {content.directions}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D5C2B4] px-5 text-xs text-[#6E5343] transition-colors hover:bg-[#F4EFEB]"
                  >
                    {copiedAddress ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copiedAddress
                      ? content.copiedAddress
                      : content.copyAddress}
                  </button>
                </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Calendar CTA */}
            <div className="mt-10 pt-2 flex flex-col items-center">
              <button
                onClick={handleAddToCalendar}
                className="group px-7 py-3 rounded-full bg-[#8B6F5D] hover:bg-[#6E5343] text-white text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{content.calendarBtn}</span>
              </button>
              <p className="text-[11px] text-[#8B6F5D] mt-2.5 font-light">
                {content.calendarDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
