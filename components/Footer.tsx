export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] px-6 py-8">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <a
          href="#"
          className="font-display text-lg tracking-tight"
          aria-label="OperateAI home"
        >
          <span className="text-[#F1F5F9]">Operate</span>
          <span className="text-[#38BDF8]">AI</span>
        </a>
        <p className="text-sm text-[#64748B]">Toronto, Ontario · © 2026</p>
      </div>
    </footer>
  );
}
