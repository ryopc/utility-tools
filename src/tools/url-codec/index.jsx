import { useState } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';
import CopyButton from '../../components/shared/CopyButton';
import { encodeUrl, decodeUrl } from './utils';

export default function UrlCodecTool() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError('');

    if (mode === 'encode') {
      const result = encodeUrl(value);
      setOutput(result || '');
    } else {
      if (!value.trim()) {
        setOutput('');
      } else {
        const result = decodeUrl(value);
        if (result === null) {
          setError('デコードに失敗しました。不正なURLエンコード形式です');
          setOutput('');
        } else {
          setOutput(result);
        }
      }
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput('');
    setOutput('');
    setError('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title="URL エンコード/デコード"
      description="テキストと URL エンコード形式を相互変換"
    >
      <div className="space-y-6">
        {/* モード切り替え */}
        <div className="flex gap-2">
          <button
            onClick={() => handleModeChange('encode')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            エンコード
          </button>
          <button
            onClick={() => handleModeChange('decode')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            デコード
          </button>
        </div>

        {/* 入力エリア */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            入力
          </label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'encode' ? 'テキストを入力...' : 'URLエンコードされた文字列を入力...'}
            className="w-full h-32 p-3 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* 出力エリア */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            出力
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-3 border border-slate-300 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* ボタングループ */}
        <div className="flex gap-2">
          {output && (
            <CopyButton text={output} label="結果をコピー" />
          )}
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
            💡 使用例
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>• クエリパラメータ用の文字列作成</li>
            <li>• URL内の日本語・特殊文字のエスケープ</li>
            <li>• 不正なURL形式の検証</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
