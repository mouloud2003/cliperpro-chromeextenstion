export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              CliperPro
            </h1>
          </div>
          <nav className="flex items-center space-x-8">
            <a
              href="#features"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
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
              className="rounded-md bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Learning
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
