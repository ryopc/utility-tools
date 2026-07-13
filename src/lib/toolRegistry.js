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
  {
    id: "json-formatter",
    name: "JSON フォーマッター",
    category: "フォーマッタ",
    icon: "📋",
    description: "JSON の整形・圧縮・バリデーション",
    component: lazy(() => import("../tools/json-formatter")),
  },
  {
    id: "uuid-generator",
    name: "UUID ジェネレーター",
    category: "変換・生成",
    icon: "🎲",
    description: "UUID v4 / v1 を生成",
    component: lazy(() => import("../tools/uuid-generator")),
  },
  {
    id: "qr-generator",
    name: "QR コード生成",
    category: "変換・生成",
    icon: "📱",
    description: "テキスト/URL を QR コード化",
    component: lazy(() => import("../tools/qr-generator")),
  },
];

export const toolsByCategory = () => {
  const grouped = {};
  tools.forEach((tool) => {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  });
  return grouped;
};
