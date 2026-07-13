export default function ToolLayout({ title, description, children }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}
