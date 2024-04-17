import React from 'react';

export default function Testimonial() {
    const testData = [
        {
            name: "Abhay Gautam",
            role: "Web Designer",
            image: "images/vender/abhay.jpg",
            text: "It is my immense luck and fortune to be the part of Drishtee computer center where I can grow. The teacher leaves no stone unturned to shape one's future. Huge respect, love and devotion for entire faculty members and all batches. It's their efforts that make me count myself among better professionals."
        },
        {
            name: "Abhay Gautam",
            role: "Web Designer",
            image: "images/vender/abhay.jpg",
            text: "It is my immense luck and fortune to be the part of Drishtee computer center where I can grow. The teacher leaves no stone unturned to shape one's future. Huge respect, love and devotion for entire faculty members and all batches. It's their efforts that make me count myself among better professionals."
        }
    ];

    return (
        <div className="container m-auto">
            <div className="carousel-inner pb-4 my-4" id="TestimonialChild">
                {testData.map(({ name, role, image, text }, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3000">
                        <img className="rounded-circle cardBoxShadow" src={image} alt="DIIT Student" style={{ width: "150px" }} />
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8"><span className="fw-bold"> <h4 className="m-0 p-0 text-danger">
                                {name}
                            </h4>
                                <font color="yellow">
                                    {role}
                                </font>
                            </span>
                                <p id={`PortfolioText${index + 1}`}>
                                    <i className="bi bi-quote fs-2" style={{ color: "maroon" }}></i> <br />
                                    <span className="fw-normal text-white" id={`testimoniaFirstText${index + 1}`}>
                                        {text}
                                    </span>
                                    <br />
                                    <i className="fa fa-quote-right" aria-hidden="true" style={{ color: 'maroon' }}></i>
                                </p>
                            </div>
                        </div>
                        <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                            {[...Array(5)].map((_, starIndex) => (
                                <li key={starIndex}><i className="bi bi-star-fill"></i></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
