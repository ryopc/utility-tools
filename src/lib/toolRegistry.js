import { lazy } from 'react';

export const toolCategories = [
  "エンコーディング",
  "フォーマッタ",
  "変換・生成",
  "テキスト処理",
];

export const tools = [
  {
    id: "base64",
    name: "Base64 エンコード/デコード",
    category: "エンコーディング",
    icon: "📄",
    description: "テキストと Base64 形式を相互変換",
    component: lazy(() => import("../tools/base64")),
  },
  // Phase 2-B以降のツールをここに追加
];

export const toolsByCategory = () => {
  const grouped = {};
  tools.forEach((tool) => {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  });
  return grouped;
};
