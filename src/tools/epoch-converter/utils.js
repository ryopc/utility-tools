export const epochToDate = (epoch) => {
  if (!epoch && epoch !== 0) return { date: '', iso: '', local: '', error: '値を入力してください' };
  const num = Number(epoch);
  if (isNaN(num)) return { date: '', iso: '', local: '', error: '不正な数値形式です' };
  const ms = num > 1e12 ? num : num * 1000;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return { date: '', iso: '', local: '', error: '無効な日時です' };
  return {
    date: d.toDateString(),
    iso: d.toISOString(),
    local: d.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
    error: ''
  };
};

export const dateToEpoch = (year, month, day, hour, minute, second) => {
  const d = new Date(year, month - 1, day, hour || 0, minute || 0, second || 0);
  if (isNaN(d.getTime())) return { ms: '', seconds: '', error: '無効な日時です' };
  return {
    ms: d.getTime().toString(),
    seconds: Math.floor(d.getTime() / 1000).toString(),
    error: ''
  };
};
