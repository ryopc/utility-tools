import { useState, useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import ToolLayout from '../../components/shared/ToolLayout';

const SIZE_OPTIONS = [
  { value: 'small', label: '小', size: 128 },
  { value: 'medium', label: '中', size: 256 },
  { value: 'large', label: '大', size: 384 },
];

const EC_OPTIONS = [
  { value: 'L', label: 'L（7%）' },
  { value: 'M', label: 'M（15%）' },
  { value: 'Q', label: 'Q（25%）' },
  { value: 'H', label: 'H（30%）' },
];

export default function QRGeneratorTool() {
  const [input, setInput] = useState('https://example.com');
  const [size, setSize] = useState('medium');
  const [errorCorrection, setErrorCorrection] = useState('M');
  const qrRef = useRef(null);

  const selectedSize = SIZE_OPTIONS.find((s) => s.value === size)?.size || 256;

  const handleDownload = useCallback(() => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    link.click();
  }, []);

  return (
    <ToolLayout
      title="QR コード生成"
      description="テキスト/URL を QR コードに変換"
    >
      <div className="space-y-6">
        {/* テキスト入力 */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            テキスト / URL
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="QRコード化するテキストを入力..."
            className="w-full h-24 p-3 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        {/* 設定グループ */}
        <div className="grid grid-cols-2 gap-4">
          {/* サイズ選択 */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              サイズ
            </label>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSize(value)}
                  className={`flex-1 px-3 py-2 rounded font-medium text-sm transition ${
                    size === value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 誤り訂正レベル */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              誤り訂正
            </label>
            <div className="flex gap-2">
              {EC_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setErrorCorrection(value)}
                  className={`flex-1 px-3 py-2 rounded font-medium text-sm transition ${
                    errorCorrection === value
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QR コード表示 */}
        <div className="flex justify-center p-6 bg-slate-50 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600">
          <div ref={qrRef} className="bg-white p-2 rounded">
            <QRCodeCanvas
              value={input || 'https://example.com'}
              size={selectedSize}
              level={errorCorrection}
              includeMargin={true}
            />
          </div>
        </div>

        {/* ダウンロードボタン */}
        <button
          onClick={handleDownload}
          disabled={!input.trim()}
          className="w-full px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          📥 PNG ダウンロード
        </button>

        {/* 使用例 */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            💡 使用例
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>• 店舗 / イベント案内 URL の QR コード化</li>
            <li>• 名刺・ポスターへの埋め込み</li>
            <li>• WiFi 接続情報の共有</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
