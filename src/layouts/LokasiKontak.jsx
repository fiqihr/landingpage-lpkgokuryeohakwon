const LokasiKontak = () => {
  return (
    <div className="container mx-auto mb-20">
      <div className="flex">
        <div className="w-full ">
          <h1 className="lg:text-5xl text-4xl font-bold text-center my-10 lg:mt-20 lg:mb-20 text-primary">
            <span className="border-b-4 border-gray-200">Lokasi</span>
          </h1>
          <div className="text-center">
            <p className="mb-4 mx-4">
              Desa Karanganyar RT 03/01, Karanganyar, Kec. Madukara, Kab.
              Banjarnegara, Jawa Tengah 53482
            </p>
            <div className="mx-4 flex justify-center ">
              <iframe
                className="w-full md:w-2/3 lg:w-1/2 "
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.957933894966!2d109.73131687498876!3d-7.358612392650413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa8471100136d%3A0x824a44a12155f5d4!2zS1VSU1VTIEJBSEFTQSBLT1JFQSDqs6DqtazroKTtlZzqta3slrTtlZnsm5A!5e0!3m2!1sen!2sid!4v1724225520224!5m2!1sen!2sid"
                height="320"
                style={{ border: 1, borderRadius: "15px" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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
