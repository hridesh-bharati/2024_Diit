import React from 'react';
import '../../App.css';
import QueryForm from '../HomePage/QueryFrom';
import { Link } from 'react-router-dom';
import Paper from '../Admin/MainAdminPage/Exam/Paper';
import Footer from '../Footer/Footer';
import StudentCard from './StudentCard';
function Examportal() {
    return (
        <div className="bg-light">
            <div className="Examwrapper mx-0 px-0">
                <h1 className="text-center fw-bolder text-white bg-primary m-0 p-0 pt-4"><i className="bi bi-person-circle"></i> Student Portal</h1>
                <div className="d-flex justify-content-center bg-primary border-bottom p1-5">
                    <div className='StdSide py-4'>
                        <div className=" d-flex justify-content-center">
                            <button className="border-0 px-5 py-3 btn btn-lg text-white fw-medium mx-2 logoutBtn btn-success"><i className="bi bi-person-vcard-fill"></i> Student ID <b>ADCA/2</b></button>
                            <button className="border-0 px-5 py-3 btn btn-lg text-white fw-medium mx-2 logoutBtn voilebtn"><i className="bi bi-info-circle-fill"></i> Account info</button>
                            <button className="border-0 px-5 py-3 btn btn-lg text-white fw-medium mx-2 logoutBtn redbtn"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                        </div>
                    </div>
                </div>

                <div className="row d-flex align-items-start bg-primary">
                    {/* Tab Bar  */}
                    <ul className="col-12 nav nav-tabs d-flex justify-content-center bg-primary" id="myTabStd" role="tablist">
                        <li className="nav-item m-2 p-2"><button className="btn myshadow active" data-bs-toggle="tab" data-bs-target="#dashboard" type="button" role="tab"><i className="mx-2 bi bi-grid-fill"></i> Dashboard </button></li>
                        <li className="nav-item m-2 p-2"><button className="btn myshadow" data-bs-toggle="tab" data-bs-target="#examReport" type="button" role="tab"><i className="mx-2 fa fa-bar-chart" aria-hidden="true"></i>Exam Paper</button> </li>
                        <li className="nav-item m-2 p-2"><button className="btn myshadow" data-bs-toggle="tab" data-bs-target="#stdVerify" type="button" role="tab"><i className="mx-2 bi bi-bookmarks"></i>Check Result </button></li>
                        <li className="nav-item m-2 p-2"><button className="btn myshadow" data-bs-toggle="tab" data-bs-target="#adminContact" type="button" role="tab"><i className="mx-2 bi bi-person-fill-lock"></i>Admin Contact</button> </li>
                    </ul>
                    {/* Body Part  */}
                    <div className="col-12 p-0 m-0">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active " id="dashboard" role="tabpanel">
                                <StudentCard />
                            </div>

                            <div className="tab-pane fade" id="examReport" role="tabpanel">
                                <div className="bg-light myshadow">
                                    <div className="row  mx-0 px-0 ">
                                        <div className="col-md-12 mx-0 px-0 ">
                                            <Paper />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="stdVerify" role="tabpanel">
                                <div className="bg-light myshadow">
                                    <div className="row mx-2">
                                        <div className="col-md-14 mx-0 px-0 my-2">
                                            <div className="col-md-14 mx-0 px-0 my-3">
                                                <div className="bg-danger-subtle small p-3 my-3">
                                                    प्रिय छात्र .. आपका परीक्षा रिपोर्ट Drishtee संस्था द्वारा  15 दिनों के अंदर अपलोड कर दिया जायेगा.
                                                    अगर आपको किसी का भी प्रकार का Enquiry करनी हो तो दिए गए सेक्शन के विश्लेषण कर सकते हैं।
                                                </div>

                                                <div className='d-flex justify-content-evenly'>
                                                    <Link to='/verification' className='d-flex justify-content-center'><button className="btn btn-primary">Go to verify page <i className="bi bi-arrow-right"></i></button></Link>
                                                    <Link to='/contact' className='d-flex justify-content-center'><button className="btn btn-primary">Go to contact page <i className="bi bi-arrow-right"></i></button></Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="adminContact" role="tabpanel">
                                <div className="bg-light myshadow">
                                    <div className="row mx-2">
                                        <div className="col-md-14 mx-0 px-0 my-2">
                                            <QueryForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Examportal;
