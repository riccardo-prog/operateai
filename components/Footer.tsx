export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] px-6 py-8">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <a href="#" aria-label="OperateAI home">
          <img src="/logo-full.png" alt="OperateAI" className="h-40 w-auto -my-12" />
        </a>
        <p className="text-sm text-[#64748B]">© 2026 OperateAI</p>
      </div>
    </footer>
  );
}
