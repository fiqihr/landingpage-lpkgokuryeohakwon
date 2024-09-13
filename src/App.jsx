import GaleriAlumni from "./layouts/GaleriAlumni";
import InfoKelas from "./layouts/InfoKelas";
import InfoMasuk from "./layouts/InfoMasuk";
import Jumbotron from "./layouts/Jumbotron";
import LokasiKontak from "./layouts/LokasiKontak";
import { NavbarSimple } from "./layouts/Navbar";
import Programs from "./layouts/Programs";
import TentangKami from "./layouts/TentangKami";
import Footer from "./layouts/Footer";
import HubungiKami from "./layouts/HubungiKami";
import ScrollToHashElement from "./layouts/Components/Button/ScrollToHash";
import Artikel from "./layouts/Artikel";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-white h-20"></div>
      <ScrollToHashElement />
      <NavbarSimple />
      <Jumbotron />
      <TentangKami />
      {/* <Link to={"/artikel"}>Kunjungi berita terbaru kami</Link> */}
      <Artikel />
      <Programs />
      <InfoMasuk />
      <InfoKelas />
      <GaleriAlumni />
      <LokasiKontak />
      <HubungiKami />
      <Footer />
    </>
  );
}

export default App;
