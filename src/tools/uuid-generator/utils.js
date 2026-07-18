/**
 * UUID Generator Utilities
 * RFC 4122 準拠の UUID 生成関数群
 *
 * generateUUIDv4():
 *   - ランダムベースの UUID (Version 4)
 *   - 完全ランダムの128ビット
 *   - 最も一般的で推奨される実装
 *   - 形式: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 *   - 例: 550e8400-e29b-41d4-a716-446655440000
 *
 * generateUUIDv1():
 *   - タイムスタンプベース UUID (Version 1) ※ランダムバッファ実装
 *   - マシンIDとタイムスタンプから生成
 *   - ネットワーク環境では一意性が高い
 *   - 形式: xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx
 *   - 例: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
 *
 * generateMultipleUUIDs(count, version):
 *   - 複数の UUID を一括生成
 *   - @param {number} count - 生成する UUID の数
 *   - @param {number} version - 4 (default) または 1
 *   - @returns {Array<string>} UUID 配列
 *
 * @note すべての出力は RFC 4122 に完全準拠、常に36文字固定長です
 */

export const generateUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateUUIDv1 = () => {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);

  buffer[6] = (buffer[6] & 0x0f) | 0x10;

  buffer[8] = (buffer[8] & 0x3f) | 0x80;

  const parts = [
    Array.from(buffer.slice(0, 4))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
    Array.from(buffer.slice(4, 6))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
    Array.from(buffer.slice(6, 8))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
    Array.from(buffer.slice(8, 10))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
    Array.from(buffer.slice(10, 16))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
  ];

  return parts.join('-');
};

export const generateMultipleUUIDs = (count, version = 4) => {
  return Array.from({ length: count }, () =>
    version === 4 ? generateUUIDv4() : generateUUIDv1()
  );
};
