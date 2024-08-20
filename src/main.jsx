import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Jumbotron from "./layouts/Jumbotron.jsx";
import Programs from "./layouts/Programs.jsx";
import GaleriAlumni from "./layouts/GaleriAlumni.jsx";
import InfoKelas from "./layouts/InfoKelas.jsx";
import LokasiKontak from "./layouts/LokasiKontak.jsx";
import NavbarSimple from "./layouts/Navbar.jsx";
import Footer from "./layouts/Footer.jsx";
import InfoMasuk from "./layouts/InfoMasuk.jsx";
import TentangKami from "./layouts/TentangKami.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <div className="bg-white h-20"></div>
      <NavbarSimple />
      <Jumbotron />
      <TentangKami />
      <Programs />
      <InfoMasuk />
      <InfoKelas />
      <GaleriAlumni />
      <LokasiKontak />
      <Footer />
    </>
  </StrictMode>
);
