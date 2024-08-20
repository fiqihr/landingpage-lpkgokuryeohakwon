import React, { useState } from "react";

export default function InfoMasuk() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Persyaratan", content: <Persyaratan /> },
    { label: "Dokumen", content: <Dokumen /> },
    { label: "Fasilitas", content: <Fasilitas /> },
    { label: "Biaya", content: <Biaya /> },
  ];

  return (
    <section id="infomasuk" className="pt-10">
    <div className="container mx-auto mb-0 px-4">
      <h1 className="lg:text-5xl text-4xl font-bold text-center lg:mt-20 lg:mb-20 text-primary my-10">
        <span className="border-b-4 border-gray-200">Info Masuk</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-gray-100 border-b border-gray-300 rounded-lg">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`py-4 cursor-pointer transition-colors duration-200 text-center w-full md:w-auto ${
              activeTab === index
                ? "bg-primary text-white font-bold md:font-normal lg:font-normal md:border-b4 md:border-primary md:border-b-4 lg:border-b-4 lg:border-primary md:text-primary lg:text-primary md:bg-transparent lg:bg-transparent rounded-lg md:rounded-none lg:rounded-none"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">{tabs[activeTab].content}</div>
      </div>
    </div>
    </section>
  );
}

const Biaya = () => {
  return (
    <div className={CardStyle}>
      <h4 className="text-2xl text-primary font-bold mb-4">
        Biaya Pendidikan:
      </h4>
      <p className="">
        <span className="font-bold">Rp. 2.500.000</span> (Garansi sampai lulus)
      </p>
      {/* <ul className="list-disc ml-4">
        <li>asa</li>
        <li>asa</li>
        <li>asa</li>
      </ul> */}
    </div>
  );
};

var CardStyle = "bg-gray-100 rounded-lg p-10 shadow-lg ";

const Persyaratan = () => {
  return (
    <div className={CardStyle}>
      <h4 className="text-2xl text-primary font-bold mb-4">Persyaratan:</h4>
      <ul className="list-disc ml-4">
        <li>Pria/Wanita usia 18 - 39 tahun</li>
        <li>Minimal Ijazah SMP/MTS/paket B</li>
        <li>Tidak buta warna total</li>
        <li>Bertato boleh asal jangan terlalu banyak</li>
        <li>Boleh berkacamata</li>
        <li>Sehat jasmani dan rohani</li>
        <li>Tidak mempunyai riwayat penyakit berat (TBC, HIV, Hepatitis)</li>
      </ul>
    </div>
  );
};

const Fasilitas = () => {
  return (
    <div className={CardStyle}>
      <h4 className="text-2xl text-primary font-bold mb-4">
        Fasilitas:
      </h4>
      <ul className="list-disc ml-4">
        <li>Kelas yang bersih dan nyaman</li>
        <li>dan lain lain</li>
        <li>dan lain lain</li>
        <li>dan lain lain</li>
      </ul>
    </div>
  );
};

const Dokumen = () => {
  return (
    <div className={CardStyle}>
      <h4 className="text-2xl text-primary font-bold mb-4">Dokumen Syarat Pendaftaran:</h4>
      <ul className="list-disc ml-4">
        <li>Akte Kelahiran</li>
        <li>Ijazah Terakhir</li>
        <li>KK (Kartu Keluarga)</li>
        <li>KTP (Kartu Tanda Penduduk)</li>
      </ul>
    </div>
  );
};
