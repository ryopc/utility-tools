// Web Crypto APIを使ったハッシュ計算
export const calculateHash = async (text, algorithm) => {
  if (!text) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('Hash calculation failed:', error);
    return '計算エラーが発生しました';
  }
};
