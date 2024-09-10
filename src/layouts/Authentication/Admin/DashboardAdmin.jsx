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

  return (
    <div className="pt-20">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main Content */}
      <div className="text-center">
      <h1 className="lg:text-3xl text-2xl font-bold text-center lg:mt-20 lg:mb-20 my-10">
        <span className="">Dashboard Admin LPK Gokuryeo</span>
        </h1>
      </div>

      {/* Info Kelas Index */}
      <InfoKelasIndex />
      <GaleriAlumniIndex />
      
    </div>
  );
};

export default DashboardAdmin;
