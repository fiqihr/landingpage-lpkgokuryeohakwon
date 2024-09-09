import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/dashboardadmin");
      } catch (error) {
        setErrorMessage("Pendaftaran gagal. Periksa kredensial Anda.");
      } finally {
        setIsRegistering(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to={"/dashboardadmin"} replace={true} />;
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12"
      >
        <div className="bg-gray-100 p-8 sm:p-10 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">
            Register Admin
          </h1>
          <p className="text-gray-700 mb-4 text-center text-sm sm:text-base">
            Silahkan masukkan data untuk menjadi admin baru
          </p>
          <input
            placeholder="Masukkan Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            placeholder="Masukkan Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            placeholder="Konfirmasi Password"
            type="password"
            autoComplete="current-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
          <div className="flex justify-center mt-8">
            <button
              className="bg-primary text-white p-2 rounded-md w-full sm:w-3/4 md:w-1/2 text-center"
              type="submit"
              disabled={isRegistering}
            >
              Register
            </button>
          </div>
          <p className="text-center mt-4 text-sm sm:text-base">
            Sudah memiliki akun?{" "}
            <Link
              className="text-primary font-bold hover:underline"
              to="/loginadmin"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterAdmin;
