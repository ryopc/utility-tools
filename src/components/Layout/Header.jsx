import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
        Tool
      </h2>
      <ThemeToggle />
    </header>
  );
}
