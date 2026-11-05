'use client';

import { type FormEvent, useState } from 'react';
import { Check, Copy, Link2, Sparkles } from 'lucide-react';
import { FloralBranchDivider, MonogramHQ } from '../../src/components/Decorations';

export default function CreateInvitationPage() {
  const [guestName, setGuestName] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const createLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = guestName.trim();
    if (!name) return;

    const url = new URL('/', window.location.origin);
    url.searchParams.set('for', name);
    setInvitationLink(url.toString());
    setCopyMessage('');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopyMessage('Đã sao chép đường dẫn');
    } catch {
      setCopyMessage('Không thể sao chép. Vui lòng chọn và sao chép đường dẫn.');
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF7F2] px-4 py-10 text-[#3D3028]">
      <section className="w-full max-w-xl rounded-3xl border border-[#D5C2B4] bg-white/75 px-6 py-8 text-center shadow-[0_18px_60px_rgba(91,66,49,0.12)] backdrop-blur-sm sm:px-12 sm:py-12">
        <MonogramHQ className="mx-auto mb-4 h-14 w-14" />
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#8B6F5D]">
          Hồng Quân &amp; Thương Huyền
        </p>
        <h1 className="font-serif text-3xl font-light tracking-wide sm:text-4xl">
          Tạo thiệp mời
        </h1>
        <FloralBranchDivider className="mx-auto mt-4 w-48 opacity-90" />
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#6E5343] sm:text-base">
          Nhập tên khách mời để tạo đường dẫn thiệp cưới cá nhân.
        </p>

        <form className="mt-8 text-left" onSubmit={createLink}>
          <label htmlFor="guest-name" className="mb-2 block text-sm font-medium text-[#5A4537]">
            Tên người được mời
          </label>
          <input
            id="guest-name"
            type="text"
            autoComplete="name"
            required
            value={guestName}
            onChange={(event) => {
              setGuestName(event.target.value);
              setInvitationLink('');
              setCopyMessage('');
            }}
            placeholder="Ví dụ: Gia đình Anh Minh"
            className="min-h-12 w-full rounded-xl border border-[#CDB9AC] bg-[#FFFCF8] px-4 text-base outline-none transition placeholder:text-[#A89589] focus:border-[#8B6F5D] focus:ring-2 focus:ring-[#8B6F5D]/15"
          />
          <button
            type="submit"
            disabled={!guestName.trim()}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8B6F5D] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#745744] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Tạo đường dẫn
          </button>
        </form>

        {invitationLink && (
          <div className="mt-6 rounded-2xl border border-[#D5C2B4] bg-[#F4EFEB] p-4 text-left sm:p-5">
            <label htmlFor="invitation-link" className="mb-2 block text-sm font-medium text-[#5A4537]">
              Đường dẫn thiệp mời
            </label>
            <div className="flex items-stretch gap-2">
              <input
                id="invitation-link"
                readOnly
                value={invitationLink}
                onFocus={(event) => event.currentTarget.select()}
                className="min-w-0 flex-1 rounded-lg border border-[#D5C2B4] bg-white px-3 py-2 text-sm text-[#3D3028] outline-none"
              />
              <button
                type="button"
                onClick={copyLink}
                aria-label="Sao chép đường dẫn thiệp mời"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#8B6F5D] px-3 text-sm font-medium text-white transition hover:bg-[#745744] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6F5D] sm:px-4"
              >
                {copyMessage === 'Đã sao chép đường dẫn' ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                <span className="hidden sm:inline">Sao chép</span>
              </button>
            </div>
            <a
              href={invitationLink}
              className="mt-2 inline-flex items-center gap-1 text-xs text-[#8B6F5D] underline underline-offset-2"
            >
              <Link2 aria-hidden="true" className="h-3 w-3" />
              Mở thử thiệp
            </a>
            {copyMessage && (
              <p className="mt-2 text-xs text-[#6E5343]" role="status">
                {copyMessage}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
