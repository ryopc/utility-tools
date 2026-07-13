import { startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toolsByCategory } from "../../lib/toolRegistry";

export default function Sidebar() {
  const navigate = useNavigate();
  const categorized = toolsByCategory();
  const hasTools = Object.values(categorized).some((tools) => tools.length > 0);

  const handleNav = (e, path) => {
    // Don't intercept modifier clicks (open in new tab)
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          ⚙️ util
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          tools
        </p>
      </div>

      {!hasTools ? (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <p>ツール準備中...</p>
        </div>
      ) : (
        Object.entries(categorized).map(([category, toolList]) => (
          <div key={category} className="mb-6">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              {category}
            </h2>
            <nav className="space-y-1">
              {toolList.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.id}`}
                  onClick={(e) => handleNav(e, `/tools/${tool.id}`)}
                  className="block px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  {tool.name}
                </Link>
              ))}
            </nav>
          </div>
        ))
      )}
    </aside>
  );
}
