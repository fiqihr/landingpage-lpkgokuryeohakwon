const LokasiKontak = () => {
  return (
    <div className="container mx-auto mb-20">
      <div className="flex">
        <div className="w-full ">
          <h1 className="lg:text-5xl text-4xl font-bold text-center my-10 lg:mt-20 lg:mb-10 text-primary">
          <span className="border-b-4 border-gray-200">Lokasi</span>
          </h1>
          <div className="mx-8">
            <p>
              Jl. Karanganyar RT 003/RW 003, Kec.Madukara, Kab.Banjarnegara,
              Jawa Tengah
            </p>
          </div>
        </div>
        {/* <div className="w-1/2 ">
          <h1 className="text-4xl font-bold text-center my-20 text-primary">
            Ikuti & Hubungi Kami
          </h1>
          <div className="mx-8">
            <p>email</p>
            <p>whatsapp</p>
            <p>instagram</p>
            <p>tiktok</p>
            <p>facebook</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LokasiKontak;
