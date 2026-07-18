import { useState, useEffect } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';
import CopyButton from '../../components/shared/CopyButton';
import { calculateHash } from './utils';

export default function HashGeneratorTool() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });

  useEffect(() => {
    const updateHashes = async () => {
      if (!input) {
        setHashes({
          'SHA-1': '',
          'SHA-256': '',
          'SHA-384': '',
          'SHA-512': '',
        });
        return;
      }

      const [sha1, sha256, sha384, sha512] = await Promise.all([
        calculateHash(input, 'SHA-1'),
        calculateHash(input, 'SHA-256'),
        calculateHash(input, 'SHA-384'),
        calculateHash(input, 'SHA-512'),
      ]);

      setHashes({
        'SHA-1': sha1,
        'SHA-256': sha256,
        'SHA-384': sha384,
        'SHA-512': sha512,
      });
    };

    const timer = setTimeout(updateHashes, 100);
    return () => clearTimeout(timer);
  }, [input]);

  const handleClear = () => {
    setInput('');
  };

  return (
    <ToolLayout
      title="ハッシュ生成"
      description="入力テキストから各種セキュアハッシュ（SHA-1, SHA-256, SHA-512など）を生成"
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
            placeholder="ハッシュを生成するテキストを入力してください..."
            className="w-full h-32 p-3 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 出力エリア */}
        <div className="space-y-4">
          {Object.entries(hashes).map(([algo, hashValue]) => (
            <div key={algo} className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{algo}</span>
                {hashValue && <CopyButton text={hashValue} label="コピー" />}
              </div>
              <div className="font-mono text-sm break-all text-slate-900 dark:text-slate-100 min-h-[1.5rem]">
                {hashValue || <span className="text-slate-400 dark:text-slate-500">入力待ち...</span>}
              </div>
            </div>
          ))}
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

        {/* 使用例 */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            💡 セキュアハッシュとは
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            入力データから一方向性の固定長データを生成するアルゴリズムです。Web Crypto APIを使用しているため、入力データが外部のサーバーに送信されることはなく、ブラウザ上で完全に安全に計算されます。
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
