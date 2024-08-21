const HubungiKami = () => {
  return (
    <section id="hubungikami">
      <div className="container my-20 mx-auto py-4 px-4 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 rounded-xl">
        <h4 className="text-4xl font-bold text-center text-white">
          Masih bingung? Mau tanya-tanya?
        </h4>
        <p className="text-center text-white text-xl mt-2">
          Silahkan hubungi kami untuk informasi lebih lanjut
        </p>
        <div className="flex justify-center pt-4 gap-3">
          <a target="_blank" href="https://wa.me/6281234567890">
            <img
              className="h-16 filter grayscale  hover:filter-none transition duration-300 ease-in-out"
              src="/icons/whatsapp.svg"
              alt="whatsapp kami"
            />
          </a>
          <a target="_blank" href="mailto:lpkgokuryeo@gmail.com">
            <img
              className="h-16 filter grayscale hover:filter-none transition duration-300 ease-in-out"
              src="/icons/gmail.svg"
              alt="email kami"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HubungiKami;
