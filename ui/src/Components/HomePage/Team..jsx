import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import '../../App.css';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

export default function App() {
    const BgTeam = {
        background: `linear-gradient(rgba(0, 0, 20, 0.8) ,rgba(14, 15, 16, 0.933)), url(images/vender/map2.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px'
    }

    const expertData = [
        {
            name: "Mr. Ajay Tiwari",
            role: "Owner of DIIT",
            image: "images/team/team1.png"
        },
        {
            name: "Santosh Singh Chauhan",
            role: "Manager",
            image: "images/team/team2.png"
        },
        {
            name: "Manjesh Vishwakarma",
            role: "Teacher",
            image: "images/team/team3.png"
        },
        {
            name: "Hridesh Bharati",
            role: "Teacher",
            image: "images/team/team4.jpg"
        }
    ];

    return (
        <div className='py-1' style={{ ...BgTeam }}>
            <span className="w-100 d-block text-center my-4">
                <h1 className="fw-bolder text-warning" data-aos="fade-right" data-aos-duration="500" style={{ textShadow: '5px 5px 5px black' }}> Expert Instructors </h1>
            </span>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 350,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Autoplay]}
                className="mySwiper"
            >
                {expertData.map((expert, index) => (
                    <SwiperSlide key={index} className='swiper-slide'>
                        <div className="card px-5 py-2 team m-2 text-center rounded" id={`expert${index + 1}`}>
                            <img src={expert.image} style={{ border: '5px solid lightgray' }} className="card-img-top img-size rounded-circle" alt={expert.name} />
                            <span className="w-100 fw-bold" style={{ color: 'red' }}>{expert.name}</span>
                            <small className="fw-normal text-center text-success">{expert.role}</small>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
