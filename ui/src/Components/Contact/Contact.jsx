import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { UniversalContext } from "../../context/universal";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import enquiryBg from "../../../public/images/vender/enquiryBg.png";
import Footer from "../Footer/Footer";

function Contact() {
    const [verified, setVerified] = useState(false);
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const { adminLogin } = useContext(UniversalContext);

    const clrqury = () => {
        setFullName('');
        setMobile('');
        setEmail('');
        setTitle('');
        setQuery('');
    }

    const validateMobile = (mobileNumber) => {
        const mobileRegex = /^(?:\d{10}|\d{12})$/;
        return mobileRegex.test(mobileNumber);
    }

    const sendQuery = async () => {
        if (!fullName || !mobile || !email || !title || !query) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (!validateMobile(mobile)) {
            toast.error('Please enter a valid mobile number with 10 or 12 digits.');
            return;
        }

        if (!verified) {
            toast.error('Please verify that you are not a robot.');
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/queryNow", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, mobile, email, title, query })
            });

            const data = await res.json();
            if (data.mError) {
                toast.error('Some Error Occurred');
            } else {
                toast.success('Query has been Sent');
                const audio = new Audio("/audio/ring.mp3");
                audio.play();
                clrqury();
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while sending the query.');
        }
    }

    useEffect(() => {
        const aToken = localStorage.getItem('aJwt');
    }, [])

    function onChange(value) {
        setVerified(true)
    }

    const enquiryBgImg = {
        backgroundImage: `url(${enquiryBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const contactCards = [
        {
            iconClass: "fa fa-home fs-2",
            title: "VISIT-AT",
            addresses: [
                "Paragpur raod Near Ramharsh Inter Collage Nichlaul Maharajganj U.P.",
                "Main market Road in front of Rauniyar chitra mandir Thoothibari Maharajganj U.P."
            ]
        },
        {
            iconClass: "bi bi-telephone-fill    fs-2",
            title: "CALL-US",
            contacts: [
                { title: "Mr. Ajay Tiwari", number: "9918151032" },
                { title: "Mr Santosh Singh Chauhan", number: "7398889347" }
            ]
        },
        {
            iconClass: "bi bi-envelope-fill   fs-2",
            title: "E:Mail-US",
            emails: [
                { title: "Mr. Ajay Tiwari", email: "ajaytiwari4@gmail.com" },
                { title: "Mr Santosh Singh Chauhan", email: "Drishteeeducation@yahoo.com" }
            ]
        }
    ];

    return (
        <div>
            <div className="container-fluid mx-0 px-0">
                <div className="row w-100 mx-0 px-0">
                    <div className="col-12 mx-0 px-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56717.06933081362!2d83.65242092167965!3d27.318920499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399419806e859715%3A0x542e82fbb42e0941!2sDRISHTEE%20INSTITUTE%20OF%20INFORMATION%20TECHNOLOGY%20NICHLAUL!5e0!3m2!1sen!2sin!4v1697193938273!5m2!1sen!2sin"
                            width="100%" height="600" style={{ border: '0' }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div className="row m-0 p-0" style={enquiryBgImg}>
                    <div className="col-12 py-4  d-flex justify-content-center flex-column align-items-center" id="ContactHeader">
                        <span className=" w-100 d-block  text-center ">
                            <div data-aos="fade-down">
                                <h1 className=" fw-bolder text-warning" style={{ textShadow: '5px 5px 5px black' }}>
                                    CONTACT-US
                                </h1>
                            </div>
                        </span>
                        <div data-aos="fade-up">
                            <h5 className="text-primary fw-bolder d-flex my-4 pb-4">
                                <Link to="/Home" className="nav-link fw-bolder text-info ">
                                    <i className="fa fa-home "></i> HOME </Link>
                                &nbsp; <span className="text-light">/ CONTACT US</span>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="row m-0 p-0 d-flex align-items-start justify-content-center my-5 fw-bolder">
                    {contactCards.map((card, index) => (
                        <div key={index} className="card p-0 m-0 my-2 col-md-4 transparentTableData border border-0  ">
                            <div className="row m-0 p-0 d-flex justify-content-center">
                                <div className="col-11 rounded rounded-25  m-0 p-0 ZoomCard  myshadow " data-aos="zoom-in">
                                    <div className="card-header  text-white text-center"
                                        style={{ background: 'var(--cardHeadColor )', color: 'white' }}>
                                        <div data-aos="fade"> <i className={card.iconClass}></i>
                                            <h1 className="fw-bold "><b>{card.title}</b></h1>
                                        </div>
                                    </div>
                                    <div className="card-body fw-normal bg-white">
                                        {card.addresses && card.addresses.map((address, index) => (
                                            <p key={index}><i className="bi bi-geo-alt-fill text-danger"></i>{address}</p>
                                        ))}
                                        {card.contacts && card.contacts.map((contact, index) => (
                                            <p key={index} title={contact.title}><i className="bi bi-telephone text-danger "></i>{contact.number}</p>
                                        ))}
                                        {card.emails && card.emails.map((email, index) => (
                                            <p key={index} title={email.title}><i className="bi bi-send text-danger"></i>{email.email}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-12 m-0 p-0 mb-2 h-100 bg-white" data-aos="zoom-in"
                    data-aos-duration="500">
                    <form className="row px-0 mx-0 border contactForm"
                        data-aos="fade-left">
                        <h3 className="p-2 px-0 mx-0 text-white fw-bolder text-center text-uppercase"
                            style={{ background: 'var(--cardHeadColor)' }}> Contact Form </h3>
                        <div className="col-md-6 position-relative my-3 ">
                            <label className="form-label fw-medium" >
                                Name <font color="orangered">*</font> </label>
                            <input type="text" className="form-control rounded rounded-0  p-2 bg-light" placeholder="Full Name*" value={fullName} onChange={(event) => { setFullName(event.target.value) }}
                                required />
                        </div>
                        <div className="col-md-6 position-relative my-3 ">
                            <label className="form-label fw-medium ">Mobile
                                Number<font color="orangered"> *</font> </label>
                            <input type="tel" className="form-control rounded rounded-0  p-2 bg-light" placeholder="Enter Your Mobile*" value={mobile} onChange={(event) => { setMobile(event.target.value) }} required />
                        </div>
                        <div className="col-md-6 position-relative my-3 ">
                            <label className="form-label fw-medium ">E:Mail   </label>
                            <input type="email" className="form-control rounded rounded-0  p-2 bg-light"
                                placeholder="Enter Your E-mail*" value={email} onChange={(event) => { setEmail(event.target.value) }} required />

                        </div>
                        <div className="col-md-6 position-relative my-3 ">
                            <label className="form-label fw-medium ">Subject <font color="orangered"> *</font> </label>
                            <input type="text" name="subject" className="form-control  rounded rounded-0  p-2 bg-light "
                                placeholder="Enter Your Subject" value={title} onChange={(event) => { setTitle(event.target.value) }} required />
                        </div>
                        <div className="col-md-12 position-relative  ">
                            <label className="form-label fw-medium">  Message <font color="orangered"> *
                            </font> </label>
                            <textarea className=" form-control  rounded rounded-0 bg-light" name="Message" rows="7"
                                placeholder="Type Your Message Here *" value={query} onChange={(event) => { setQuery(event.target.value) }} required></textarea>
                        </div>
                        <div className="col-12 position-relative my-2 d-flex justify-content-center position-relative">
                            <ReCAPTCHA
                                sitekey="6LeSkxwpAAAAAJr0__9WFMn2k3bJ9EW1eT52aaqm"
                                onChange={onChange}
                            />
                        </div>
                        <div className="col-12 my-3 text-center">
                            <button
                                className="btn btn-primary fw-medium text-white mx-1 "
                                disabled={!verified}
                                onClick={sendQuery}
                            >
                                <i className="bi bi-send-fill "></i>
                                Send Message</button>
                            <button
                                type="button"
                                className="btn btn-primary fw-medium text-white mx-1 "
                                onClick={clrqury}                            >
                                Reset </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;

