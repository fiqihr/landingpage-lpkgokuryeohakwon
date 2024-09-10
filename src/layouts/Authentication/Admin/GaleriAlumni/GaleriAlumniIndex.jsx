import React, { useState, useEffect } from "react";
import { db, storage } from "../../../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const GaleriAlumniIndex = () => {
  const [alumni, setAlumni] = useState([]);
  const [fileName, setFileName] = useState("");

  const [newAlumni, setNewAlumni] = useState({
    name: "",
    age: "",
    description: "",
    image: null,
  });
  const [editAlumni, setEditAlumni] = useState(null);

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
      alert("Alumni added successfully!");
      window.location.reload();
    }
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
    alert("Alumni updated successfully!");
    window.location.reload();
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "alumni", id);
    await deleteDoc(docRef);
    alert("Alumni deleted successfully!");
    window.location.reload();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setNewAlumni({ ...newAlumni, image: file }); // Integrasi dengan state newAlumni
  };

  return (
    <>
      <hr />
      <div className="my-20 container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Galeri Alumni</h1>
        <div className="flex flex-col md:flex-row bg-gray-100 mb-4 rounded-md">
          <div className="flex w-1/2 mx-auto ">
            <div className="flex flex-col justify-center items-center space-x-4  mx-auto">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-primary hover:-translate-y-1 hover:shadow-md hover:transition-all text-white  py-2 px-4 rounded-md"
              >
                Pilih Gambar
              </label>
              <span className="mt-3 text-sm">
                {fileName || "Tidak ada file yang dipilih"}
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden" // Sembunyikan input asli
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 lg:p-0 flex items-center">
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
              <div className="w-full=">
                <input
                  className="border-none rounded-md text-xl mb-4 text-gray-800 w-1/3"
                  type="number"
                  placeholder="Umur"
                  value={newAlumni.age}
                  onChange={(e) =>
                    setNewAlumni({ ...newAlumni, age: e.target.value })
                  }
                />
                <span className="ml-2 text-xl font-bold text-gray-700 ">
                  tahun
                </span>
              </div>
              <textarea
                className="border-none h-full w-full rounded-md text-gray-800"
                placeholder="Deskripsi"
                value={newAlumni.description}
                onChange={(e) =>
                  setNewAlumni({ ...newAlumni, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className="bg-green-500 hover:-translate-y-1 hover:shadow-md hover:transition-all text-white py-2 px-4 rounded-md"
            onClick={handleAdd}
          >
            <div className="flex justify-center gap-1 items-center">
              <img src="/icons/add.svg" alt="add" className="h-6" />
              Simpan Alumni Baru
            </div>
          </button>
        </div>
        <hr className="mb-4"/>
        {alumni.map((al) => (
          <div key={al.id} className="">
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-md ">
              <div className="flex w-1/2 mx-auto ">
                <div className="py-8 mx-auto">
                  <img
                    className="max-h-72 rounded-md"
                    src={al.imageUrl}
                    alt={al.name} 
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col text-left justify-center p-4">
                <h4 className="text-3xl font-bold mb-4 text-gray-800">{al.name}</h4>
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
          <div>
            <h2>Edit Alumni</h2>
            <input
              type="text"
              value={editAlumni.name}
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, name: e.target.value })
              }
            />
            <input
              type="number"
              value={editAlumni.age}
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, age: e.target.value })
              }
            />
            <textarea
              value={editAlumni.description}
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, description: e.target.value })
              }
            />
            <input
              type="file"
              onChange={(e) =>
                setEditAlumni({ ...editAlumni, image: e.target.files[0] })
              }
            />
            <button onClick={() => handleUpdate(editAlumni.id)}>
              Update Alumni
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GaleriAlumniIndex;
