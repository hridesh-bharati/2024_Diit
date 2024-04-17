import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import Typed from 'typed.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UniversalContext } from "../../context/universal";
import { Link } from "react-router-dom";
import TopCourseList from "../TopCourse/TopCourseList";
// import PhotoGallary from "./PhotoGallary";
import LiveCards from "./Feature";
import FooterSlider from "../Footer/FooterSlider";
import ToastCard from "./Toast/ToastCard";
import ButtomToTop from "./Toast/ButtomToTop";
import TeamComponent from "./Team.";
import Testimonial from "./Testimonial";
import Marquee from "../PauseMarquee/PauseMarquee";
import QueryForm from "./QueryFrom";
import Footer from "../Footer/Footer";
import Lock from "./LockWeb/Lock";
function Home() {
    // Lock();
    useEffect(() => {
        const greetUser = () => {
            const welcomeText = "नमस्कार, डृष्टी कम्प्यूटर सेंटर में आपका स्वागत है। हम आपकी उज्जवल भविष्य की कामना करते हैं।";
            // Check if browser supports Web Speech API
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(welcomeText);
                utterance.lang = 'hi-IN';
                window.speechSynthesis.speak(utterance);
            } else {
                // Web Speech API is not supported
                console.error("Text-to-speech is not supported in your browser.");
            }
        };
        greetUser();
    }, []); // Run only once on component mount
    const [verified, setVerified] = useState(false)
    function onChange(value) {
        setVerified(true)
    }
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const { adminLogin } = useContext(UniversalContext);
    const aToken = localStorage.getItem('aJwt');
    const clrqury = (() => {
        setFullName('');
        setMobile('');
        setEmail('');
        setTitle('');
        setQuery('');
    })
    const getAllNotice = (async () => {
        await fetch("http://localhost:3000/admin/getAllNotice").then(res => res.json())
            .then((data) => {
                setNotice(data);
                clrqury();
            }).catch((error) => {
                console.log(error);
            });
    });
    const sendQuery = (async () => {
        if (fullName && mobile && email && title && query) {
            await fetch("http://localhost:3000/queryNow", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, mobile, email, title, query })
            }).then(res => res.json())
                .then((res) => {
                    if (res.mError) {
                        toast.error('Some Error Occured');
                    } else {
                        toast.success('Query has been Sent');
                        const audio = new Audio("/audio/ring.mp3");
                        audio.play();
                        clrqury();
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    })
    useEffect(() => {
        if (aToken) {
            navigate('/Admin');
        }
        getAllNotice();
    }, [])
    useEffect(() => {
        const typed = new Typed('#element', {
            strings: ['<span className="hideFont">“<b style="color:red !important;">Drishtee </b> envisions a world where all communities are empowered to achieve shared prosperity.”</span>'],
            typeSpeed: 55,
            loop: true,
        });
        return () => {
            typed.destroy();
        };
    }, []);
    // ---------------------Dynamic Carousel -----------------------
    const images = ['images/mainSlider/slider1.webp', 'images/mainSlider/slider2.webp', 'images/mainSlider/slider3.webp', 'images/mainSlider/slider4.webp'];
    return (
        <div id="Home" >
            <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner MainCarousel">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={image} className="w-100" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
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

            <section className="fw-medium " id="MarqueeWelcomeHome">
                <Marquee behavior="alternate" scrollamount="15"> Welcome to India No.1 Education Brand in India a
                    <span className="text-danger"> DRISHTEE COMPUTER CENTER </span>   </Marquee>
                <Marquee className="HindiFont" direction="left"> ISO 9001 :
                    2008 द्वारा प्रमाणित &amp; भारत सरकार द्वारा पंजीकृत संस्था || DOEACC द्वारा पंजीकृत संस्था || हर कोर्स पूरा
                    करने पर फ्री प्रमाणपत्र || योग्य एवं अनुभवी प्रशिक्षकों द्वारा प्रशिक्षण || प्रमाण पत्र को इंटरनेट से जानने
                    सुविधा, इत्यादी........
                    <img src="images/icon/gifPic.gif" height={10} />
                </Marquee>
            </section >
            <div className="card w-100 rounded-0 mb-4" style={{ background: 'var(--mainBgColor)' }}>
                <div className="row g-0 m-3 mb-0">
                    <div className="col-12">
                        <div className="row py-5 px-4 text-white align-items-center justify-content-center" style={{ background: "#012C57" }}>
                            <div className="col-md-10">
                                <h2 className="fw-bolder">Call To Action</h2>
                                <span className="lh-sm">Drishtee Institute of Information Technology inaugurated at a new place Paragpur Road, next to Life Care Pharma, near Ramharsha Inter College, Nichaul, Maharajganj</span>
                            </div>
                            <div className="col-md-2">
                                <Link to="/contact" className="btn btn-outline-light fw-medium border border-2 mt-4">Call To Action</Link>
                            </div>
                        </div>
                        <p className="py-3" id="aboutText">
                            <b style={{ color: 'rgb(1, 143, 1)' }}>Where Dreams come true</b> Drishtee Institute Of information Technology aims to impart Government approved & recognized courses in the field of computer application.....DIIT is a modern educational Institute setup to inculcate in its students values & attitude that will help them to keep up global perspective and work towards achieving high career grow. <b style={{ color: 'red' }}>Drishtee Institute Of Information Technology in Nichlaul</b>, Maharajganj is a reliable name in the industry as they aim to deliver the best experience to their customers. This has helped them build up a loyal customer base. They started their journey in 2005 and ever since, they have ensured that the customer remains at the centre of their business operations and philosophy. As they are located in a favourable neighbourhood, exactly at Paragpur Road, in side of Ramharsh inter collage, Nichlaul-273304, it is easy to locate Drishtee Institute Of Information Technology on the. For any kind of assistance or questions, it is best to contact them directly during their business hours.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-fluid my-4 py-4" id="CourseContainer" >
                <div className="row text-center">
                    <div className="col-12 " >
                        <h1 className="fw-bolder text-danger " id="courseTitle" data-aos="fade-up" data-aos-duration="1000">TOP
                            COURSE</h1>
                    </div>
                </div>
                <TopCourseList />
            </div>
            <TeamComponent />
            <div style={{ border: 'var(--borderColor)' }}
                className="carousel slide text-center " data-bs-ride="carousel" id="carouselExampleInterval">
                <span className=" w-100 d-block text-center p-2">
                    <h5 className="text-uppercase fw-bolder pt-4" data-aos="fade-up" data-aos-duration="500" style={{ color: 'white' }}
                        id="TestimonialHead"> What our DIIT students are saying about us </h5>
                </span>
                <Testimonial />
            </div>
            <div className="container-fluid py-5 text-center " id="">
                <h2 className="py-4 text-danger" data-aos="fade-up" data-aos-duration="1500">
                    Features And Updates
                </h2>
                <center className="hideFont fw-medium" id="FeatureTextOne">
                    <span id="element"></span>
                </center>
                <p align="center" className="showFont" id="FeatureTextTwo">“ <b style={{ color: 'red' }}>Drishtee </b>
                    envisions a world where all communities are empowered to achieve shared prosperity.“
                </p>
                <div className="container-fluid pt-0">
                    <div className="row">
                        <div className="col-md-6 my-1 p-0 px-1 ">
                            <div className="card cardBoxShadow border-0" style={{ background: 'white' }} id="openingHour">
                                <div className="card-header h4 text-white text-uppercase text-start" style={{ background: 'var(--cardHeadColor)' }}>
                                    <div data-aos="fade-right"><i className="fa fa-line-chart text-warning"></i> Opening hours</div>
                                </div>
                                <div className="card-body cardBoxShadow" id="FeaturesTableColor">
                                    <table className="table table-bordered border-info table-hover border-opacity-50">
                                        <tbody className="fw-normal " style={{ textAlign: 'start' }} >
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                                                <tr key={index}>
                                                    <td className="transparentTableData">
                                                        <img src="images/icon/arrow.png" className="img-fluid" width="30px" /> {day} :
                                                    </td>
                                                    <td className="transparentTableData"> 07am - 07pm </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 my-1 p-0 px-1" >
                            <div className="card border-0 cardBoxShadow" >
                                <div className="card-header h4 text-white text-start" style={{ background: "var(--cardHeadColor )" }}>
                                    <div data-aos="fade-right"> <i className="bi bi-bell-fill text-warning "></i> NOTICE BOARD</div>
                                </div>
                                <div className="card-body fw-normal FeatureCard2 my-0 py-0 " id="tableData">
                                    <Marquee direction="up" scrollamount="3" behavior="scroll">
                                        <small>[1]. Course certified by Microsoft.</small>
                                        <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" alt="" />
                                        <hr width="90%" />
                                        <small>[2]. CCC free on ADCA course</small>
                                        <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" alt="" />
                                        <hr width="90%" />
                                        <small>[5]. Free English Speaking & Personality Development classNames</small>
                                        <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" alt="" />
                                        <hr width="90%" />
                                        <small className="HindiFont">[6]. प्रत्येक पाठ्यक्रम के पूरा होने पर नि: शुल्क प्रमाण पत्र।</small>
                                        <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" alt="" />
                                        <hr width="90%" />
                                        <small>[7]. GOVT. recognized institute</small>
                                        <hr width="90%" />
                                    </Marquee>
                                </div>
                                <Marquee className="py-2" behavior="scroll" direction="left" id="LinkData">
                                    <Link to="/Verification" className="blink"><b>
                                        अपनी प्रमाणपत्र की स्थिति जानने के लिए क्लिक करें </b></Link>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <PhotoGallary /> */}
            <ToastCard />
            <LiveCards />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12" id="RegistrationContainer">
                        <div className="row my-4">
                            <div className="col-md-8 d-flex justify-content-center align-content-center m-auto p-2 text-white" >
                                <div className="row">
                                    <h2 className="text-center text-warning fw-bolder">Hello Everyone....! here you can see your all offer's that send by<b> drishtee computer center.</b></h2>
                                    <div className="col-12">
                                        {
                                            notice.map((data) => {
                                                return (
                                                    <div key={data._id} className="fw-bolder w-100 my-3 p-2" data-aos="fade-right" data-aos-duration="1500" id={data._id}>
                                                        <h1 className="fw-bolder  px-5">
                                                            <font color="red"><img src="/images/icon/arrow.png" alt="" /> {data.title}</font>
                                                        </h1>
                                                        <div className="container text-white ps-2 mx-3">
                                                            {data.nMessage}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 py-4" style={{ overflowX: 'hidden' }}>
                                <div className="row p-0 border m-0 text-white " id="Myform" data-aos="fade-left" >
                                    <QueryForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ButtomToTop />
            <FooterSlider />
            <Footer />
        </div>
    );
}
export default Home;
