const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why different', href: '#why-different' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg-canvas">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#home"
          className="flex items-center gap-2.5"
          aria-label="OperateAI Lead Engine, home"
        >
          <span className="font-body text-base font-semibold tracking-tight text-ink-primary">
            OperateAI
          </span>
          <span className="h-3.5 w-px bg-border-soft" aria-hidden="true" />
          <span className="font-body text-sm text-ink-secondary">Lead Engine</span>
        </a>

        <nav
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-10">
        <p className="text-xs text-ink-tertiary">
          &copy; 2026 OperateAI &middot; Based in Ontario, Canada
        </p>
      </div>
    </footer>
  );
}
