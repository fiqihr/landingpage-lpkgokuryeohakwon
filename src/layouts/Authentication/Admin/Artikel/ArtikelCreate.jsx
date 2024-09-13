import React, { useState } from "react";
import { db, storage } from "../../../../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ArtikelCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mainImageURL, setMainImageURL] = useState(""); // URL untuk main image

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mengupload main image ke Firebase Storage
    let mainImageDownloadURL = "";
    if (mainImage) {
      const mainImageRef = ref(storage, `articles/${title}/main_${mainImage.name}`);
      const mainImageUploadTask = uploadBytesResumable(mainImageRef, mainImage);

      mainImageUploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading main image:", error);
        },
        async () => {
          mainImageDownloadURL = await getDownloadURL(mainImageUploadTask.snapshot.ref);
          setMainImageURL(mainImageDownloadURL); // Set URL setelah upload selesai
          uploadArticle(mainImageDownloadURL); // Panggil fungsi untuk upload artikel setelah main image di-upload
        }
      );
    } else {
      uploadArticle(mainImageDownloadURL); // Jika tidak ada main image, langsung upload artikel
    }
  };

  const uploadArticle = async (mainImageDownloadURL) => {
    const uploadedImages = [];
    const storageRef = ref(storage, `articles/${title}/`);

    // Mengupload semua gambar lainnya ke Firebase Storage
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storageRef, images[i].name);
      const uploadTask = uploadBytesResumable(imageRef, images[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          uploadedImages.push(downloadURL);

          // Jika semua gambar sudah terupload, simpan data artikel ke Firestore
          if (uploadedImages.length === images.length) {
            try {
              await addDoc(collection(db, "articles"), {
                title,
                content,
                mainImage: mainImageDownloadURL, // URL main image
                images: uploadedImages, // URL untuk gambar lainnya
                createdAt: new Date(),
              });
              alert("Artikel berhasil ditambahkan!");
              setTitle("");
              setContent("");
              setMainImage(null);
              setImages([]);
              setUploadProgress(0);
              setMainImageURL("");
            } catch (error) {
              console.error("Error adding article:", error);
            }
          }
        }
      );
    }
  };

  return (
    <div>
      <h2>Create Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Main Image:</label>
          <input type="file" onChange={handleMainImageChange} required />
        </div>
        <div>
          <label>Other Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArtikelCreate;
