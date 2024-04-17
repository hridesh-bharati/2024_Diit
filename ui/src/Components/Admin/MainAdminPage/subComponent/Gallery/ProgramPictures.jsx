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
            // Remove the deleted image from the images state
            setImages(prevImages => prevImages.filter(img => img._id !== _id));
            toast.success("Image deleted successfully.");
        } catch (error) {
            toast.error("Error deleting image: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="row m-auto text-center">
            <div className="container text-center border-bottom py-3 h2 fw-bolder text-uppercase" style={{ color: 'white', backgroundColor: '#012C5' }}>
                Upload <font color="red">Gallery Images</font>
            </div>
            <div className="container col-md-5 my-lg-5">
                <div className="mb-3 input-group">
                    <input type="file" name='file' className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                    <button type='button' className='btn btn-warning' onClick={uploadPhoto} disabled={isLoading}>
                        <i className="bi bi-upload"></i> Upload
                    </button>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Photo Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Category" onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={uploadToServer} disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Push"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProgramPictures;
