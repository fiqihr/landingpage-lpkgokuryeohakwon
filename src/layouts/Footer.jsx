const Footer = () => {
  return (
    <footer className="bg-gray-900 py-4">
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
          <div className="pt-4 md:pt-0 lg:pt-0 pl-8 md:w-4/12 lg:w-4/12 text-white flex flex-col ">
            <h4 className="text-2xl font-bold mb-2 lg:mb-4">Hubungi Kami</h4>
            <a href="#" className="text-sm">
              +6281234567890
            </a>
            <a href="#" className="text-sm">
              lpkgokuryeo@gmail.com
            </a>
          </div>
          <div className="pt-4 md:pt-0 lg:pt-0 pl-8 md:w-4/12 lg:w-4/12 text-white flex flex-col ">
            <h4 className="text-2xl font-bold mb-2 lg:mb-4">Ikuti Kami</h4>
            <a href="#" className="text-sm">
              instagram
            </a>
            <a href="#" className="text-sm">
              facebook
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
