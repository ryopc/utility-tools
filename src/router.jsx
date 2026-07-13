import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { tools } from "./lib/toolRegistry";

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
        element: <tool.component />,
      })),
    ],
  },
];

export const router = createBrowserRouter(routes);
