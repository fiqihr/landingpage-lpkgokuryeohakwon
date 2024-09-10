import { Link } from "react-router-dom";
import programsData from "../data/ProgramsData";
import { Button2, Button3 } from "./Components/Button/Button";

const Programs = () => {
  return (
    <section id="program" className="pt-10">
      <div className="container mx-auto px-4">
        <div className="my-10 lg:mt-20 lg:mb-20">
          <h1 className="lg:text-5xl text-4xl font-bold text-center text-primary">
            <span className="border-b-4 border-gray-200">Sektor Pekerjaan</span>
          </h1>
          <p className="text-center text-gray-700 text-base mt-4">
            Kami siap memandu Anda untuk berkarir ke Korea di berbagai sektor
            yang menjanjikan.
          </p>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-center gap-16">
          {programsData.length > 0 &&
            programsData.map((card) => (
              <div
                key={card.id}
                className="relative border-t-2 shadow-lg w-full md:w-80 rounded-lg "
              >
                <img
                  className="h-52 w-2/3 mx-auto mt-6"
                  src={card.cardimage}
                  alt={card.title}
                />
                <div className="mx-6 mt-6 mb-20 text-center md:text-left">
                  <h4 className="text-2xl font-bold">{card.title}</h4>
                  <p className="text-gray-700">{card.description}</p>
                  <Button3 link={card.title.toLowerCase()} name="Info Lanjut"></Button3>
                </div>
              </div>
            ))}
          {/* <Card {...cardData.card1} />
          <Card {...cardData.card2} /> */}
        </div>
      </div>
    </section>
  );
};

function Card(props) {
  const { title, image, description } = props;
  return (
    <div className="relative border-1 shadow w-full md:w-80 rounded-lg">
      <img className="h-52 w-2/3 mx-auto mt-6" src={image} alt="Magang" />
      <div className="mx-6 mt-6 mb-20 text-center md:text-left">
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="">{description}</p>
        <Link
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:transform-none md:left-auto bg-primary text-white rounded-full px-4 py-2"
          to="#"
        >
          Info Lanjutadsf
        </Link>
      </div>
    </div>
  );
}

export default Programs;
