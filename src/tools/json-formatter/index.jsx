import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';
import CopyButton from '../../components/shared/CopyButton';
import { formatJSON, minifyJSON, validateJSON, getLineFromPosition, getLineContent } from './utils';

const INDENT_OPTIONS = [
  { value: 2, label: '2 spaces' },
  { value: 4, label: '4 spaces' },
  { value: 8, label: '8 spaces' },
];

export default function JSONFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInput(value);
    setError(null);
    setValidationResult(null);
    setOutput('');
  }, []);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError('JSON を入力してください');
      setOutput('');
      setValidationResult(null);
      return;
    }

    setValidationResult(null);
    const result = formatJSON(input, indent);
    if (result === null) {
      const validation = validateJSON(input);
      setValidationResult(validation);
      setError(validation.error);
      setOutput('');
    } else {
      setError(null);
      setOutput(result);
    }
  }, [input, indent]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setError('JSON を入力してください');
      setOutput('');
      setValidationResult(null);
      return;
    }

    setValidationResult(null);
    const result = minifyJSON(input);
    if (result === null) {
      const validation = validateJSON(input);
      setValidationResult(validation);
      setError(validation.error);
      setOutput('');
    } else {
      setError(null);
      setOutput(result);
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    const result = validateJSON(input);
    setValidationResult(result);
    if (!result.valid) {
      setError(result.error);
      setOutput('');
    } else {
      setError(null);
      setOutput(input);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setValidationResult(null);
  }, []);

  const errorLineInfo = useMemo(() => {
    if (!validationResult || validationResult.valid) return null;

    let line = validationResult.line;
    if (line === null && validationResult.column !== null) {
      line = getLineFromPosition(input, validationResult.column);
    }

    if (line !== null) {
      const content = getLineContent(input, line);
      return { line, content };
    }
    return null;
  }, [validationResult, input]);

  const isInputEmpty = !input.trim();

  return (
    <ToolLayout
      title="JSON フォーマッター"
      description="JSON の整形・圧縮・バリデーション"
    >
      <div className="space-y-5">
        {/* インデント設定 */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            インデント
          </label>
          <div className="flex gap-2">
            {INDENT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setIndent(value)}
                className={`px-4 py-2 rounded font-medium text-sm transition ${
                  indent === value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 入力エリア */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            入力
          </label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder='{"key": "value"}'
            spellCheck={false}
            className="w-full h-40 p-3 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        {/* アクションボタン */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFormat}
            disabled={isInputEmpty}
            className="px-5 py-2 rounded font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            整形 (Format)
          </button>
          <button
            onClick={handleMinify}
            disabled={isInputEmpty}
            className="px-5 py-2 rounded font-medium text-sm bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            圧縮 (Minify)
          </button>
          <button
            onClick={handleValidate}
            disabled={isInputEmpty}
            className="px-5 py-2 rounded font-medium text-sm bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            バリデーション
          </button>
          <button
            onClick={handleClear}
            className="px-5 py-2 rounded font-medium text-sm bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            クリア
          </button>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded">
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">⚠️</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  JSON パースエラー
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 break-all">
                  {error}
                </p>
                {errorLineInfo && (
                  <div className="mt-2 p-2 bg-red-100/50 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800 font-mono text-xs text-red-700 dark:text-red-300">
                    <p className="mb-1">
                      <span className="font-semibold">Line {errorLineInfo.line}:</span>
                    </p>
                    <pre className="whitespace-pre-wrap break-all">{errorLineInfo.content}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* バリデーション成功表示 */}
        {validationResult?.valid && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 rounded">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                有効な JSON です
              </p>
            </div>
          </div>
        )}

        {/* 出力エリア */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            出力
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              spellCheck={false}
              placeholder="結果がここに表示されます"
              className="w-full h-40 p-3 border border-slate-300 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 font-mono text-sm focus:outline-none resize-y"
            />
            {output && (
              <div className="absolute top-2 right-2">
                <CopyButton text={output} label="コピー" />
              </div>
            )}
          </div>
        </div>

        {/* 統計情報 */}
        {output && (
          <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>文字数: {output.length}</span>
            <span>行数: {output.split('\n').length}</span>
          </div>
        )}

        {/* 使用例 */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            💡 使用例
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>• API レスポンスの整形と確認</li>
            <li>• 設定ファイル (JSON) のフォーマット</li>
            <li>• ログ JSON のバリデーション</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
