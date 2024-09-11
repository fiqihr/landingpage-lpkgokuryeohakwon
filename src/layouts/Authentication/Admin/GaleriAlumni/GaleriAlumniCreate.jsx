import React, { useState } from "react";
import { db, storage } from "../../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/authContext";

const GaleriAlumniCreate = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [newAlumni, setNewAlumni] = useState({
    name: "",
    age: "",
    description: "",
    image: null,
  });
  const [fileName, setFileName] = useState("");

  if (!userLoggedIn) {
    return <Navigate to="/loginadmin" replace />;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setNewAlumni({ ...newAlumni, image: file });
  };

  const handleAdd = async () => {
    if (newAlumni.image) {
      const storageRef = ref(storage, `alumni/${newAlumni.image.name}`);
      await uploadBytes(storageRef, newAlumni.image);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "alumni"), {
        name: newAlumni.name,
        age: newAlumni.age,
        description: newAlumni.description,
        imageUrl,
      });

      setNewAlumni({ name: "", age: "", description: "", image: null });
      alert("Alumni berhasil ditambahkan!");
      navigate("/dashboardadmin");
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
        <h2 className="text-center font-bold text-4xl">Tambah Alumni Baru</h2>
      </div>
      <div className="px-3 lg:px-0">
        <div className="bg-gray-100 rounded-lg shadow-lg ">
          <div className="flex flex-col md:flex-row">
            <div className="flex w-full md:w-1/2 mx-auto p-4">
              <div className="flex flex-col justify-center items-center space-x-4 mx-auto">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-primary hover:-translate-y-1 hover:shadow-md text-white py-2 px-4 rounded-md"
                >
                  Pilih Gambar
                </label>
                <span className="mt-3 text-sm">
                  {fileName || "Tidak ada file yang dipilih"}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex w-full md:w-1/2 mx-auto p-4">
              <div className="w-full p-4">
                <input
                  className="border-none w-full rounded-md text-3xl font-bold mb-4 text-gray-800"
                  type="text"
                  placeholder="Nama"
                  value={newAlumni.name}
                  onChange={(e) =>
                    setNewAlumni({ ...newAlumni, name: e.target.value })
                  }
                />
                <div className="w-full flex items-center">
                  <input
                    className="border-none rounded-md text-xl mb-4 text-gray-800 w-1/3"
                    type="number"
                    placeholder="Umur"
                    value={newAlumni.age}
                    onChange={(e) =>
                      setNewAlumni({ ...newAlumni, age: e.target.value })
                    }
                  />
                  <span className="ml-2 text-xl font-bold text-gray-700">
                    tahun
                  </span>
                </div>
                <textarea
                  className="border-none w-full h-56 rounded-md text-gray-800"
                  placeholder="Deskripsi"
                  value={newAlumni.description}
                  onChange={(e) =>
                    setNewAlumni({ ...newAlumni, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500  hover:-translate-y-1 transition-all hover:shadow-md text-white py-2 px-4 rounded-md"
            onClick={handleAdd}
          >
            <div className="flex justify-center gap-1 items-center">
              <img src="/icons/add.svg" alt="add" className="h-6" />
              Simpan Alumni Baru
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GaleriAlumniCreate;
