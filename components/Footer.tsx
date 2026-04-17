import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 md:px-8 py-8 bg-[rgba(11,15,26,0.6)] backdrop-blur-xl">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-symbol.png" alt="" width={22} height={22} className="rounded-sm" aria-hidden="true" />
          <span className="font-display text-base font-semibold tracking-tight">
            <span className="text-text-primary">Operate</span><span className="text-accent">AI</span>
          </span>
        </div>
        <span className="font-mono text-xs text-text-muted">
          &copy; 2026 OperateAI &middot; Based in Ontario, Canada.
        </span>
      </div>
    </footer>
  );
}
