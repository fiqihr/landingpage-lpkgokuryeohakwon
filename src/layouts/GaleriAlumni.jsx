import { Carousel, IconButton } from "@material-tailwind/react";

function GaleriAlumni() {
  const cardGaleri = [
    {
      id: "1",
      name: "Andre || 21 tahun",
      image: "/images/galeri1.jpeg",
      description:
        "This is the text for the first image. You can describe the image or add any other content here.",
    },
    {
      id: "2",
      name: "Sapa Mbuh || 21 tahun",
      image: "/images/galeri2.jpeg",
      description:
        "This is the text for the first image. You can describe the image or add any other content here.",
    },
  ];
  return (
    <section id="galerialumni" className="bg-gray-100 pt-10 pb-10">
      <div className="container mx-auto">
        <h1 className="lg:text-5xl text-4xl font-bold text-center lg:mt-20 lg:mb-20 my-10 text-primary">
        <span className="border-b-4 border-gray-200">Galeri Alumni</span>
        </h1>
        <div className="max-w-full mx-auto">
          <Carousel
            className=""
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="black"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-2 md:left-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="black"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 !right-2 md:!right-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            {cardGaleri.length > 0 &&
              cardGaleri.map((card) => (
                <div key={card.id}>
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={card.image}
                      alt="image 1"
                      className="ml-0 md:ml-20 rounded-lg h-64 md:h-full w-full md:w-1/2 object-cover"
                    />
                    <div className="w-full md:w-1/2 p-4 lg:p-0 flex items-center ">
                      <div className=" lg:ml-4 lg:mr-20 mx-4 md:ml-2 md:mr-8 text-center md:text-left mb-8 md:mb-0 lg:mb-0">
                        <h4 className="text-xl font-bold mb-4">{card.name}</h4>
                        <p className="">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default GaleriAlumni;