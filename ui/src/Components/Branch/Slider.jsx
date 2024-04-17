import React from 'react';

export default function Slider() {

    return (
        <div>
            <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <img src="./images/vender/diitOffice2.jpg" className="d-block w-100 img-fluid h-100" alt="Slide 1" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="./images/vender/diit2Lab.jpg" className="d-block w-100 img-fluid h-100" alt="Slide 2" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="./images/vender/diitOffice.jpg" className="d-block w-100 img-fluid h-100" alt="Slide 3" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="./images/vender/pooja.jpg" className="d-block w-100 img-fluid h-100" alt="Slide 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
