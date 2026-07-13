export const generateUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateUUIDv1 = () => {
  const now = Date.now();
  const random = Math.random().toString(16).slice(2);
  return [
    now.toString(16).slice(-8),
    '4',
    now.toString(16).slice(-4),
    ((0x8000 | (Math.random() * 0x4000)) | 0).toString(16),
    random.padEnd(12, '0'),
  ].join('-');
};

export const generateMultipleUUIDs = (count, version = 4) => {
  return Array.from({ length: count }, () =>
    version === 4 ? generateUUIDv4() : generateUUIDv1()
  );
};
