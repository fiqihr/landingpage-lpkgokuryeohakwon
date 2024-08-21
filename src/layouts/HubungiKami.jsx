const HubungiKami = () => {
  return (
    <section id="hubungikami">
      <div className="mt-20 mb-5 mx-auto py-10 px-4 bg-gray-100 flex flex-col md:flex-row">
        <div className="flex justify-center md:justify-end md:w-1/3 mb-5 md:mb-0">
          <img className="w-1/2 md:w-2/3" src="/images/question.svg" alt="question" />
        </div>
        <div className="md:w-2/3 self-center">
          <h4 className="mt-6 md:mt-0 lg:mt-0 text-4xl lg:text-5xl  font-bold text-center text-primary">
            Masih bingung? Mau tanya-tanya?
          </h4>
          <p className="text-center text-gray-800 text-md md:text-lg mt-2">
            Silahkan hubungi kami untuk informasi lebih lanjut
          </p>
          <div className="flex justify-center pt-4 gap-3">
            <a target="_blank" href="https://wa.me/6281234567890">
              <img
                className="h-20 md:h-16 filter grayscale hover:filter-none transition duration-300 ease-in-out"
                src="/icons/whatsapp.svg"
                alt="whatsapp kami"
              />
            </a>
            <a target="_blank" href="mailto:lpkgokuryeo@gmail.com">
              <img
                className="h-20 md:h-16 filter grayscale hover:filter-none transition duration-300 ease-in-out"
                src="/icons/gmail.svg"
                alt="email kami"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubungiKami;
