import React, { useState } from "react";
import { app } from "../../../../firebase/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/authContext";

const InfoKelasCreate = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [linkPendaftaran, setLinkPendaftaran] = useState("");

  if (!userLoggedIn) {
    return <Navigate to="/loginadmin" replace />;
  }

  const saveData = async () => {
    const db = getFirestore(app);
    const infoKelasRef = collection(db, "infoKelas");
    const navigate = useNavigate();

    try {
      await addDoc(infoKelasRef, {
        title,
        description,
        schedule,
        linkPendaftaran,
        createdAt: Date.now(),
      });
      alert("Data disimpan!");
      navigate("/dashboardadmin");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleNavigate = () => {
    navigate("/dashboardadmin");
  };

  return (
    <div className="container mx-auto">
      <div className=" my-12">
        <div className="text-start">
          <button
            className=" text-primary hover:underline transition-all mb-6"
            onClick={handleNavigate}
          >
            <div className="flex justify-center gap-1 items-center">
              <img src="/icons/back-primary.svg" alt="back" className="h-4" />
              Kembali
            </div>
          </button>
        </div>
        <h2 className="text-center font-bold text-4xl">Tambah Kelas Baru</h2>
      </div>
      <div className="px-3 lg:px-0">
        <div className="bg-gray-100 rounded-lg shadow-lg ">
          <div className="flex flex-wrap justify-between mx-8 ">
            <div className="py-4 w-3/4">
              <div className="flex flex-col gap-2 ">
                <input
                  className="w-2/3 border-none focus:ring-0 rounded-md text-3xl font-bold text-gray-800"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul Kelas"
                />
                <input
                  className="border-none focus:ring-0 rounded-md text-gray-700"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi"
                />
                <input
                  className="w-1/2 border-none focus:ring-0 rounded-md text-sm italic text-gray-600"
                  type="text"
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Jadwal"
                />
              </div>
            </div>
            <div className="flex-col flex items-center justify-center ">
              <a
                href="#"
                className="mb-4 md:mr-0 lg:mr-0 rounded-lg shadow-md bg-primary text-white text-center self-center font-bold justify-center px-8 py-4 hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90"
              >
                <span>Gabung Sekarang</span>
              </a>
              <input
                className="border-none focus:ring-0 rounded-md text-sm text-gray-600"
                type="text"
                onChange={(e) => setLinkPendaftaran(e.target.value)}
                placeholder="Link Pendaftaran"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mt-6"
            onClick={saveData}
          >
            <div className="flex justify-center gap-1 items-center">
              <img src="/icons/save.svg" alt="save" className="h-6" />
              Simpan Kelas
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoKelasCreate;
