import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggingIn) {
      setIsLoggingIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/dashboardadmin");
      } catch (error) {
        setErrorMessage("Login failed. Please check your credentials.");
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to={"/dashboardadmin"} replace={true} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12"
    >
      <div className="bg-gray-100 p-8 sm:p-10 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md">
        <img src="/images/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          Login Admin
        </h1>
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
        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}
        <div className="flex justify-center mt-8">
          <button
            className="bg-primary text-white p-2 rounded-md w-full sm:w-3/4 md:w-1/2 text-center"
            type="submit"
            disabled={isLoggingIn}
          >
            Login
          </button>
        </div>
        <p className="text-center mt-4 text-sm sm:text-base">
          Tambahkan admin baru?{" "}
          <Link
            className="text-primary font-bold hover:underline"
            to="/registeradmin"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginAdmin;
