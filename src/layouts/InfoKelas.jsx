const InfoKelas = () => {
  const cardInfo = [
    {
      id: 1,
      title: "Kelas Desember 2024",
      description: "Dibuka kelas insentif bahasa Korea selama 3 bulan",
      schedule: "Senin - Sabtu pukul 09:00 - 16:00",
    },
    {
      id: 2,
      title: "Kelas Januari 2025",
      description: "Dibuka kelas insentif bahasa Korea selama 6 bulan",
      schedule: "Senin - Sabtu pukul 19:00 - 22:00",
    },
  ];
  return (
    <section id="infokelas" className=" pt-10">
      <div className="container mx-auto mb-12">
        <h1 className="lg:text-5xl text-4xl font-bold text-center my-10 lg:mt-20 lg:mb-20 text-primary">
          <span className="border-b-4 border-gray-200">Info Kelas</span>
        </h1>
        {cardInfo.length > 0 &&
          cardInfo.map((card) => (
            <div className="container px-3 lg:px-0" key={card.id}>
              <div className="mb-8 bg-gray-100 rounded-lg shadow-lg ">
                <div className="flex flex-wrap justify-between mx-8">
                  <div className="py-8">
                    <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                    <p className="mb-3">{card.description}</p>
                    <p className="text-gray-700 text-sm">{card.schedule}</p>
                  </div>
                  <a
                    href="#"
                    className="mb-4 mx-auto md:mr-0 lg:mr-0 rounded-lg shadow-md bg-primary text-white text-center self-center font-bold justify-center px-8 py-4 hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90"
                  >
                    <span>Gabung Sekarang</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default InfoKelas;
