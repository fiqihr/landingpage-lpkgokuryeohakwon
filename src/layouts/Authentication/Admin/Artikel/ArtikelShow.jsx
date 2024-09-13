import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../../../firebase/firebase"; // Sesuaikan path dengan konfigurasi firebase Anda
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
      const mainImageRef = ref(storage, `articles/${id}/mainImage/${mainImageFile.name}`);
      const uploadTask = uploadBytesResumable(mainImageRef, mainImageFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      const imageRef = ref(storage, `articles/${id}/otherImages/${otherImagesFiles[i].name}`);
      const uploadTask = uploadBytesResumable(imageRef, otherImagesFiles[i]);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>

      {/* Display Main Image */}
      {article.mainImage && (
        <div>
          <h4>Main Image:</h4>
          <img
            src={article.mainImage}
            alt={`Main image for ${article.title}`}
            width="400"
            style={{ marginBottom: "10px" }}
          />
        </div>
      )}

      {/* Display Other Images */}
      {article.images && article.images.length > 0 && (
        <div>
          <h4>Other Images:</h4>
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

      {/* Edit Button */}
      <button onClick={() => setIsEditing(true)}>Edit</button>

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
          }}
        >
          <h3>Edit Article</h3>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Main Image:</label>
              <input type="file" onChange={handleMainImageChange} />
            </div>
            <div>
              <label>Other Images:</label>
              <input type="file" multiple onChange={handleOtherImagesChange} />
            </div>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            <button type="submit">Save Changes</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
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
        ></div>
      )}
    </div>
  );
};

export default ArtikelShow;
