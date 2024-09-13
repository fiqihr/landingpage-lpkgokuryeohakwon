import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Artikel = () => {
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

  const handleNavigateToAllArticles = () => {
    window.location.href = "/semua-artikel";
  };

  // Get the first 3 articles
  const displayedArticles = articles.slice(0, 3);

  return (
    <section id="artikel" className="pt-10 pb-10">
      <div className="container mx-auto">
        <h1 className="lg:text-5xl text-4xl font-bold text-center lg:mt-20 lg:mb-20 my-10 text-primary">
          <span className="border-b-4 border-gray-200">Terbaru</span>
        </h1>
        {displayedArticles.length === 0 ? (
          <p>Tidak ada artikel.</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center ">
            {displayedArticles.map((article) => (
              <div key={article.id} className="w-2/5 flex-shrink-0 max-h-56">
                {/* Only show the title and main image */}
                <Link to={`/artikelshow/${article.id}`}>
                  <div className="border flex justify-between px-12 py-8 items-center rounded-md hover:shadow-lg hover:-translate-y-1 transition-all ">
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    {article.mainImage && (
                      <img
                        className="rounded-md h-32"
                        src={article.mainImage}
                        alt={`Main image for ${article.title}`}
                        
                        style={{ marginBottom: "10px" }}
                      />
                    )}
                  </div>
                </Link>
              </div>
            ))}
            <button
              className="w-2/5 border rounded-md flex justify-center items-center hover:shadow-lg hover:-translate-y-1 transition-all max-h-56 "
              onClick={handleNavigateToAllArticles}
            >
              <div className="text-primary flex justify-center items-center">
                Lihat selengkapnya
                <img src="/icons/right.svg" className="h-7" alt="" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Artikel;
