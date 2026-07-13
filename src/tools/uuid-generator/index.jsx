import { useState, useCallback } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';
import CopyButton from '../../components/shared/CopyButton';
import { generateMultipleUUIDs } from './utils';

export default function UUIDGeneratorTool() {
  const [version, setVersion] = useState('v4');
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);

  const handleGenerate = useCallback(() => {
    const generated = generateMultipleUUIDs(count, version === 'v4' ? 4 : 1);
    setUuids(generated);
  }, [count, version]);

  const handleCountChange = useCallback((e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setCount(1);
    } else {
      setCount(Math.max(1, Math.min(100, val)));
    }
  }, []);

  const handleClear = useCallback(() => {
    setUuids([]);
    setCount(1);
  }, []);

  return (
    <ToolLayout
      title="UUID ジェネレーター"
      description="UUID v4 / v1 を生成"
    >
      <div className="space-y-6">
        {/* Version 選択 */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            バージョン
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setVersion('v4')}
              className={`px-4 py-2 rounded font-medium transition ${
                version === 'v4'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              UUID v4
            </button>
            <button
              onClick={() => setVersion('v1')}
              className={`px-4 py-2 rounded font-medium transition ${
                version === 'v1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              UUID v1
            </button>
          </div>
        </div>

        {/* 生成数入力 */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            生成数（1〜100）
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={handleCountChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 生成ボタン */}
        <button
          onClick={handleGenerate}
          className="w-full px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          生成する
        </button>

        {/* UUID リスト */}
        {uuids.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              生成済み UUID（{uuids.length}個）
            </label>
            <div className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded p-4 max-h-64 overflow-y-auto font-mono text-sm space-y-1">
              {uuids.map((uuid, idx) => (
                <div
                  key={idx}
                  className="text-slate-900 dark:text-white break-all select-all cursor-text hover:bg-slate-100 dark:hover:bg-slate-600 rounded px-1 transition"
                >
                  {uuid}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ボタングループ */}
        {uuids.length > 0 && (
          <div className="flex gap-2">
            <CopyButton text={uuids.join('\n')} label="すべてコピー" />
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded text-sm font-medium bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
            >
              クリア
            </button>
          </div>
        )}

        {/* 使用例 */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            💡 使用例
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>• データベース主キー / ID 発行</li>
            <li>• API リソース識別子の生成</li>
            <li>• セッション・トークンの生成</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
