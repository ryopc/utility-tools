export const encodeUrl = (text) => {
  try {
    return encodeURIComponent(text);
  } catch (error) {
    return null;
  }
};

export const decodeUrl = (url) => {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    return null;
  }
};
