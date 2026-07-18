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
    id: "url-codec",
    name: "URL エンコード/デコード",
    category: "エンコーディング",
    icon: "🔗",
    description: "テキストと URL エンコード形式を相互変換",
    component: lazy(() => import("../tools/url-codec")),
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
    id: "hash-generator",
    name: "ハッシュ生成 (SHA-1/256/384/512)",
    category: "変換・生成",
    icon: "🔐",
    description: "SHA-1, SHA-256, SHA-384, SHA-512 をブラウザ上で計算",
    component: lazy(() => import("../tools/hash-generator")),
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
  {
    id: "epoch-converter",
    name: "エポックタイム変換器",
    category: "変換・生成",
    icon: "🕐",
    description: "UNIXエポックタイムと日時形式を相互変換",
    component: lazy(() => import("../tools/epoch-converter")),
  },
  {
    id: "word-counter",
    name: "文字数カウンター",
    category: "テキスト処理",
    icon: "📝",
    description: "文字数・単語数・行数・バイト数をリアルタイムカウント",
    component: lazy(() => import("../tools/word-counter")),
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
