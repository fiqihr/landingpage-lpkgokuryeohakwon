import { useEffect, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Pastikan path menuju file firebase konfigurasi benar

function GaleriAlumni() {
  // State untuk menyimpan data alumni
  const [alumniList, setAlumniList] = useState([]);

  // Mengambil data dari Firestore saat komponen di-mount
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "alumni"));
        const alumniData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlumniList(alumniData); // Set state dengan data yang diambil
      } catch (error) {
        console.error("Error fetching alumni data: ", error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <section
      id="galerialumni"
      className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 pt-10 pb-10"
    >
      <div className="container mx-auto">
        <h1 className="lg:text-5xl text-4xl font-bold text-center lg:mt-20 lg:mb-20 my-10 text-primary">
          <span className="border-b-4 border-gray-200">Galeri Alumni</span>
        </h1>
        <div className="max-w-full mx-auto">
          <Carousel
            className=""
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="black"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-2 md:left-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="black"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 !right-2 md:!right-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            {alumniList.length > 0 &&
              alumniList.map((alumni) => (
                <div key={alumni.id}>
                  <div className="flex flex-col md:flex-row">
                  <img
                      src={alumni.imageUrl}
                      alt={alumni.name}
                      className="ml-0 md:ml-20 rounded-lg h-64 md:h-full w-full md:w-1/2 object-cover"
                    />

                    <div className="w-full md:w-1/2 p-4 lg:p-0 flex items-center ">
                      <div className=" lg:ml-4 lg:mr-20 mx-auto md:ml-2 md:mr-8 text-center md:text-left mb-8 md:mb-0 lg:mb-0">
                        <h4 className="text-3xl font-bold mb-4 text-gray-800">
                          {alumni.name}
                        </h4>
                        <h4 className="text-xl font-bold mb-4 text-gray-800 italic">
                          {alumni.age} tahun
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {alumni.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default GaleriAlumni;
