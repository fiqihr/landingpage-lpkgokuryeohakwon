import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import programsData from "./data/ProgramsData.jsx";
import DashboardAdmin from "./layouts/Authentication/Admin/DashboardAdmin.jsx";
import LoginAdmin from "./layouts/Authentication/LoginAdmin.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import RegisterAdmin from "./layouts/Authentication/RegisterAdmin.jsx";
import InfoKelasCreate from "./layouts/Authentication/Admin/InfoKelas/InfoKelasCreate.jsx";
import GaleriAlumniCreate from "./layouts/Authentication/Admin/GaleriAlumni/GaleriAlumniCreate.jsx";
import ArtikelCreate from "./layouts/Authentication/Admin/Artikel/ArtikelCreate.jsx";
import ArtikelShow from "./layouts/Authentication/Admin/Artikel/ArtikelShow.jsx";
import Artikel from "./layouts/Artikel.jsx";
import SemuaArtikel from "./pages/SemuaArtikel.jsx";
import ArtikelTampil from "./pages/ArtikelTampil.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:title",
    element: <DetailPage data={programsData} />,
  },
  {
    path: "/semua-artikel",
    element: <SemuaArtikel />,
  },
  {
    path: "/artikelshow/:id",
    element: <ArtikelTampil />,
  },
  {
    path: "/loginadmin",
    element: (
      <AuthProvider>
        <LoginAdmin />
      </AuthProvider>
    ),
  },
  {
    path: "/registeradmin",
    element: (
      <AuthProvider>
        <RegisterAdmin />
      </AuthProvider>
    ),
  },
  {
    path: "/dashboardadmin",
    element: (
      <AuthProvider>
        <DashboardAdmin />
      </AuthProvider>
    ),
  },
  {
    path: "dashboardadmin/infokelascreate",
    element: (
      <AuthProvider>
        <InfoKelasCreate />,
      </AuthProvider>
    ),
  },
  {
    path: "dashboardadmin/galerialumnicreate",
    element: (
      <AuthProvider>
        <GaleriAlumniCreate />,
      </AuthProvider>
    ),
  },
  {
    path: "dashboardadmin/artikelcreate",
    element: (
      <AuthProvider>
        <ArtikelCreate />,
      </AuthProvider>
    ),
  },
  {
    path: "dashboardadmin/artikelshow/:id",
    element: (
      <AuthProvider>
        <ArtikelShow />,
      </AuthProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
