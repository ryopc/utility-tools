import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import App from "./App";
import { tools } from "./lib/toolRegistry";

// ローディングコンポーネント
const ToolLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400">Loading...</p>
    </div>
  </div>
);

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              左側のメニューからツールを選択してください
            </p>
          </div>
        ),
      },
      ...tools.map((tool) => ({
        path: `/tools/${tool.id}`,
        element: (
          <Suspense fallback={<ToolLoader />}>
            <tool.component />
          </Suspense>
        ),
      })),
    ],
  },
];

export const router = createBrowserRouter(routes);
