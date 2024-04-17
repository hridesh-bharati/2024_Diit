import React from 'react';
import { Link } from 'react-router-dom';
const TopCourseList = () => {
  const images = [
    { src: "images/vender/node.png", title: "node" },
    { src: "images/vender/mongodb.png", title: "mongoDB" },
    { src: "images/vender/react.webp", title: "React" },
    { src: "images/vender/mca.webp", title: "MCA" },
    { src: "images/vender/graphic.webp", title: "DTP" },
    { src: "images/vender/adca.png", title: "ADCA+" },
    { src: "images/vender/web.png", title: "Web Development" },
    { src: "images/vender/python-training.jpg", title: "Python Programming" },
    { src: "images/vender/soft.png", title: "Software Development" },
    { src: "images/vender/o-level.png", title: "O Level" },
    // { src: "images/vender/office.png", title: "Microsoft Office" },
    { src: "images/vender/ccc.jpg", title: "CCC" },
    { src: "images/vender/hardware.png", title: "CHN" },
  ];

  return (
    <div className="card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '5px' }}>
      {images.map((image, index) => (
        <div key={index} className="card p-1 m-2 cardBoxShadow" style={{ background: '#fff' }} data-aos="zoom-in">
          <img src={image.src} className="img-fluid img-thumbnail h-100 card-img-top" alt={image.title} />
          {/* <p>{image.title}</p> */}
          <button className='btn btn-primary p-0 mx-1 btn-sm small'><Link to="/AdmissionForm" className='text-white nav-link'>Apply</Link></button>
        </div>
      ))}
    </div>
  );
};

export default TopCourseList;
