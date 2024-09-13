import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom"; // Untuk navigasi ke halaman edit dan show

const ArtikelIndex = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const articleCollection = await getDocs(collection(db, "articles"));
      setArticles(
        articleCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await deleteDoc(doc(db, "articles", id));
      setArticles(articles.filter((article) => article.id !== id));
    }
  };
  const handleNavigate = () => {
    navigate("/dashboardadmin/artikelcreate");
  };

  return (
    <div className="my-20 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Artikel</h1>
      <div className="text-start">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mb-6"
          onClick={handleNavigate}
        >
          <div className="flex justify-center gap-1 items-center">
            <img src="/icons/add.svg" alt="add" className="h-6" />
            Tambah Artikel Baru
          </div>
        </button>
      </div>
      <h2 className="mb-4">Klik salah satu artikel untuk melihat preview artikel dan mengedit artikel</h2>
      {articles.length === 0 ? (
        <p>Tidak ada artikel.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              {/* Only show the title and main image */}
              <Link to={`/dashboardadmin/artikelshow/${article.id}`}>
                <div className="bg-gray-100 flex justify-between px-12 py-8 items-center rounded-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  <h3 className="text-3xl font-bold">{article.title}</h3>
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

              {/* Delete Button */}
              <div className="flex justify-center gap-2 -translate-y-5">
                
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
                  onClick={() => handleDelete(article.id)}
                >
                  <div className="flex justify-center gap-1 items-center">
                    <img src="/icons/delete.svg" alt="" className="h-6" />
                    Hapus Artikel
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtikelIndex;
