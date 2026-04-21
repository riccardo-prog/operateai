

export default function Footer() {
  return (
    <footer className="relative border-t px-6 md:px-8 py-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.4) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Wordmark */}
        <div className="flex items-center">
          <span className="font-body text-base font-semibold tracking-tight">
            <span className="text-text-primary">Operate</span>
            <span className="text-accent">AI</span>
          </span>
        </div>

        {/* Center - copyright + built with */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[11px] text-text-muted tracking-[0.04em]">
            &copy; 2026 OperateAI &middot; Based in Ontario, Canada
          </span>
          <span className="font-mono text-[10px] text-text-muted/50 tracking-[0.04em]">
            Built with Lead Engine
          </span>
        </div>

        {/* Privacy link */}
        <a
          href="#"
          className="font-mono text-[11px] text-text-muted tracking-[0.04em] hover:text-text-secondary transition-colors"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
