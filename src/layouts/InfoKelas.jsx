import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../firebase/firebase";
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
import { Button4 } from "./Components/Button/Button";

const InfoKelas = () => {
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
  const [infoKelas, setInfoKelas] = useState([]);

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

  return (
    <section id="infokelas" className=" pt-10">
      <div className="container mx-auto mb-12">
        <h1 className="lg:text-5xl text-4xl font-bold text-center my-10 lg:mt-20 lg:mb-20 text-primary">
          <span className="border-b-4 border-gray-200">Info Kelas</span>
        </h1>
        {infoKelas.length > 0 &&
          infoKelas.map((card) => (
            <div className="container px-3 lg:px-0" key={card.id}>
              <div className="mb-8 bg-gray-100 rounded-lg shadow-lg ">
                <div className="flex flex-wrap justify-between mx-8">
                  <div className="py-8">
                    <h3 className="text-3xl font-bold mb-4 text-gray-800">
                      {card.title}
                    </h3>
                    <p className="mb-3 text-gray-700">{card.description}</p>
                    <p className="text-gray-600 text-sm italic">
                      {card.schedule}
                    </p>
                  </div>
                  <Button4 link={card.linkPendaftaran} name = "Gabung Sekarang"></Button4>
                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default InfoKelas;
