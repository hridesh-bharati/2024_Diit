import React, { useState, useEffect } from 'react';
// import UserStatus from '../../Stetus/Stetus';
import Modal from 'react-bootstrap/Modal'; // Import the Modal component from react-bootstrap
import Footer from '../Footer/Footer';
export default function PhotoGallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image for larger view
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/admin/getPhotos', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('aJwt')
          },
          body: JSON.stringify({
          })
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const responseData = await response.json();
        setImages(responseData); // Assuming responseData is an array of image objects
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const galleryStyles = {
    backgroundImage: 'url("/images/vender/gallarys.webp")',
    height: '200px',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginTop: '5.4rem',
    position: 'relative',
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  return (
    <div className='container-fluid mx-0 px-0 py-5' style={galleryStyles}>
      <div style={overlayStyles}></div>
      <div className=" text-center text-white py-5 my-5">
        <h1 className="fw-bolder py-2 z-3 Myposition text-white d-flex justify-content-center align-items-center ">
          &nbsp; <i className="fa fa-picture-o text-white" aria-hidden="true"></i> &nbsp;GALLERY
        </h1>
      </div>
      {isLoading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <div>
          <div className="row row-cols-1 row-cols-md-4 g-4 m-3 py-4">
            <h6 className='w-100 text-center'>
              Our gallery section is a showcase of our work, people and culture. Here, you can see a diverse collection of images.
            </h6>
            {images.map((image, index) => (
              <div className="col" key={index}>
                <div className="card" onClick={() => handleImageClick(image)}>
                  <img src={image.url} className="card-img-top img-fluid h-100" style={{ cursor: 'pointer' }} alt={image.name} />
                  <div className="card-body my-0 p-1 d-flex justify-content-between bg-white">
                    <h5 className="card-title my-0 py-0">{image.name}</h5>
                    <p className="card-text my-0 py-0">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal show={selectedImage !== null} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              {/* <Modal.Title>{selectedImage && selectedImage.name}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              {selectedImage && (
                <img src={selectedImage.url} className="img-fluid card bg-primary m-auto" alt={selectedImage.name} />
              )}
            </Modal.Body>
          </Modal>
        </div>
      )
      }
      <Footer />
    </div>
  );
}
