import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { doc, getDoc } from "firebase/firestore";
import { NavbarSimple } from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const ArtikelTampil = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <>
      <NavbarSimple />
      <div className="py-20 container mx-auto">
        <div className="mx-auto px-4 w-full lg:w-2/3">
          <div className="mt-20 mb-10">
            <h4 className="text-5xl font-bold text-center">{article.title}</h4>
          </div>
          {article.mainImage && (
            <div className="w-full md:w-1/2 lg:w-2/3 mx-auto mb-10">
              <img
                src={article.mainImage}
                alt={`Main image for ${article.title}`}
              />
            </div>
          )}
          <p className="mb-10">{article.content}</p>

          {/* Display Other Images */}
          {article.images && article.images.length > 0 && (
            <div>
              {article.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Article ${article.title} image ${index + 1}`}
                  width="200"
                  style={{ marginRight: "10px" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtikelTampil;
