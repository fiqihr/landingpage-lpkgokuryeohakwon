import { Link, useNavigate } from "react-router-dom";
import { Button1 } from "./Components/Button/Button";

const Jumbotron = () => {
  const navigate = useNavigate();

  return (
    // <section id="home" className="pt-20 pb-16 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600">
    <section
      id="home"
      className="pt-20 pb-16 bg-[url('/images/bg-home-cut.jpeg')] bg-cover  bg-center relative"
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className=" container mx-auto relative z-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-2/3 self-center px-4 text-white my-32">
            <h2 className="text-2xl lg:text-5xl font-bold">
              Selamat Datang di
            </h2>
            <h2 className="text-5xl md:text-4xl lg:text-6xl font-bold">
              LPK Gokuryeo Hakwon
            </h2>
            <p className="text-lg mt-4">
              Kami siap memandu Anda menuju kesempatan kerja di Korea dengan
              penghasilan fantastis melalui program resmi pemerintah G to G.
              <br></br> Bersama kami, raih masa depan cerah dan karir
              internasional yang gemilang!
            </p>
            <div className="mt-8">
            <Button1 link="/#hubungikami" name="Hubungi Kami" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
