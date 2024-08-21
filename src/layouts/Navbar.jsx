import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold "
      >
        <a
          href="/#tentangkami"
          className="flex items-center hover:text-primary transition-colors"
        >
          Tentang Kami
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold "
      >
        <a
          href="/#program"
          className="flex items-center hover:text-primary transition-colors"
        >
          Program
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold "
      >
        <a
          href="/#infomasuk"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Info Masuk
        </a>
      </Typography>
      
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a
          href="/#infokelas"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Info Kelas
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold "
      >
        <a
          href="/#galerialumni"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Galeri Alumni
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a
          href="/#infokelas"
          className="bg-blue-700 py-3 px-5 text-white rounded-lg flex items-center hover:bg-opacity-80 hover:shadow-md transition-colors "
        >
          <span className="mx-auto">Daftar Sekarang</span>
        </a>
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      className={`w-full mx-auto px-6 py-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/50" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex">
          <img src="/images/logo.png" alt="logo" className="mr-2 h-12" />
          <Typography
            as="a"
            href="/#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 self-center text-center text-lg"
          >
            Gokuryeo Hakwon
          </Typography>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
