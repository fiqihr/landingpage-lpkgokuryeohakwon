import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { doSignOut } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import InfoKelasIndex from "./InfoKelas/InfoKelasIndex";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import GaleriAlumniIndex from "./GaleriAlumni/GaleriAlumniIndex";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/loginadmin" replace />;
  }

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="pt-20">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main Content */}
      <div className="text-start container mx-auto mb-20">
        <div className="text-center">
          <h1 className="lg:text-3xl text-2xl font-bold text-center mt-10">
            <span className="">Dashboard Admin LPK Gokuryeo</span>
          </h1>
        </div>
      </div>
      {/* Info Kelas Index */}
      <InfoKelasIndex />
      <GaleriAlumniIndex />
      <button
        className="fixed bottom-8 right-8 text-primary hover:underline transition-all text-base font-bold bg-opacity-50 bg-white px-4 py-2 rounded-lg shadow-md"
        onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
      >
        <div className="flex justify-center gap-1 items-center">
          Lihat Website
          <img src="/icons/look-website.svg" alt="back" className="h-6" />
        </div>
      </button>
    </div>
  );
};

export default DashboardAdmin;
