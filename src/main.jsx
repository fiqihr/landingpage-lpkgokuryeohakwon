import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import programsData from "./data/ProgramsData.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/program",
    element: <div className="">ini program</div>,
  },
  {
    path: "/:title",
    element: <DetailPage data={programsData} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
