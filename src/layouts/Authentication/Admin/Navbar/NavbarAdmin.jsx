import React from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../../../firebase/auth";
import { useAuth } from "../../../../contexts/authContext";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/loginadmin"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-gray-100 text-white py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Email Display */}
        <div>
          <p className="text-lg font-bold text-primary">Welcome, {currentUser?.email}</p>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
