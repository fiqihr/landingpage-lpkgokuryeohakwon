import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { NavbarSimple } from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const SemuaArtikel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleCollection = await getDocs(collection(db, "articles"));
      setArticles(
        articleCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchArticles();
  }, []);

  return (
    <>
      <NavbarSimple />
      <section id="semua-artikel" className="pt-10 pb-10">
        <div className="container mx-auto">
          <h1 className="lg:text-4xl text-4xl font-bold text-center lg:mt-20 lg:mb-20 my-10 ">
            <span className="">Berita terbaru LPK Gokuryeo</span>
          </h1>
          {articles.length === 0 ? (
            <div className="flex justify-center h-screen italic">
              Loading artikel...
            </div>
          ) : (
            <ul>
              {articles.map((article) => (
                <li key={article.id} className="mb-8">
                  {/* Show the title and main image */}
                  <Link to={`/artikelshow/${article.id}`}>
                    <div className="border flex justify-between px-12 py-8 items-center rounded-md hover:shadow-lg hover:-translate-y-1 transition-all">
                      <h3 className="text-2xl font-bold">{article.title}</h3>
                      {article.mainImage && (
                        <img
                          className="rounded-md"
                          src={article.mainImage}
                          alt={`Main image for ${article.title}`}
                          width="200"
                          style={{ marginBottom: "10px" }}
                        />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SemuaArtikel;
