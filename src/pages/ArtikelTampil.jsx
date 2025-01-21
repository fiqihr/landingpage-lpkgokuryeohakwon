import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { doc, getDoc } from "firebase/firestore";
import { NavbarSimple } from "../layouts/Navbar";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { id } from "date-fns/locale";
import Footer from "../layouts/Footer";

const ArtikelTampil = () => {
  const { id: articleId } = useParams(); // Mengambil ID dari URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", articleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setArticle({
          ...data,
          createdAt: data.createdAt?.toDate() || null,
        });
      } else {
        console.log("Tidak ada artikel...");
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return (
      <>
        <NavbarSimple />
        <div className="py-20 container mx-auto">
          <div className="mx-auto px-4 w-full h-screen lg:w-2/3 flex justify-center items-center">
            <p className="italic text-sm">Loading artikel...</p>
          </div>
        </div>
      </>
    );
  }

  const formattedDate = article.createdAt
    ? differenceInDays(new Date(), article.createdAt) < 30
      ? formatDistanceToNow(article.createdAt, { addSuffix: true, locale: id })
      : format(article.createdAt, "EEEE, dd MMMM yyyy", { locale: id })
    : "-";

  return (
    <>
      <NavbarSimple />
      <div className="py-20 container mx-auto">
        <div className="mx-auto px-4 w-full lg:w-2/3">
          <div className="mt-20 ">
            <h4 className="text-4xl font-bold text-left">{article.title}</h4>
          </div>
          <p className="mt-4 text-sm italic text-gray-500">{formattedDate}</p>
          <hr className="my-5 border-gray-200" />
          {article.mainImage && (
            <div className="w-full md:w-1/2 lg:w-2/3 mx-auto mb-10">
              <img
                src={article.mainImage}
                alt={`Main image for ${article.title}`}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
          )}
          <div
            className="mt-4 mb-10"
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/<h1>/g, '<h1 class="text-4xl font-bold">')
                .replace(/<h2>/g, '<h2 class="text-3xl font-semibold">')
                .replace(/<h3>/g, '<h3 class="text-2xl font-medium">')
                .replace(/<h4>/g, '<h4 class="text-xl font-medium">')
                .replace(/<h5>/g, '<h5 class="text-lg font-medium">')
                .replace(/<h6>/g, '<h6 class="text-base font-medium">'),
            }}
          ></div>

          {/* Display Other Images */}
          {article.images && article.images.length > 0 && (
            <div className="flex h-52 gap-3">
              {article.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Article ${article.title} image ${index + 1}`}
                  width="200"
                  className="h-full object-contain rounded-md"
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
