/**
 * Kartu resume dekoratif untuk sudut halaman Home.
 * Hubungkan ke file resume setelah PDF tersedia di folder public.
 */
export default function ResumeCard() {
  return (
    <div className="absolute bottom-[20%] right-5 z-30 flex flex-col items-center sm:bottom-[22%] sm:right-[22%]">
      <div className="relative flex rotate-[4deg] items-center gap-2 rounded-[9px] border-2 border-[#171638] bg-white px-2.5 py-2 shadow-[3px_5px_0_#171638] sm:gap-2.5 sm:px-3 sm:py-2.5">
        <span className="rounded-[4px] bg-[#f04e43] px-1 py-0.5 font-jetbrains text-[9px] font-bold leading-none text-white sm:text-[10px]">
          PDF
        </span>
        <span className="font-jetbrains text-[15px] font-bold tracking-[0.08em] text-[#171638] sm:text-[17px]">
          resume
        </span>
        <span className="grid size-7 place-items-center rounded-[6px] border border-[#171638] bg-[#18c7e8] text-[#171638] sm:size-8">
          <svg
            aria-hidden="true"
            className="size-4 sm:size-[18px]"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 2.75v9.5m0 0 3.5-3.5M10 12.25l-3.5-3.5M4 13.5v2.75h12V13.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-[2px] -top-[2px] size-4"
          viewBox="0 0 16 16"
        >
          <path d="M1 1h8l6 6H7a6 6 0 0 1-6-6Z" fill="#dce4f3" stroke="#171638" strokeWidth="1.5" />
          <path d="M8.5 1v5.5H15" fill="none" stroke="#171638" strokeWidth="1.2" />
        </svg>
      </div>

      <span className="just-me-again-down-here-regular mt-2 -rotate-[3deg] text-[18px] leading-none text-[#171638] sm:text-[20px]">
        one page, no fluff
      </span>
    </div>
  );
}
