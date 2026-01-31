export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              CliperPro
            </h1>
          </div>
          <nav className="flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#resources"
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Resources
            </a>
            <button
              type="button"
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Start Learning
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
