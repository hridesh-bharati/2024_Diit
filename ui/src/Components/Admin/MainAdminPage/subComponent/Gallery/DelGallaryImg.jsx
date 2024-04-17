import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProgramPictures = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/admin/getPhotos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('aJwt')
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images.");
      }

      const responseData = await response.json();
      setImages(responseData);
    } catch (error) {
      toast.error("Error fetching images: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPhoto = async () => {
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    try {
      setIsLoading(true);

      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "hridesh99!");
      data.append("cloud_name", "draowpiml");

      const response = await fetch('https://api.cloudinary.com/v1_1/draowpiml/image/upload', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const responseData = await response.json();
      setUrl(responseData.url);
      toast.success("Image uploaded successfully.");
      // Refresh images after upload
      fetchImages();
    } catch (error) {
      toast.error("Error uploading image: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToServer = async () => {
    if (!name || !category || !url) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3000/admin/pushPhoto', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('aJwt')
        },
        body: JSON.stringify({
          name: name,
          category: category,
          url: url
        })
      });

      if (!response.ok) {
        throw new Error("Failed to upload data.");
      }

      const responseData = await response.json();
      toast.success(responseData.message);
      // Refresh images after upload
      fetchImages();
    } catch (error) {
      toast.error("Error uploading data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteImage = async (_id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/admin/deletePhoto/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('aJwt')
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      setImages(prevImages => prevImages.filter(img => img._id !== _id));

      toast.success("Image deleted successfully.");
    } catch (error) {
      toast.error("Error deleting image: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div>
      <div className="container text-center py-3 h2 fw-bolder text-uppercase" style={{ color: 'white', backgroundColor: '#012C5' }}>
        Delete <font color="red">Gallery Images</font>
      </div>

      <div className="container">
        <div className="row">
          {images.map((image, index) => (
            <div className="col-md-3" key={index}>
              <div className="card mb-3">
                <img src={image.url} className="card-img-top" alt={image.name} />
                <div className="card-body text-start p-0 m-0 px-1">
                  <h6 className="card-title p-0 m-0">{image.name}</h6>
                  <p className="card-text small text-primary fs-6 p-0 m-0"><small>{image.category}</small></p>
                  <button className="btn btn-danger rounded-pill px-2 p-1 position-absolute top-0 end-0" onClick={() => deleteImage(image._id)} disabled={isLoading}>
                    {isLoading ? "Deleting..." : <i className="bi bi-trash3-fill text-white"></i>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProgramPictures;
