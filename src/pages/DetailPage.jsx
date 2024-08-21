import { useParams } from "react-router-dom";
import programsData from "../data/ProgramsData";
import { NavbarSimple } from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const DetailPage = () => {
  const { title } = useParams();
  const item = programsData.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  if (!item) {
    return <div className="">Item tidak ditemukan</div>;
  }
  return (
    <div>
      <NavbarSimple />
      <div className="py-20 container mx-auto">
        <div id="isi-article" className=" mx-auto w-2/3 ">
          <div className="mt-20 mb-10">
            <h4 className="text-5xl font-bold text-center">{item.title}</h4>
          </div>
          <div className="w-2/3 mx-auto mb-10">
            <img src={item.images} alt="" />
          </div>
          <p className="text-justify">{item.article}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
