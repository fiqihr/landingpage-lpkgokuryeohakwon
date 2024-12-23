import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../../../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Editor } from "@tinymce/tinymce-react";

const ArtikelShow = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [article, setArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    mainImage: "",
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [otherImagesFiles, setOtherImagesFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle(docSnap.data());
        setEditForm({
          title: docSnap.data().title,
          content: docSnap.data().content,
          mainImage: docSnap.data().mainImage,
        });
      } else {
        console.log("No such document!");
      }
    };

    fetchArticle();
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };

  const handleOtherImagesChange = (e) => {
    setOtherImagesFiles([...e.target.files]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updateArticle = async (mainImageUrl, otherImagesUrls) => {
      const docRef = doc(db, "articles", id);

      try {
        await updateDoc(docRef, {
          title: editForm.title,
          content: editForm.content,
          mainImage: mainImageUrl || article.mainImage,
          images: otherImagesUrls.length > 0 ? otherImagesUrls : article.images,
        });
        setArticle((prev) => ({
          ...prev,
          title: editForm.title,
          content: editForm.content,
          mainImage: mainImageUrl || prev.mainImage,
          images: otherImagesUrls.length > 0 ? otherImagesUrls : prev.images,
        }));
        setIsEditing(false);
        alert("Article updated successfully!");
      } catch (error) {
        console.error("Error updating article: ", error);
      }
    };

    // Upload Main Image
    let mainImageUrl = "";
    if (mainImageFile) {
      const mainImageRef = ref(
        storage,
        `articles/${id}/mainImage/${mainImageFile.name}`
      );
      const uploadTask = uploadBytesResumable(mainImageRef, mainImageFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => reject(error),
          async () => {
            mainImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    // Upload Other Images
    const otherImagesUrls = [];
    for (let i = 0; i < otherImagesFiles.length; i++) {
      const imageRef = ref(
        storage,
        `articles/${id}/otherImages/${otherImagesFiles[i].name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, otherImagesFiles[i]);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            otherImagesUrls.push(downloadURL);
            resolve();
          }
        );
      });
    }

    // Update Article Document
    await updateArticle(mainImageUrl, otherImagesUrls);
  };

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div className="container mx-auto shadow-md rounded-lg p-8 w-2/3">
      <h4 className="text-5xl text-center my-8 font-bold">{article.title}</h4>
      {article.mainImage && (
        <div className="w-full md:w-1/2 lg:w-2/3 mx-auto mb-10 flex justify-center">
          <img
            src={article.mainImage}
            alt={`Main image for ${article.title}`}
            className="rounded-md"
          />
        </div>
      )}
      <div
        className="mt-4 text-sm mb-10"
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
        <div>
          <h4 className="mb-2">Gambar lain:</h4>
          <div className="flex h-48">
            {article.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Article ${article.title} image ${index + 1}`}
                height="200"
                className="rounded-md"
                style={{ marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Edit Button */}
      <div className="flex justify-center my-8">
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all"
          onClick={() => setIsEditing(true)}
        >
          <div className="flex justify-center gap-1 items-center">
            <img src="/icons/edit.svg" alt="" className="h-6" />
            Edit Artikel
          </div>
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "90%", // Membuat modal lebih responsif
            maxHeight: "80vh", // Batas tinggi modal
            overflowY: "auto", // Menambahkan scrollbar
          }}
        >
          <h2 className="text-center font-bold text-4xl">Edit Artikel</h2>
          <hr className="my-4" />
          <form onSubmit={handleEditSubmit}>
            <div className="flex flex-col gap-2">
              <label>Judul:</label>
              <input
                className="text-3xl border-2 border-gray-300 p-2 rounded-md font-bold"
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="flex flex-col mt-6 gap-2">
              <label>Gambar Utama:</label>
              <div className="">
                <img
                  src={article.mainImage}
                  alt=""
                  className="h-48 rounded-md"
                />
              </div>
              <p className="mt-4 italic text-sm text-gray-500">
                Klik tombol di bawah jika ingin mengganti gambar lain.
              </p>
              <input type="file" onChange={handleMainImageChange} />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <label>Konten:</label>
              <Editor
                apiKey="1qhwnpeksizzisymv27tspbi71t4611qy51xrbokgjo8dzfi"
                value={editForm.content}
                onEditorChange={(content) =>
                  setEditForm({ ...editForm, content })
                }
                init={{
                  height: 500,
                  menubar: "format",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " + // Menambahkan formatselect untuk pilihan heading
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  style_formats: [
                    // Menambahkan style format untuk heading
                    { title: "Heading 1", block: "h1" },
                    { title: "Heading 2", block: "h2" },
                    { title: "Heading 3", block: "h3" },
                    { title: "Paragraph", block: "p" },
                  ],
                }}
              />
            </div>
            {/* <div>
              <label>Konten:</label>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
                required
              />
            </div> */}
            <div className="mb-4 flex flex-col mt-6 gap-2 ">
              <label>Gambar Lain:</label>
              <div className="flex  gap-3">
                {article.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Article ${article.title} image ${index + 1}`}
                    width="150"
                    className="h-full object-contain rounded-md"
                    style={{ marginRight: "10px" }}
                  />
                ))}
              </div>
              <p className="mt-4 italic text-sm text-gray-500">
                Klik tombol di bawah jika ingin mengganti gambar lain.
              </p>
              <input type="file" multiple onChange={handleOtherImagesChange} />
              <p className="mt-4 italic text-sm text-gray-500">
                Klik tombol <strong>Ctrl</strong> dan pilih gambar yang diinginkan, saat ingin memilih banyak gambar.
              </p>
            </div>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            <div className="flex justify-end">
              <button
                className="w-40 bg-primary text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mt-6"
                type="submit"
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/update.svg" alt="save" className="h-6" />
                  Update
                </div>
              </button>
              <button
                className="w-40 bg-red-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mt-6"
                type="button"
                onClick={() => setIsEditing(false)}
                style={{ marginLeft: "10px" }}
              >
                <div className="flex justify-center gap-1 items-center">
                  <img src="/icons/delete.svg" alt="Batal" className="h-6" />
                  Batal
                </div>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Overlay for modal */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setIsEditing(false)}
        ></div>
      )}
    </div>
  );
};

export default ArtikelShow;
