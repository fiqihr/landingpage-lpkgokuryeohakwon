import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../../../../firebase/firebase";
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const InfoKelasIndex = () => {
  const [infoKelas, setInfoKelas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSchedule, setEditSchedule] = useState("");
  const [editLinkPendaftaran, setEditLinkPendaftaran] = useState("");
  const [showModal, setShowModal] = useState(false); // State untuk kontrol modal
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboardadmin/infokelascreate");
  };

  useEffect(() => {
    const db = getFirestore(app);
    const infoKelasRef = collection(db, "infoKelas");

    // Mendengarkan perubahan data
    const unsubscribe = onSnapshot(infoKelasRef, (snapshot) => {
      const kelasArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mengurutkan berdasarkan data terbaru
      kelasArray.sort((a, b) => b.createdAt - a.createdAt);
      setInfoKelas(kelasArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await deleteDoc(doc(getFirestore(app), "infoKelas", id));
        console.log("Data berhasil dihapus!");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleEdit = (kelas) => {
    setEditingId(kelas.id);
    setEditTitle(kelas.title);
    setEditDescription(kelas.description);
    setEditSchedule(kelas.schedule);
    setEditLinkPendaftaran(kelas.linkPendaftaran);
    setShowModal(true); // Tampilkan modal saat tombol edit diklik
  };

  const handleUpdate = async () => {
    const db = getFirestore(app);
    const kelasRef = doc(db, "infoKelas", editingId);

    try {
      await updateDoc(kelasRef, {
        title: editTitle,
        description: editDescription,
        schedule: editSchedule,
        linkPendaftaran: editLinkPendaftaran,
      });
      alert("Data berhasil diupdate");
      setShowModal(false); // Sembunyikan modal setelah update
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">List Info Kelas</h1>
      <div className="text-start">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mb-6"
          onClick={handleNavigate}
        >
          <div className="flex justify-center gap-1 items-center">
            <img src="/icons/add.svg" alt="add" className="h-6" />
            Tambah Kelas
          </div>
        </button>
      </div>
      {infoKelas.length > 0 ? (
        <ul>
          {infoKelas.map((kelas) => (
            <li key={kelas.id}>
              <div className="px-3 lg:px-0">
                <div className="bg-gray-100 rounded-lg shadow-lg">
                  <div className="flex flex-wrap justify-between mx-8">
                    <div className="py-4">
                      <h3 className="text-3xl font-bold text-gray-800">
                        {kelas.title}
                      </h3>
                      <p className="text-gray-700 my-2">{kelas.description}</p>
                      <p className="text-sm italic text-gray-600 mb-2">
                        {kelas.schedule}
                      </p>
                    </div>
                    <a
                      href={kelas.linkPendaftaran}
                      className="mb-4 mx-auto md:mr-0 lg:mr-0 rounded-lg shadow-md bg-primary text-white text-center self-center font-bold justify-center px-8 py-4 hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90"
                    >
                      <span>Gabung Sekarang</span>
                    </a>
                  </div>
                </div>
                <div className="flex justify-center gap-2 -translate-y-5">
                  <button
                    className="bg-amber-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                    onClick={() => handleEdit(kelas)}
                  >
                    <div className="flex justify-center gap-1 items-center">
                      <img src="/icons/edit.svg" alt="" className="h-6" />
                      Edit Kelas
                    </div>
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                    onClick={() => handleDelete(kelas.id)}
                  >
                    <div className="flex justify-center gap-1 items-center">
                      <img src="/icons/delete.svg" alt="" className="h-6" />
                      Hapus Kelas
                    </div>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center my-12">
          <h1 className="text-4xl font-bold">Sedang Memuat Data...</h1>
        </div>
      )}

      {/* Modal Form Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {/* <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Info Kelas</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Edit Title"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Edit Description"
            />
            <input
              type="text"
              value={editSchedule}
              onChange={(e) => setEditSchedule(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Edit Schedule"
            />
            <input
              type="text"
              value={editLinkPendaftaran}
              onChange={(e) => setEditLinkPendaftaran(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Edit Link Pendaftaran"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div> */}
          <div className="bg-gray-100 rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-between mx-8">
              <div className="py-4 w-2/3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="p-2 border-none text-3xl font-bold text-gray-800 rounded-md w-full my-2"
                  placeholder="Edit Title"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="p-2 border-none  my-2  text-gray-700 rounded-md w-full"
                  placeholder="Edit Description"
                />
                <input
                  type="text"
                  value={editSchedule}
                  onChange={(e) => setEditSchedule(e.target.value)}
                  className="p-2 border-none text-sm italic my-2  text-gray-700 rounded-md w-full"
                  placeholder="Edit Schedule"
                />
              </div>
              <div className="flex flex-col justify-center items-center ">
                <a className="mb-4 mx-auto rounded-lg shadow-md bg-primary text-white text-center self-center font-bold justify-center px-8 py-4 hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90">
                  <span>Gabung Sekarang</span>
                </a>
                <input
                  type="text"
                  value={editLinkPendaftaran}
                  onChange={(e) => setEditLinkPendaftaran(e.target.value)}
                  className="mb-2 p-2 border border-gray-300 rounded-md w-full text-sm italic text-gray-600"
                  placeholder="Edit Link Pendaftaran"
                />
              </div>
            </div>
            <div className="flex justify-center gap-2 my-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                onClick={handleUpdate}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/update.svg" alt="" className="h-6" />
                  Update
                </div>
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                onClick={closeModal}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/cancel.svg" alt="" className="h-6" />
                  Batal
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoKelasIndex;
