import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../../../../firebase/firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onValue,
  update,
} from "firebase/database";
import { useNavigate } from "react-router-dom";

const InfoKelasIndex = () => {
  // const cardInfo = [
  //   {
  //     id: 1,
  //     title: "Kelas Desember 2024",
  //     description: "Dibuka kelas Insentif bahasa Korea selama 3 bulan",
  //     schedule: "Senin - Sabtu pukul 09:00 WIB - 16:00 WIB",
  //   },
  //   {
  //     id: 2,
  //     title: "Kelas Januari 2025",
  //     description: "Dibuka kelas Reguler bahasa Korea selama 6 bulan",
  //     schedule: "Senin - Sabtu pukul 19:00 WIB - 22:00 WIB",
  //   },
  // ];

  // const navigate = useNavigate();
  // let [infoKelasArray, setInfoKelasArray] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const db = getDatabase(app);
  //     const infoKelasRef = ref(db, "infoKelas");
  //     const snapshot = await get(infoKelasRef);
  //     if (snapshot.exists()) {
  //       // setInfoKelasArray(snapshot.val());
  //       const myData = snapshot.val();
  //       const temporaryArray = Object.keys(myData).map((myFireId) => {
  //         return { ...myData[myFireId], id: myFireId };
  //       });
  //       setInfoKelasArray(temporaryArray);
  //     } else {
  //       alert("No data available");
  //     }
  //   } catch (error) {
  //     alert("Error: " + error);
  //   }
  // };
  const [infoKelas, setInfoKelas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSchedule, setEditSchedule] = useState("");
  const [editLinkPendaftaran, setEditLinkPendaftaran] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboardadmin/infokelascreate");
  };

  useEffect(() => {
    const db = getDatabase(app);
    const infoKelasRef = ref(db, "infoKelas");

    // mendengarkan perubahan data
    onValue(infoKelasRef, (snapshot) => {
      const data = snapshot.val();
      const kelasArray = [];

      // mengubah objek jadi array, agar lebih mudah dirender
      for (let id in data) {
        kelasArray.push({ id, ...data[id] });
      }

      // mengurutkan berdasarkan data terbaru
      kelasArray.sort((a, b) => b.createdAt - a.createdAt);
      setInfoKelas(kelasArray);
    });
  }, []);

  const handleDelete = (id) => {
    const db = getDatabase(app);
    const infoKelasRef = ref(db, `infoKelas/${id}`);
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      remove(infoKelasRef)
        .then(() => {
          console.log("Data berhasil dihapus!");
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  };

  const handleEdit = (kelas) => {
    setEditingId(kelas.id);
    setEditTitle(kelas.title);
    setEditDescription(kelas.description);
    setEditSchedule(kelas.schedule);
    setEditLinkPendaftaran(kelas.linkPendaftaran);
  };

  const handleUpdate = (id) => {
    const db = getDatabase(app);
    const infoKelasRef = ref(db, `infoKelas/${id}`);

    update(infoKelasRef, {
      title: editTitle,
      description: editDescription,
      schedule: editSchedule,
      linkPendaftaran: editLinkPendaftaran,
    })
      .then(() => {
        alert("Data berhasl diupdate");
        setEditingId(null);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
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
            <li key={kelas.id} className="">
              {editingId === kelas.id ? (
                // form edit
                <div>
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
                  <button
                    className="bg-green-500 text-white p-2 rounded-md mr-2"
                    onClick={() => handleUpdate(kelas.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-500 text-white p-2 rounded-md"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // form normal
                <div className="px-3 lg:px-0">
                  <div className="bg-gray-100 rounded-lg shadow-lg ">
                    <div className="flex flex-wrap justify-between mx-8">
                      <div className="py-4">
                        <h3 className="text-3xl font-bold text-gray-800">
                          {kelas.title}
                        </h3>
                        <p className="text-gray-700 my-2">{kelas.description}</p>
                        <p className=" text-sm italic text-gray-600 mb-2">{kelas.schedule}</p>
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
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center my-12">
          <h1 className="text-4xl font-bold ">Sedang Memuat Data...</h1>
        </div>
      )}
    </div>

    // <section id="infokelas" className=" pt-10">
    //   <div className="container mx-auto mb-12">
    //     <h1 className="lg:text-5xl text-4xl font-bold text-center my-10 lg:mt-20 lg:mb-20 text-primary">
    //       <span className="border-b-4 border-gray-200">Info Kelas</span>
    //     </h1>
    //     <div className="flex justify-center mb-4">
    //       <Link
    //         to="/dashboardadmin/infokelascreate"
    //         className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:opacity-80 hover:shadow-md hover:-translate-y-1 transition-all"
    //       >
    //         <div className="flex gap-1 font-bold justify-center  items-center">
    //           <img className="h-6" src="/icons/add.svg" alt="" />
    //           Tambah Kelas Baru
    //         </div>
    //       </Link>
    //     </div>
    //     {cardInfo.length > 0 &&
    //       cardInfo.map((card) => (
    //         <div className="container px-3 lg:px-0" key={card.id}>
    //           <div className="mb-8 bg-gray-100 rounded-lg shadow-lg ">
    //             <div className="flex flex-wrap justify-between mx-8">
    //               <div className="py-8">
    //                 <h3 className="text-3xl font-bold mb-4 text-gray-800">
    //                   {card.title}
    //                 </h3>
    //                 <p className="mb-3 text-gray-700">{card.description}</p>
    //                 <p className="text-gray-600 text-sm italic">
    //                   {card.schedule}
    //                 </p>
    //               </div>
    //               <a
    //                 href="#"
    //                 className="mb-4 mx-auto md:mr-0 lg:mr-0 rounded-lg shadow-md bg-primary text-white text-center self-center font-bold justify-center px-8 py-4 hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90"
    //               >
    //                 <span>Gabung Sekarang</span>
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </section>
  );
};

export default InfoKelasIndex;
