import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UniversalContext } from "../../context/universal";
import ReCAPTCHA from "react-google-recaptcha";
function QueryForm() {
    const [verified, setVerified] = useState(false);
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const { adminLogin } = useContext(UniversalContext);
    const navigate = useNavigate();
    const clrqury = () => {
        setFullName('');
        setMobile('');
        setEmail('');
        setTitle('');
        setQuery('');
    }
    const sendQuery = async () => {
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
                        toast.error('Some Error Occurred');
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
    }
    useEffect(() => {
        const aToken = localStorage.getItem('aJwt');
        if (aToken) {
            navigate('/Admin');
        }
    }, [])
    function onChange(value) {
        setVerified(true)
    }
    return (
        <>
            <h1 className="p-4 fw-bolder text-center text-uppercase " id="signUpNow" style={{ background: 'orangered' }}>
                Enquiry Now
            </h1>
            <div className=" col-md-12 position-relative my-2 b">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Full Name*" value={fullName} onChange={(event) => { setFullName(event.target.value) }}
                        required />
                </div>
            </div>
            <div className="col-md-12 position-relative my-2 ">
                <div className="input-group ">
                    <input type="tel" className="form-control" placeholder="Enter Your Mobile*" value={mobile} onChange={(event) => { setMobile(event.target.value) }} />
                </div>
            </div>
            <div className="col-md-12 position-relative my-2">
                <div className="input-group">
                    <input type="email" className="form-control"
                        placeholder="Enter Your E-mail*" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </div>
            </div>
            <div className=" col-md-12 position-relative my-2 ">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder=" Enter Title*"
                        value={title} required onChange={(event) => { setTitle(event.target.value) }} />
                </div>
            </div>
            <div className="col-md-12 position-relative">
                <textarea className="form-control" rows="3"
                    placeholder="Type Your Enquiry*" value={query} onChange={(event) => { setQuery(event.target.value) }}></textarea>
            </div>
            <div className="col-12 position-relative my-2 d-flex justify-content-center position-relative">
                <ReCAPTCHA
                    sitekey="6LeSkxwpAAAAAJr0__9WFMn2k3bJ9EW1eT52aaqm"
                    onChange={onChange}
                />
            </div>
            <div className="col-12 my-1 text-center">
                <button
                    className="btn fw-medium text-white hoverBtn mx-1"
                    disabled={!verified}
                    style={{ background: 'orangered' }}
                    onClick={sendQuery}
                >
                    <i className="bi bi-send-fill"></i> Send
                </button>
                <button
                    className="btn btn-primary fw-medium text-white mx-1 "
                    onClick={() => clrqury()}                            >
                    Reset </button>
            </div>
        </>
    );
}
export default QueryForm;
