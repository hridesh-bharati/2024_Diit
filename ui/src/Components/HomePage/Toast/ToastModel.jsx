import React, { useState } from 'react';
import QueryForm from '../QueryFrom';

const ToastModel = ({ enquiryForm }) => {
  const [formData, setFormData] = useState({
    fname: '',
    contact: '',
    email: '',
    message: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      fname: '',
      contact: '',
      email: '',
      message: ''
    });
  }
  return (
    <div>
      <div className="modal fade m-0 p-0 myMOdal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body bg-primary text-white card">
              <QueryForm />
            </div>
          </div>
        </div>
      </div>
      <p className="m-0 p-0 px-2">
        <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={enquiryForm}>Get Help</a>
      </p>
    </div>
  );
}

export default ToastModel;
