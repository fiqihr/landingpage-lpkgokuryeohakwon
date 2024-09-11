import React, { useState, useEffect } from "react";
import { db, storage } from "../../../../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const GaleriAlumniIndex = () => {
  const [alumni, setAlumni] = useState([]);
  const [editAlumni, setEditAlumni] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumni = async () => {
      const querySnapshot = await getDocs(collection(db, "alumni"));
      const alumniData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlumni(alumniData);
    };
    fetchAlumni();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setEditAlumni({ ...editAlumni, image: file });
  };

  const handleUpdate = async (id) => {
    const docRef = doc(db, "alumni", id);
    const updatedData = {
      name: editAlumni.name,
      age: editAlumni.age,
      description: editAlumni.description,
    };

    if (editAlumni.image) {
      const storageRef = ref(storage, `alumni/${editAlumni.image.name}`);
      await uploadBytes(storageRef, editAlumni.image);
      const imageUrl = await getDownloadURL(storageRef);
      updatedData.imageUrl = imageUrl;
    }

    await updateDoc(docRef, updatedData);
    setEditAlumni(null);
    alert("Alumni berhasil di update!");
    window.location.reload();
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "alumni", id);
    await deleteDoc(docRef);
    alert("Alumni berhasil dihapus!");
    window.location.reload();
  };

  const handleNavigate = () => {
    navigate("/dashboardadmin/galerialumnicreate");
  };

  return (
    <div className="my-20 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Galeri Alumni</h1>
      <div className="text-start">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mb-6"
          onClick={handleNavigate}
        >
          <div className="flex justify-center gap-1 items-center">
            <img src="/icons/add.svg" alt="add" className="h-6" />
            Tambah Galeri Alumni
          </div>
        </button>
      </div>
      {alumni.map((al) => (
        <div key={al.id} className="mb-4">
          <div className="flex flex-col md:flex-row bg-gray-100 rounded-md p-4">
            <div className="flex w-full md:w-1/2 mx-auto">
              <div className="py-8 mx-auto">
                <img
                  className="max-h-72 rounded-md"
                  src={al.imageUrl}
                  alt={al.name}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col text-left justify-center p-4">
              <h4 className="text-3xl font-bold mb-4 text-gray-800">
                {al.name}
              </h4>
              <h4 className="text-xl font-bold mb-4 text-gray-800 italic">
                {al.age} <span>tahun</span>
              </h4>
              <p className="text-gray-700 text-sm">{al.description}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/2 flex justify-center gap-2 -translate-y-5">
              <button
                className="bg-amber-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                onClick={() => setEditAlumni(al)}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/edit.svg" alt="" className="h-6" />
                  Edit Data Alumni
                </div>
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                onClick={() => handleDelete(al.id)}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/delete.svg" alt="" className="h-6" />
                  Hapus Data Alumni
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}

      {editAlumni && (
        <div className="fixed top-8 left-0 w-full h-full  bg-opacity-50 flex justify-center items-center bg-white">
          <div className="bg-gray-100 w-3/4 rounded-lg shadow-lg ">
            <div className="flex flex-col md:flex-row">
              <div className="flex w-full md:w-1/2 mx-auto p-4">
                <div className="flex flex-col justify-center items-center space-x-4 mx-auto">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-primary hover:-translate-y-1 hover:shadow-md text-white py-2 px-4 rounded-md"
                  >
                    Ganti Gambar
                  </label>
                  <span className="mt-3 text-sm">
                    {fileName || "Tidak ada file yang dipilih"}
                  </span>
                  <p className="text-sm italic mt-8">* Klik tombol jika ingin mengubah gambar, jangan klik tombol jika tidak ingin mengubah gambar</p>
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
                    value={editAlumni.name}
                    onChange={(e) =>
                      setEditAlumni({ ...editAlumni, name: e.target.value })
                    }
                  />
                  <div className="w-full flex items-center">
                    <input
                      className="border-none rounded-md text-xl mb-4 text-gray-800 w-1/3"
                      type="number"
                      placeholder="Umur"
                      value={editAlumni.age}
                      onChange={(e) =>
                        setEditAlumni({ ...editAlumni, age: e.target.value })
                      }
                    />
                    <span className="ml-2 text-xl font-bold text-gray-700">
                      tahun
                    </span>
                  </div>
                  <textarea
                    className="border-none w-full h-56 rounded-md text-gray-800"
                    placeholder="Deskripsi"
                    value={editAlumni.description}
                    onChange={(e) =>
                      setEditAlumni({
                        ...editAlumni,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 my-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                onClick={() => handleUpdate(editAlumni.id)}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/update.svg" alt="" className="h-6" />
                  Update
                </div>
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                onClick={() => setEditAlumni(null)}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/cancel.svg" alt="" className="h-6" />
                  Batal
                </div>
              </button>
            </div>

            {/* <input
              type="text"
              placeholder="Nama"
              value={editAlumni.name}
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, name: e.target.value })
              }
              className="border rounded-md w-full mb-4 p-2"
            />
            <input
              type="number"
              placeholder="Umur"
              value={editAlumni.age}
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, age: e.target.value })
              }
              className="border rounded-md w-full mb-4 p-2"
            />
            <textarea
              placeholder="Deskripsi"
              value={editAlumni.description}
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, description: e.target.value })
              }
              className="border rounded-md w-full mb-4 p-2"
            />
            <input type="file" onChange={handleFileChange} className="mb-4" />
            {fileName && <p className="mb-4">Selected file: {fileName}</p>}
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                onClick={() => handleUpdate(editAlumni.id)}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all ml-2"
                onClick={() => setEditAlumni(null)}
              >
                Cancel
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriAlumniIndex;
