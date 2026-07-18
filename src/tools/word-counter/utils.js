export const countText = (text) => {
  if (!text) {
    return {
      charWithSpaces: 0,
      charWithoutSpaces: 0,
      lines: 0,
      words: 0,
      bytes: 0
    };
  }

  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, '').length;
  const lines = text.split('\n').length;
  
  // 単語数カウント (連続する空白や改行で分割)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  
  // バイト数カウント (UTF-8)
  const bytes = new TextEncoder().encode(text).length;

  return {
    charWithSpaces,
    charWithoutSpaces,
    lines,
    words,
    bytes
  };
};
