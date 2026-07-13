export const encodeToBase64 = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    return null;
  }
};

export const decodeFromBase64 = (base64) => {
  try {
    return decodeURIComponent(escape(atob(base64)));
  } catch (error) {
    return null;
  }
};

export const isValidBase64 = (str) => {
  if (!str || typeof str !== 'string') return false;
  try {
    atob(str);
    return true;
  } catch {
    return false;
  }
};
