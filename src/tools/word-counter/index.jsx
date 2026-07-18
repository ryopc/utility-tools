import { useState, useEffect } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';
import { countText } from './utils';

export default function WordCounterTool() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState({
    charWithSpaces: 0,
    charWithoutSpaces: 0,
    lines: 0,
    words: 0,
    bytes: 0
  });

  useEffect(() => {
    setStats(countText(input));
  }, [input]);

  const handleClear = () => {
    setInput('');
  };

  return (
    <ToolLayout
      title="文字数カウンター"
      description="リアルタイムで文字数、スペースなし文字数、単語数、行数、バイト数をカウント"
    >
      <div className="space-y-6">
        {/* 入力エリア */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            入力テキスト
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ここにテキストを入力またはペーストしてください..."
            className="w-full h-48 p-3 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* カウント表示 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800/50 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">文字数 (空白含む)</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{stats.charWithSpaces}</div>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800/50 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">文字数 (空白除く)</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{stats.charWithoutSpaces}</div>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800/50 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">単語数</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{stats.words}</div>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800/50 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">行数</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{stats.lines}</div>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800/50 text-center col-span-2 md:col-span-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">バイト数 (UTF-8)</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{stats.bytes}</div>
          </div>
        </div>

        {/* ボタングループ */}
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded text-sm font-medium bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            クリア
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
