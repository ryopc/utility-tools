import { useState, useEffect } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';
import CopyButton from '../../components/shared/CopyButton';
import { epochToDate, dateToEpoch } from './utils';

export default function EpochConverterTool() {
  const [epochInput, setEpochInput] = useState('');
  const [dateResult, setDateResult] = useState(null);
  const [currentEpoch, setCurrentEpoch] = useState('');

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());
  const [hour, setHour] = useState(now.getHours());
  const [minute, setMinute] = useState(now.getMinutes());
  const [second, setSecond] = useState(0);
  const [epochOut, setEpochOut] = useState({ ms: '', seconds: '' });

  useEffect(() => {
    setDateResult(epochToDate(epochInput));
  }, [epochInput]);

  useEffect(() => {
    setEpochOut(dateToEpoch(year, month, day, hour, minute, second));
  }, [year, month, day, hour, minute, second]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000).toString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNow = () => {
    const n = new Date();
    setYear(n.getFullYear());
    setMonth(n.getMonth() + 1);
    setDay(n.getDate());
    setHour(n.getHours());
    setMinute(n.getMinutes());
    setSecond(n.getSeconds());
  };

  return (
    <ToolLayout
      title="エポックタイム変換器"
      description="UNIXエポックタイム（UNIX時間）と日時形式を相互変換"
    >
      <div className="space-y-8">
        {/* 現在のエポックタイム表示 */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded text-center">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">現在のエポックタイム</div>
          <div className="font-mono text-lg font-bold text-blue-800 dark:text-blue-200">{currentEpoch}</div>
        </div>

        {/* Epoch → 日時 */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">エポックタイム → 日時</h3>
          <input
            type="text"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            placeholder="エポックタイム（秒またはミリ秒）を入力..."
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono mb-3"
          />
          {dateResult && !dateResult.error && (
            <div className="space-y-2 text-sm">
              {[
                { label: 'ISO 8601 (UTC)', value: dateResult.iso },
                { label: '日本時間 (JST)', value: dateResult.local },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 dark:text-slate-100">{value}</span>
                    <CopyButton text={value} label="" />
                  </span>
                </div>
              ))}
            </div>
          )}
          {dateResult?.error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded text-sm text-red-700 dark:text-red-300">
              {dateResult.error}
            </div>
          )}
        </div>

        {/* 日時 → Epoch */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">日時 → エポックタイム</h3>
          <div className="grid grid-cols-6 gap-2 mb-3">
            <div className="col-span-2">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">年</label>
              <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">月</label>
              <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">日</label>
              <input type="number" min="1" max="31" value={day} onChange={(e) => setDay(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">時</label>
              <input type="number" min="0" max="23" value={hour} onChange={(e) => setHour(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">分</label>
              <input type="number" min="0" max="59" value={minute} onChange={(e) => setMinute(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {epochOut.seconds && (
            <div className="space-y-2 text-sm">
              {[
                { label: 'ミリ秒 (ms)', value: epochOut.ms },
                { label: '秒 (s)', value: epochOut.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 dark:text-slate-100">{value}</span>
                    <CopyButton text={value} label="" />
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-2">
            <button
              onClick={handleNow}
              className="px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              現在時刻
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
