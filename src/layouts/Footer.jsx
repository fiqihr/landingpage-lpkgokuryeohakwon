const Footer = () => {
  return (
    <footer className="bg-gray-900 py-4 ">
      <div className="container mx-auto py-4">
        <div
          className="flex flex-col 
        md:flex-row lg:flex-row"
        >
          <div className=" md:w-3/12 lg:w-4/12">
            <div className="flex justify-start ">
              <img
                className="pl-8 lg:ml-20 h-20"
                src="/images/logo.png"
                alt="lpk gokuryeo"
              />
            </div>
          </div>
          <div className="pt-4 md:pt-0 lg:pt-0 pl-8 md:w-4/12 lg:w-4/12 text-gray-200 flex flex-col ">
            <h4 className="text-2xl font-bold mb-2 lg:mb-4">Alamat Kami</h4>
            <div className="text-sm mb-2">
              <div className="flex items-center ">
                <p className="w-2/3">Desa Karanganyar RT 03/01, Karang Anyar Wetan, Karanganyar, Kec.Madukara, Kab.Banjarnegara, Jawa Tengah, 53482</p>
              </div>
            </div>
          </div>
          <div className="pt-4 md:pt-0 lg:pt-0 pl-8 md:w-4/12 lg:w-4/12 text-gray-200 flex flex-col ">
            <h4 className="text-2xl font-bold mb-2 lg:mb-4">Hubungi Kami</h4>
            <div className="text-sm mb-2">
              <div className="flex items-center gap-1">
                <img className="h-5" src="/icons/phone.svg" alt="" />
                <span> +628123456789</span>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1">
                <img className="h-5" src="/icons/email.svg" alt="" />
                <span>lpkgokuryeo@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="pt-4 md:pt-0 lg:pt-0 pl-8 md:w-4/12 lg:w-4/12 text-gray-200 flex flex-col ">
            <h4 className="text-2xl font-bold mb-2 lg:mb-4">Ikuti Kami</h4>
            <a
              href="https://www.facebook.com/lpk.gokuryeo"
              className="text-sm mb-2"
            >
              <div className="flex items-center gap-1">
                <img className="h-5" src="/icons/facebook.svg" alt="" />
                <span>Lpk Gokuryeo Banjarnegara</span>
              </div>
            </a>
            <a
              href="https://www.instagram.com/gokuryeo_hakwon/"
              className="text-sm mb-2"
            >
              <div className="flex items-center gap-1">
                <img className="h-5" src="/icons/instagram.svg" alt="" />
                <span>gokuryeo_hakwon</span>
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@gokuryeo_hakwon"
              className="text-sm"
            >
              <div className="flex items-center gap-1">
                <img className="h-5" src="/icons/tiktok.svg" alt="" />
                <span>@gokuryeo_hakwon</span>
              </div>
            </a>
          </div>
        </div>
        <hr className="border-gray-600 mt-8" />
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-100 ">
          Copyright © 2024 LPK Gokuryeo Hakwon. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
