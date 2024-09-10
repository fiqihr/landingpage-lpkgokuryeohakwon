import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button2 } from "./Components/Button/Button";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-sm"
      >
        <Link
          to="/#tentangkami"
          className="flex items-center text-gray-700 hover:border-b-2 hover:border-primary transition-all "
        >
          Tentang Kami
        </Link>
      </div>
      <div
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-sm"
      >
        <Link
          to="/#program"
          className="flex items-center text-gray-700 hover:border-b-2 hover:border-primary transition-all "
        >
          Sektor Pekerjaan
        </Link>
      </div>
      <div
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-sm"
      >
        <Link
          to="/#infomasuk"
          className="flex items-center text-gray-700 hover:border-b-2 hover:border-primary transition-all "
        >
          Info Masuk
        </Link>
      </div>
      
      <div
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-sm"
      >
        <Link
          to="/#infokelas"
          className="flex items-center text-gray-700 hover:border-b-2 hover:border-primary transition-all "
        >
          Info Kelas
        </Link>
      </div>
      <div
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-sm"
      >
        <Link
          to="/#galerialumni"
          className="flex items-center text-gray-700 hover:border-b-2 hover:border-primary transition-all "
        >
          Galeri Alumni
        </Link>
      </div>
      <div
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-sm"
      >
      <Button2 link="/#infokelas" name="Daftar Sekarang"/>

      </div>
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
          <a
            
            href="/#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 self-center text-center text-lg font-bold"
          >
            Gokuryeo Hakwon
          </a>
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
