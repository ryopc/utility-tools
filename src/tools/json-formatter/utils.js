export const formatJSON = (json, spaces = 2) => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, spaces);
  } catch {
    return null;
  }
};

export const minifyJSON = (json) => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch {
    return null;
  }
};

export const validateJSON = (json) => {
  if (!json || !json.trim()) {
    return { valid: false, error: 'JSON を入力してください', line: null, column: null };
  }

  try {
    JSON.parse(json);
    return { valid: true, error: null, line: null, column: null };
  } catch (err) {
    const position = getErrorPosition(err.message);
    return { valid: false, error: err.message, ...position };
  }
};

const getErrorPosition = (message) => {
  // JSON.parse errors: "Unexpected token ... in JSON at position X"
  // or: "JSON.parse: expected ... at line X column Y ..."
  const posMatch = message.match(/position (\d+)/);
  const lineColMatch = message.match(/line (\d+) column (\d+)/);

  if (lineColMatch) {
    return {
      line: parseInt(lineColMatch[1], 10),
      column: parseInt(lineColMatch[2], 10),
    };
  }

  if (posMatch) {
    return {
      line: null,
      column: parseInt(posMatch[1], 10),
    };
  }

  return { line: null, column: null };
};

export const getLineFromPosition = (str, position) => {
  if (position === null || position === undefined) return null;
  const lines = str.substring(0, position).split('\n');
  return lines.length;
};

export const getLineContent = (str, lineNumber) => {
  if (!str || lineNumber === null || lineNumber === undefined) return '';
  const lines = str.split('\n');
  return lines[lineNumber - 1] || '';
};
