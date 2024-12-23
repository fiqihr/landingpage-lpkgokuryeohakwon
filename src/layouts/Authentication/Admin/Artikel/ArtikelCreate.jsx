import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor
import { db, storage } from "../../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const ArtikelCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // TinyMCE content
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mainImageURL, setMainImageURL] = useState(""); // URL untuk main image
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mainImageDownloadURL = "";
    if (mainImage) {
      const mainImageRef = ref(
        storage,
        `articles/${title}/main_${mainImage.name}`
      );
      const mainImageUploadTask = uploadBytesResumable(mainImageRef, mainImage);

      mainImageUploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading main image:", error);
        },
        async () => {
          mainImageDownloadURL = await getDownloadURL(
            mainImageUploadTask.snapshot.ref
          );
          setMainImageURL(mainImageDownloadURL);
          uploadArticle(mainImageDownloadURL);
        }
      );
    } else {
      uploadArticle(mainImageDownloadURL);
    }
  };

  const uploadArticle = async (mainImageDownloadURL) => {
    const uploadedImages = [];
    const storageRef = ref(storage, `articles/${title}/`);

    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storageRef, images[i].name);
      const uploadTask = uploadBytesResumable(imageRef, images[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          uploadedImages.push(downloadURL);

          if (uploadedImages.length === images.length) {
            try {
              await addDoc(collection(db, "articles"), {
                title,
                content, 
                mainImage: mainImageDownloadURL,
                images: uploadedImages,
                createdAt: new Date(),
              });
              alert("Artikel berhasil ditambahkan!");
              navigate("/dashboardadmin");
              // setTitle("");
              // setContent("");
              // setMainImage(null);
              // setImages([]);
              // setUploadProgress(0);
              // setMainImageURL("");
            } catch (error) {
              console.error("Error adding article:", error);
            }
          }
        }
      );
    }
  };

  return (
    <div className="my-20 container mx-auto w-2/3 bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-center text-4xl font-bold mb-8">Buat Artikel Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Judul:</label>
          <input
            className="text-3xl border-2 border-gray-300 p-2 rounded-md font-bold"
            type="text"
            placeholder="Judul Artikel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label>Gambar Utama: </label>
          <input type="file" onChange={handleMainImageChange} required />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label>Konten:</label>
          <Editor
            apiKey="1qhwnpeksizzisymv27tspbi71t4611qy51xrbokgjo8dzfi"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
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

        <div className="flex flex-col mt-6 gap-2">
          <label>Gambar Lain:</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:-translate-y-1 hover:shadow-md transition-all mt-6"
            type="submit"
          >
            <div className="flex justify-center gap-1 items-center">
              <img src="/icons/save.svg" alt="save" className="h-6" />
              Publish Artikel
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtikelCreate;
