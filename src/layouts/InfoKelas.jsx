import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Pastikan path menuju file firebase konfigurasi benar
import { useNavigate } from "react-router-dom";
import { Button4 } from "./Components/Button/Button";

const InfoKelas = () => {
  const [infoKelas, setInfoKelas] = useState([]);

  useEffect(() => {
    const fetchInfoKelas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "infoKelas"));
        const kelasArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Mengurutkan berdasarkan field `createdAt` (pastikan `createdAt` adalah timestamp di Firestore)
        kelasArray.sort((a, b) => b.createdAt - a.createdAt);

        setInfoKelas(kelasArray);
      } catch (error) {
        console.error("Error fetching info kelas: ", error);
      }
    };

    fetchInfoKelas();
  }, []);

  return (
    <section id="infokelas" className="pt-10">
      <div className="container mx-auto mb-12">
        <h1 className="lg:text-5xl text-4xl font-bold text-center my-10 lg:mt-20 lg:mb-20 text-primary">
          <span className="border-b-4 border-gray-200">Info Kelas</span>
        </h1>
        {infoKelas.length > 0 &&
          infoKelas.map((card) => (
            <div className="container px-3 lg:px-0" key={card.id}>
              <div className="mb-8 bg-gray-100 rounded-lg shadow-lg">
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
                  <Button4 link={card.linkPendaftaran} name="Gabung Sekarang" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default InfoKelas;
