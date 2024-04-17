import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import AdmissionForm from '../../Admission/AdmissionForm';
import StudentChart from '../Charts/Chart';
import UpdateCourse from '../UpdateData/UpdateCourse';
import CreateNewCourse from './subComponent/CreateNewCourse';
import OffersForm from '../SendOffer/SendOffer';
import StudentDataBs from '../../Admission/StudentDataBs';
import CourseList from '../UpdateData/CourseList';
import SendOffer from '../SendOffer/SendOffer';
import ProgramPictures from './subComponent/Gallery/ProgramPictures';
import DelGallaryImg from './subComponent/Gallery/DelGallaryImg';
import Paper from './Exam/Paper';
import Sendmcq from './Exam/Sendmcq';
import Answersheet from '../../ExamPortal/Answersheet';
export default function Admin() {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const [dlSId, setdlSId] = useState("");
  const [allStudent, setAllStudent] = useState([]);
  const [IndexNum, setIndexNum] = useState('');
  const [tkAdmission, setTkAdmission] = useState("");
  const [fullName, setFullName] = useState('');
  const [regNum, setRegNum] = useState('');
  const [gnrCert, setGnrCert] = useState('');
  const [percentage, setPercentage] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [offersLength, setOffersLength] = useState(0);
  const [coursesLength, setCoursesLength] = useState(0);
  const [adminData, setAdminData] = useState([]);
  const [error, setError] = useState(null);
  const [adminList, setAdminList] = useState([]);
  const [name, setName] = useState('');
  const [uploadStatus, setUploadStatus] = useState(false);
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState('');
  const [nDob, setNDob] = useState(new Date())
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [profession, setProfesssion] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');
  const [about, setAbout] = useState('');
  const dob = new Date(adminData.dob);
  const uploadPhoto = () => {
    if (image) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "hridesh99!")
      data.append("cloud_name", "draowpiml")
      fetch('https://api.cloudinary.com/v1_1/draowpiml/image/upload',
        { method: 'post', body: data }).then(res => res.json())
        .then(data => {
          if (!data.error) {
            setPhoto(data.url);
            setUploadStatus(true);
          }
        })
        .catch((error) => {
          setMessage(error)
        })
    }
  }
  const RegisterAccount = async () => {
    await fetch('http://localhost:3000/admin/addAdmin', {
      method: "post",
      headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem('aJwt')
      },
      body: JSON.stringify({
        name: name,
        email: email,
        profilePic: photo,
        dob: nDob,
        mobileNumber: mobile,
        address: address,
        aadhaarNumber: aadhaar,
        profession: profession,
        about: about,
        password: password
      })
    }).then(data => data.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.message);
        }
        else {
          toast.success('Account Created');
        }
      })
  }
  const fetchAdminProfile = async () => {
    await fetch('http://localhost:3000/admin/adminProfile', {
      headers: {
        'Authorization': localStorage.getItem('aJwt')
      }
    }).then(data => data.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        else {
          setAdminData(data);
        }
      }).catch((error) => {
        toast.error(error);
      })
  }
  const fetchAdminList = async () => {
    await fetch('http://localhost:3000/admin/getAdminList', {
      headers: {
        "authorization": localStorage.getItem('aJwt')
      }
    }).then(data => data.json())
      .then((data) => {
        setAdminList(data);
        // console.log("List" + JSON.stringify(data));
      })
  }
  const deleteAdmin = async (_id) => {
    await fetch(`http://localhost:3000/admin/deleteAdmin/${_id}`, {
      method: 'delete',
      headers: {
        'authorization': localStorage.getItem('aJwt')
      }
    }).then(data => data.json())
      .then((data) => {
        document.getElementById(_id).remove();
        toast.success(data.message);
      })
  }
  const getStudentList = async () => {
    const query = {};
    if (fullName != '' || fullName != 'undefined' || fullName != 'null') {
      query.name = fullName;
    }
    if (regNum != '' || regNum != 'undefined' || regNum != 'null') {
      query.regNum = regNum;
    }
    // console.log(query)
    await fetch('http://localhost:3000/admin/studentList', {
      method: 'post',
      headers: {
        "Authorization": localStorage.getItem("aJwt"),
        "Content-type": "application/json"
      },
      body: JSON.stringify(query)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error);
        } else {
          setAllStudent(data);
          // console.log("STd" + JSON.stringify(data));
        }
      }).catch((error) => {
        toast.error(error);
      })
  }
  const deleteStudentById = async () => {
    dlSId && await fetch(`http://localhost:3000/admin/deleteStudentRegistrationForm/${dlSId}`,
      {
        method: 'delete',
        headers: {
          "Authorization": localStorage.getItem("aJwt")
        }
      }
    ).then(res => res.json())
      .then(data => {
        toast.success(data.message);
        setdlSId('');
        getStudentList();
      }).catch((error) => {
        toast.error(error)
      })
  }
  const takeNewAdmission = async () => {
    tkAdmission && await fetch(`http://localhost:3000/admin/takeNewAdmission/${tkAdmission}`, {
      method: 'put',
      headers: {
        "Authorization": localStorage.getItem("aJwt"),
        "Content-type": "Application/json"
      },
      body: JSON.stringify({
        iNum: IndexNum
      })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        else {
          setIndexNum('');
          setTkAdmission('');
          toast.success(data.message);
          showModal(false);
          getStudentList();
        }
      }).catch((error) => {
        alert(error);
      })
  }
  const generateCertificate = async () => {
    await fetch('http://localhost:3000/admin/generateCertificate', {
      method: 'post',
      headers: {
        "Authorization": localStorage.getItem('aJwt'),
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: gnrCert,
        percentage: percentage,
        issueDate: issueDate
      })
    }).then(res => res.json())
      .then((data) => {
        if (data.error) {
          setShowModal(false);
          (data.error);
        }
        else {
          setShowModal(false);
          getStudentList();
          alert(data.message);
        }
      })
  }
  useEffect(() => {
    getStudentList();
  }, [])
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getAllNotice');
        if (!response.ok) throw new Error('Failed to fetch offers. Status: ' + response.status);
        const data = await response.json();
        setOffersLength(data.length);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);
  useEffect(() => {
    const fetchCoursesLength = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getCourseList', {
          method: 'GET',
          headers: {
            "Authorization": localStorage.getItem("aJwt"),
            "Content-type": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch courses. Status: ' + response.status);
        }
        const allCourses = await response.json();
        setCoursesLength(allCourses.length);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCoursesLength();
  }, []);
  const [query, setQuery] = useState([]);
  const getAllQuery = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/getAllQuery', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('aJwt')
        }
      });
      const data = await response.json();
      if (!data.error) {
        setQuery(data);
        return data.length;
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data.');
    }
  };
  useEffect(() => {
    getAllQuery();
  }, []);
  //--------------------------Start Show Hide -------------------//
  const [showInput, setShowInput] = useState(false);
  const handleNewButtonClick = () => {
    setShowInput(!showInput);
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.size <= 50 * 1024) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setImgPreview(fileReader.result);
          setError("");
        };
        fileReader.readAsDataURL(selectedFile);
      } else {
        setImgPreview("");
        setError("Upload only 50 KB smaller image.");
      }
    }
  };
  return (
    <div style={{ background: '#B2CBFF' }}>
      <header className="p-0  shadow d-flex align-items-center bg-primary shadow-sm w-100 " style={{ marginTop: '5.4rem' }} id="adminHeader">
        <div className="row  px-0 mx-0  w-100 d-flex justify-content-between">
          <div className="col-md-10 mx-0 px-0 ">
            <div className="row px-0 mx-0  ">
              <div className="col-md-12 d-flex">
                <div className="row d-flex  justify-content-between text-center w-100 mx-0 px-0">
                  <div className="col-6  col-sm-5 d-flex justify-content-start ">
                    <h4 className="text-center fw-bolder fw-bolder text-white bg-primary p-0 m-0 py-3">
                      <i className="fa fa-dashboard  p-0 m-0"
                        aria-hidden="true"></i>&nbsp; <span>Dash Board</span></h4>
                  </div>
                  <div className="col-6 pe-sm-2 d-flex align-items-center justify-content-end">
                    <div>
                      <button type="button" className="btn bg-secondary-subtle mx-3 position-relative">
                        <i className="bi bi-bell-fill text-secondary-emphasis fs-6"></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {allStudent.length + offersLength + coursesLength + query.length}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="row mx-0 px-0">
        <div className="col-12 mx-0 px-0  ">
          <div className="row  mx-0 px-0 ">
            {/* ------------------------ Start  Aside Bar ------------------------ */}
            <div className="col-md-2 mx-0 text-white px-0 bg-white myshadow">
              <hr className="m-0 p-0" />
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {/* Institute Section */}
                <div className="accordion accordion-flush" id="InsData">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#InstituteData">
                        <i className="fa fa-user-circle" aria-hidden="true"></i> &nbsp; Institute
                      </button>
                    </h2>
                    <div id="InstituteData" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <button className="nav-link w-100 mx-0 px-0" data-bs-toggle="pill" data-bs-target="#ContactForm"
                          type="button" role="tab">
                          <i className="fa fa-map-marker" aria-hidden="true"></i> Contact & Location
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#Noticefication"
                          type="button" role="tab">
                          <i className="fa fa-newspaper-o" aria-hidden="true"></i> Notification
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Students Section */}
                <div className="accordion accordion-flush" id="StudentSection">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne">
                        <i className="fa fa-graduation-cap" aria-hidden="true"></i> &nbsp; Students
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <button className="nav-link active w-100" data-bs-toggle="pill" data-bs-target="#v-pills-home"
                          type="button" role="tab"> <i className="fa fa-dashboard"
                            aria-hidden="true"></i>&nbsp;   Students Board
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AddStudent"
                          type="button" role="tab">
                          <i className="bi bi-person-plus-fill"></i> Add Students
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AllStudent"
                          type="button" role="tab" onClick={getStudentList}><i className="bi bi-patch-check-fill"></i>
                          &nbsp;  Admission Status
                        </button>
                        <button data-bs-toggle="pill" data-bs-target="#VerifiedStudent" className="nav-link w-100"
                          type="button" role="tab"><i className="bi bi-activity"></i> Verifyied Students
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Admin Section */}
                <div className="accordion accordion-flush" id="AdminSection">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#AdmimPanel">
                        <i className="bi bi-universal-access" aria-hidden="true"></i> &nbsp; Admin
                      </button>
                    </h2>
                    <div id="AdmimPanel" className="accordion-collapse collapse" data-bs-parent="#AdminSection">
                      <div className="accordion-body">
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AdminProfile"
                          type="button" role="tab" onClick={fetchAdminProfile}>
                          <i className="fa fa-user-circle" aria-hidden="true"></i> Profile
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#NewAccount"
                          type="button" role="tab">
                          <i className="bi bi-person-fill-lock"></i>  Create an account
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AdminList"
                          type="button" role="tab" onClick={fetchAdminList}>
                          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Admin List
                        </button>
                        <button onClick={() => {
                          navigate('/');
                          localStorage.removeItem('aJwt');
                        }} className="nav-link w-100" data-bs-toggle="pill"
                          type="button" role="tab">
                          <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Courses Section */}
                <div className="accordion accordion-flush" id="CourseSection">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#allCourses">
                        <i className="fa fa-book" aria-hidden="true"></i> &nbsp; Courses
                      </button>
                    </h2>
                    <div id="allCourses" className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#UpdateNewCourse"
                          type="button" role="tab">
                          <i className="bi bi-cloud-arrow-up-fill"></i>  Push New Course
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#CourseList"
                          type="button" role="tab"> Get Course List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Offer Section */}
                <div className="accordion accordion-flush" id="NewOffer">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#Offers">
                        <i className="bi bi-rss"></i>&nbsp; Offer
                      </button>
                    </h2>
                    <div id="Offers" className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#OffersForNewStudent"
                          type="button" role="tab">
                          <i className="bi bi-cloud-arrow-up-fill"></i>   Send New Offer
                        </button>
                        <button className="nav-link small w-100" data-bs-toggle="pill" data-bs-target="#noticeArea"
                          type="button" role="tab"> <i className="bi bi-cloud-arrow-down-fill"></i> All Offers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Gallary Section */}
                <div className="accordion accordion-flush" id="GallaryImg">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#Gallary">
                        <i className="bi bi-images"></i> &nbsp;   Gallary
                      </button>
                    </h2>
                    <div id="Gallary" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#ProgramData"
                          type="button" role="tab">
                          <i className="fa fa-picture-o" aria-hidden="true"></i> Send Pictures
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#ProgramDataDlt"
                          type="button" role="tab">
                          <i className="fa fa-trash-o" aria-hidden="true"></i> Delete Pictures
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Online Exams Section */}
                <div className="accordion accordion-flush">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
                        type="button" data-bs-toggle="collapse" data-bs-target="#OnlineExam">
                        <i className="bi bi-book"></i> &nbsp; Exams
                      </button>
                    </h2>
                    <div id="OnlineExam" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#Exams"
                          type="button" role="tab">
                          <i className="fa fa-picture-o" aria-hidden="true"></i> Set Exam
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#SendMcq"
                          type="button" role="tab">
                          <i className="bi bi-book"></i>  Send Question
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#ExamPpr"
                          type="button" role="tab">
                          <i className="bi bi-book"></i> Exams Paper
                        </button>
                        <button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#Answersheet"
                          type="button" role="tab">
                          <i className="bi bi-book-fill"></i> Answersheet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------ End  Aside Bar ------------------------ */}
            {/* ------------------------ Start Main Body Content ------------------------ */}
            <div className="col-md-10 container m-0 p-0">
              <div className="tab-content mx-1 px-0 bg-light" id="v-pills-tabContent">
                <div className="tab-pane fade show active py-2" id="v-pills-home" role="tabpanel"
                  aria-labelledby="v-pills-home-tab" tabIndex="0">
                  <div className="mx-0 px-0">
                    <div className="row mb-2 d-flex justify-content-center m-auto w-100">
                      <div className="col-xl-3 col-xxl-3 col-md-6 my-2">
                        <div className="widget-stat myshadow2 border-0 card bg-danger">
                          <div className="card-body">
                            <div className="media">
                              <span className="mx-1 bg-white">
                                <i className="fa fa-user-circle-o text-danger" aria-hidden="true"></i>
                              </span>
                              <div className="media-body text-white">
                                <p className="mb-1">Total Students</p>
                                <h3 className="text-white">{allStudent.length}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-xxl-3 col-md-6 my-2">
                        <div className="widget-stat myshadow2 border-0 card bg-warning d-flex">
                          <div className="card-body">
                            <div className="media">
                              <span className="mx-1">
                                <i className="fa fa-graduation-cap text-primary" aria-hidden="true"></i>
                              </span>
                              <div className="media-body text-white">
                                <p className="mb-1">Total Course</p>
                                <h3 className="text-white">{coursesLength}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-xxl-3 col-md-6 my-2">
                        <div className="widget-stat myshadow2 border-0 card bg-voilet">
                          <div className="card-body">
                            <div className="media">
                              <span className="mx-1">
                                <i className="bi bi-award-fill text-voilet" aria-hidden="true"></i>
                              </span>
                              <div className="media-body text-white">
                                <p className="mb-1">Total Offers</p>
                                <h3 className="text-white">{offersLength}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-xxl-3 col-md-6 my-2">
                        <div className="widget-stat myshadow2 border-0 card bg-primary">
                          <div className="card-body">
                            <div className="media">
                              <span className="mx-1">
                                <i className="fa fa-comments text-primary" aria-hidden="true"></i>
                              </span>
                              <div className="media-body text-white">
                                <p className="mb-1">New Message</p>
                                <h3 className="text-white">{query.length}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <StudentChart std={allStudent} Tcourse={coursesLength} TOffer={offersLength} />
                </div>
                <div className="tab-pane fade mx-0 px-0 position-absolute top-25 mt-2" id="AllStudent" role="tabpanel"
                  tabIndex="0">
                  <div className="row border-bottom m-0 px-0 bg-primary myshadow w-100">
                    <div className="col-12 py-2 mx-0 px-0 d-flex justify-content-around align-items-center ">
                      <div className="h2 fw-bold myFlex2 text-white"><b className='px-2 text-uppercase'>All Students</b></div>
                      <div className="myFlex2">
                        <button className="btn btn-primary rounded-0 d-flex align-items-center">  <i className="fa fa-plus-circle"
                          aria-hidden="true"></i>
                          <Link to="/AdmissionForm" className="nav-link" >&nbsp; Add New</Link> </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-0 px-0 bg-white text-primary pb-2 myshadow">
                    <div className="col-12 m-0 py-2  fw-medium d-flex  justify-content-between align-items-center  bg-primary bg-gradient">
                      <div className="d-flex align-items-center fw-bolder text-white">
                        <p id="All"> Total Students List</p>
                      </div>
                      <div className="row d-flex align-items-center mx-0 px-0">
                        <div className="col d-flex input-group mysearch bg-white mx-0 p-0">
                          <button className=' btn btn-light rounded-0 text-dark searchStudent fw-bolder' onClick={getStudentList}>
                            <i className="bi bi-search text-dark "></i></button>
                          <input type="text" className="form-control w-25" placeholder="Full name" onChange={(e) => { setFullName(e.target.value) }} value={fullName} /> &nbsp;
                          <input type="text" className="form-control w-25" placeholder="Reg No." onChange={(e) => { setRegNum(e.target.value) }} value={regNum} /> &nbsp;
                        </div>
                      </div>
                    </div>
                    <table className="table table-hover table-responsive table-sm small table-bordered border-primary stdStatus" id="dashBoardTable"
                      style={{ color: 'maroon' }}>
                      <thead className='table-dark small'>
                        <tr role="row">
                          <th className='text-center'>Photo</th>
                          <th className='text-center'>Reg. No</th>
                          <th className='text-center'>Name</th>
                          <th className='text-center'>Address</th>
                          <th className='text-center'>Mobile</th>
                          <th className='text-center'>Admission Date</th>
                          <th className='text-center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allStudent.length >= 1 && allStudent.map((student) => {
                          return (
                            <tr role="row" className="odd" id={student._id} key={student._id}>
                              <td>
                                <div className="databsimg m-auto d-flex justify-content-center m-0 p-0">
                                  <img className={student.gnCertificate == 1 ? "rounded rounded-circle m-auto m-0 p-0"
                                    : "rounded-circle rounded rounded-circle m-auto m-0 p-0"} src={student.photo} width="30" alt="Pic" />
                                </div>
                              </td>
                              <td className="fw-medium small text-uppercase ">
                                {student.regNum ? (
                                  <span className="text-success">
                                    {student.regNum.split('/')[1] + '/' + student.regNum.split('/')[2]}
                                  </span>
                                ) : (
                                  <span className="text-warning">Pending</span>
                                )}
                              </td>
                              <td className="">{student.name}</td>
                              <td>{student.address}</td>
                              <td>{student.mobileNumber}</td>
                              <td>{student.dob.slice(0, 10)}</td>
                              <td>
                                {
                                  (!student.regNum) && <button
                                    type="button"
                                    id="LaunchModal"
                                    className="btn btn-sm  bg-primary m-1 text-white"
                                    title='Take Admission'
                                    onClick={() => {
                                      setdlSId('');
                                      setTkAdmission(student._id);
                                      setShowModal(true);
                                    }}
                                  >
                                    <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                  </button>}
                                {
                                  (student.regNum) && <button className='btn btn-primary btn btn-sm small  px-2 py-1' title='Generate certificate' onClick={() => {
                                    setdlSId('');
                                    setTkAdmission('');
                                    setGnrCert(student._id);
                                    setShowModal(true);
                                  }}><i className="bi bi-person-check-fill small p-0 m-0"></i></button>
                                }
                                {
                                  (!student.regNum) && <button
                                    type="button"
                                    id="LaunchModal"
                                    className="btn btn-sm bg-secondary bg-danger m-1 text-white"
                                    title='delete Registration'
                                    onClick={() => {
                                      setdlSId(student._id);
                                      setShowModal(true);
                                    }}
                                  >
                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                  </button>
                                }
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <Modal show={showModal} onHide={handleModalClose} animation={false} >
                        <Modal.Header className='bg-primary ' closeButton >
                          <Modal.Title>
                            <div className="h2 fw-bold myFlex2 text-white ">
                              <b className="px-2 text-uppercase"> {dlSId ? "DELETE STUDENT'S" : tkAdmission ?
                                'Take Admission' : "Generate Certificate"}</b></div>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          {
                            dlSId ? (<Button variant="danger" onClick={deleteStudentById}>Delete</Button>) : tkAdmission ?
                              (<>
                                <input type="number" className='form-control' placeholder="Give unique registration Number" onChange={(e) => { setIndexNum(e.target.value) }} />
                                <Button variant='primary' onClick={takeNewAdmission}><i className="bi bi-check2-circle"></i> Done</Button>
                              </>) : gnrCert ?
                                (<>
                                  <input type="number" maxLength={3} className='form-control' placeholder='Enter Percentage' onChange={(e) => { setPercentage(e.target.value) }} />
                                  <input type="date" maxLength={3} className='form-control' onChange={(e) => { setIssueDate(e.target.value) }} />
                                  <Button variant="secondary" onClick={handleModalClose}>
                                    <i className="bi bi-trash"></i>
                                  </Button>
                                  <button title='Save' className='btn btn-primary' onClick={generateCertificate}>
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                </>) :
                                (<>
                                  <span>Not Defined</span>
                                </>)
                          }
                        </Modal.Footer>
                      </Modal>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade mx-0 px-0 position-absolute top-0 AddmissionDataAdmin" id="AddStudent" role="tabpanel"
                  tabIndex="0">
                  <AdmissionForm className="m-0 px-0 cardEffects mt-2 bg-danger-subtle" />
                </div>
                <div className="tab-pane fade mx-0 px-0 cardEffects cardEffectsBorder my-2" id="VerifiedStudent" role="tabpanel"
                  tabIndex="0">
                  <StudentDataBs />
                </div>
                <div className="tab-pane fade mx-2 py-4" id="ContactForm" role="tabpanel">
                  <div className="mx-0 px-0">
                    <div className="row mb-5">
                      <div className="row  myflex d-flex justify-content-center my-1">
                        <div className="col-12 col-md-8 bg-white py-1 myshadow">
                          <div className="p-2">
                            <div className="border-bottom text-white text-center text-dark m-0 py-2 h4 fw-bold text-uppercase"
                              style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}
                            >
                              <h1 className="fw-bolder fw-bolder"> UPDATE <font color='red'>CONTACT DETAILS</font></h1>
                            </div>
                            <div className="row offersTitle">
                              <div className="d-flex py-3">
                                <div className="col-md-3">
                                  <button type="button" className="btn btn-primary" onClick={handleNewButtonClick}>
                                    <i className="fa fa-phone" aria-hidden="true"></i>   Contact <i className="bi bi-arrow-right-short"></i></button>
                                </div>
                                <div className={`col-md-9 ${showInput ? '' : ' d-none'}`}>
                                  <div className="input-group">
                                    <input type="number" placeholder='Enter Contact Number...' className='form-control' />
                                    <button className='btn btn-primary'>Send</button>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <textarea className="form-control" placeholder='Enter institute Location....' rows="4"></textarea>
                              </div>
                            </div>
                            <div className="text-center my-2">
                              <a className="small btn btn-primary">Update</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade mx-2 py-5 bg-primary-subtle" id="Noticefication" role="tabpanel">
                  <div className="mx-0 px-0">
                    <div className="row mb-5">
                      <div className="row  myflex d-flex justify-content-center my-1">
                        <div className="col-12 col-md-8 bg-white py-1 myshadow">
                          <div className="p-2">
                            <div className="border-bottom text-white text-center text-dark m-0 py-2 h4 fw-bold"
                              style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }} >
                              <h1 className="fw-bolder fw-bolder"> UPDATE <font color='red'>NOTICEFICATION</font></h1>
                            </div>
                            <SendOffer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade bg-primary my-1" id="ProgramData" role="tabpanel" tabIndex="0">
                  <div className="col-12 m-0 p-0 " style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}>
                    <div className="container text-center m-0 py-3 h2 fw-bold text-uppercase " style={{ color: 'rgb(255, 255, 255)' }}>
                      <ProgramPictures />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade bg-primary my-1" id="ProgramDataDlt" role="tabpanel" tabIndex="0">
                  <div className="col-12 m-0 p-0 " style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}>
                    <div className="container text-center m-0 py-3 h2 fw-bold text-uppercase " style={{ color: 'rgb(255, 255, 255)' }}>
                      <DelGallaryImg />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="AdminProfile" role="tabpanel" tabIndex="0">
                  <div className="row m-auto my-2">
                    <div className="col-12 bg-white myshadow p-2 ">
                      <div className="row bg-white mx-0 px-0">
                        <section className="section">
                          <div className="container ">
                            <div className="row align-items-center flex-row-reverse">
                              <div className="col-md-8 border-bottom ">
                                <div className="about-text">
                                  <div className="row">
                                    <h1 className='fw-bolder text-primary'>{adminData.name}</h1>
                                    <hr />
                                    <div className="col-6">
                                      <div className="media">
                                        <label>Birthday</label>
                                        <p>{dob.toDateString()}</p>
                                      </div>
                                      <div className="media">
                                        <label>Address</label>
                                        <p>{adminData.address}</p>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="media">
                                        <label>E-mail</label>
                                        <p>{adminData.email}</p>
                                      </div>
                                      <div className="media">
                                        <label>Profession</label>
                                        <p>{adminData.profession}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 d-flex text-center flex-column">
                                <div className="about-avatar">
                                  <img src={adminData.profilePic} alt="Ajay Tiwary" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 pb-5 bg-body-tertiary">
                            <h3 className="dark-color fw-bolder text-warning">About Me</h3>
                            <p>{adminData.about}</p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="NewAccount" role="tabpanel" tabIndex="0">
                  <div className="row myflex d-flex justify-content-center">
                    <div className="col-12 col-md-8 bg-white py-3 my-3 myshadow">
                      <div className="p-2">
                        <div className="text-center">
                          <h1 className="h2 fw-bold text-gray-900 mb-4 text-primary">Create Account!</h1>
                        </div>
                        <div className="user">
                          <div className="form-group row my-2 g-3">
                            <div className="col-md-6">
                              <div className="input-group "> <i className="bi bi-image input-group-text "></i> <input
                                className="form-control form-control-sm py-2 " id="formFileSm" type="file"
                                onChange={(event) => { setImage(event.target.files[0]); setUploadStatus(false) }} />
                                {uploadStatus ? <span >Uploaded</span> : <button className="btn btn-primary btn-small"
                                  onClick={uploadPhoto}>Upload Now</button>
                                }
                              </div>
                            </div>
                            <div className="col-md-6">
                              <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} value={name} placeholder="Enter Name" />
                            </div>
                            <div className="col-md-6">
                              <input type="date" className="form-control" onChange={(e) => { setNDob(e.target.value) }} placeholder="Date Of Birth" />
                            </div>
                            <div className="col-md-6">
                              <input type="Number" className="form-control" onChange={(e) => { setMobile(e.target.value) }} value={mobile} placeholder="Mobile Number" />
                            </div>
                            <div className="col-md-6">
                              <input type="text" className="form-control" onChange={(e) => { setAddress(e.target.value) }} value={address} placeholder="Address" />
                            </div>
                            <div className="col-md-6">
                              <input type="text" maxLength={12} className="form-control" onChange={(e) => { setAadhaar(e.target.value) }} value={aadhaar} placeholder="12 digit Aadhaar Number" />
                            </div>
                            <div className="col-md-6">
                              <input type="text" className="form-control" onChange={(e) => { setProfesssion(e.target.value) }} value={profession} placeholder="Profession" />
                            </div>
                            <div className="col-md-6">
                              <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Email" />
                            </div>
                            <div className="form-group row my-2 g-4">
                              <div className="col-md-6">
                                <input type="text" className="form-control" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Password....*" />
                              </div>
                              <div className="col-md-6">
                                <input type="text" className="form-control" onChange={(e) => { setRPassword(e.target.value) }} value={rPassword} placeholder="Repeat Password....*" />
                              </div>
                              <div className="w-10">
                                <textarea type="text" rows={4} className="form-control" onChange={(e) => { setAbout(e.target.value) }} value={about} placeholder="Write About" > </textarea>
                              </div>
                            </div>
                            <button type='button' className="btn btn-primary w-100 my-2 py-2 rounded-pill" onClick={RegisterAccount}>
                              Register Account
                            </button>
                          </div>
                        </div>
                        <hr />
                        <div className="text-center">
                          <a className="small" href="#">Forgot Password?</a>
                        </div>
                        <div className="text-center">
                          <a className="small" href="#">Already have an account? Login!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="AdminList" role="tabpanel" tabIndex="0">
                  <div className="row myflex d-flex justify-content-center py-5">
                    <div className="table-responsive">
                      <table className='table table-hover table-bordered table-sm small table-dark'>
                        <tbody>
                          <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>UIDAI NO.</th>
                            <th>Addres</th>
                            <th>Profession</th>
                            <th>Generated At</th>
                            <th>Delete</th>
                          </tr>
                          {
                            (adminList.length > 0) && adminList.map((admin) => {
                              return (
                                <tr id={admin._id}>
                                  <td ><img style={{ width: "40px" }} src={admin.profilePic} alt="Loading.." /></td>
                                  <td>{admin.name}</td>
                                  <td>{admin.email}</td>
                                  <td>{admin.mobileNumber}</td>
                                  <td>{admin.aadhaarNumber}</td>
                                  <td>{admin.address}</td>
                                  <td>{admin.profession}</td>
                                  <td>{admin.createdAt}</td>
                                  <td onClick={() => { deleteAdmin(admin._id) }}><button><i className="bi bi-trash3-fill"></i></button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="AdminProfile" role="tabpanel" tabIndex="0">
                  <div className="row myflex d-flex justify-content-center my-4">
                    <div className="col-12 col-md-11 bg-white py-3 myshadow">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-md-11  d-flex justify-content-center">
                              <div className="card px-3 " >
                                <img src="images/team/team-1.png" className="img-fluid card-img-top" alt="..." />
                                <div className="card-body text-center">
                                  <h5 className="card-title">Ajay Tiwari</h5>
                                  <p className="card-text">Web Developer || Programmer </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-11">
                              <div className="card ">
                                <div className="card-body">
                                  <div className="profile-personal-info pt-4">
                                    <h4 className="text-primary mb-4">Personal Information</h4>
                                    <div className="row mb-4">
                                      <div className="col-lg-3 col-md-4 col-md-6 col-6">
                                        <h5 className="f-w-500">Name <span className="pull-right">:</span>
                                        </h5>
                                      </div>
                                      <div className="col-lg-9 col-md-8 col-md-6 col-6"><span>Ajay Tiwari</span>
                                      </div>
                                    </div>
                                    <div className="row mb-4">
                                      <div className="col-lg-3 col-md-4 col-md-6 col-6">
                                        <h5 className="f-w-500">Email <span className="pull-right">:</span>
                                        </h5>
                                      </div>
                                      <div className="col-lg-9 col-md-8 col-md-6 col-6">
                                        <span>ajtiwari4@gmail.com</span>
                                      </div>
                                    </div>
                                    <div className="row mb-4">
                                      <div className="col-lg-3 col-md-4 col-md-6 col-6">
                                        <h5 className="f-w-500">Mobile <span className="pull-right">:</span>
                                        </h5>
                                      </div>
                                      <div className="col-lg-9 col-md-8 col-md-6 col-6"><span>9918151032</span>
                                      </div>
                                    </div>
                                    <div className="row mb-4">
                                      <div className="col-lg-3 col-md-4 col-md-6 col-6">
                                        <h5 className="f-w-500">Address <span className="pull-right">:</span>
                                        </h5>
                                      </div>
                                      <div className="col-lg-9 col-md-8 col-md-6 col-6"><span>
                                        Harredih mohalla , ward No. 04 Nichlaul, Maharajganj
                                      </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row m-2 d-flex justify-content-evenly ">
                      <div data-target="" className="col-3 mx-1  btn btn-primary"> Profile</div>
                      <div data-target="" className="col-3 mx-1  btn btn-primary">Edit </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade mx-2" id="UpdateNewCourse" role="tabpanel">
                  <CreateNewCourse />
                </div>
                <div className="tab-pane fade mx-2" id="CourseList" role="tabpanel" >
                  <CourseList />
                </div>
                <div className="tab-pane fade mx-2" id="noticeArea" role="tabpanel" >
                  <UpdateCourse />
                </div>
                <div className="tab-pane fade" id="OffersForNewStudent" role="tabpanel">
                  <div className="mx-0 px-0 py-5">
                    <div className="row mb-5">
                      <div className="row  myflex d-flex justify-content-center my-1">
                        <div className="col-12 col-md-8 bg-white py-1 myshadow">
                          <OffersForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="Exams" role="tabpanel">
                  <div className="mx-0 px-0 py-5">
                    <div className="row mb-5">
                      <div className="row  myflex d-flex justify-content-center my-1">
                        <div className="col-12 col-md-8 bg-white py-3 myshadow">
                          <h2 className="text-center text-primary fw-bolder">Student detail for set examination </h2>
                          <div className="input-group mb-3">
                            <span className="input-group-text"><i className="bi bi-person-fill-lock"></i></span>
                            <input type="text" className="form-control" placeholder="Enter reg. no" />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                            <input type="text" className="form-control" placeholder="Student name" />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text"><i className="bi bi-book"></i></span>
                            <select className="form-select form-select-sm" defaultValue="Course">
                              <option value="Course" disabled>Choose a Course</option>
                              <option value="ADCA">ADCA</option>
                              <option value="CCC">CCC</option>
                              <option value="DCA">DCA</option>
                              <option value="DCAA">DCAA</option>
                            </select>
                          </div>

                          <button className="btn btn-primary btn-sm w-100 text-center" >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Student Exams Detail  */}
                  <div className="myshadow bg-white pb-5 mb-5">
                    <h2 className="text-center text-primary fw-bolder">Student detail</h2>
                    <div className="table-responsive px-1">
                      <table className="table table-bordered table-sm table-bordered border-primary table-dark" style={{ fontSize: '0.8rem' }}>
                        <caption>
                          <div className="input-group" style={{ width: '15rem' }}>
                            <input type='date' className='form-control form-control-sm' />
                            <button className='btn btn-primary btn-sm'>Set Exam Date</button>
                          </div>
                        </caption>
                        <thead>
                          <tr className='small'>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Mother's Name</th>
                            <th>Complete Address</th>
                            <th>Course</th>
                          </tr>
                        </thead>
                        <tbody className='small'>
                          <tr>
                            <td>ff</td>
                            <td>Aman</td>
                            <td>Balram</td>
                            <td>Maya</td>
                            <td>Nichlaul</td>
                            <td>ADCA</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="SendMcq" role="tabpanel">
                  <div className="mx-0 px-0 py-5">
                    <Sendmcq />
                  </div>
                </div>

                <div className="tab-pane fade" id="ExamPpr" role="tabpanel">
                  <div className="mx-0 px-0 py-5">
                    <div className="row mb-5">
                      <div className="row  myflex d-flex justify-content-center my-1">
                        <div className="col-12 col-md-8 bg-white py-1 myshadow">
                          <Paper />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="Answersheet" role="tabpanel">
                  <div className="mx-0 px-0 py-1">
                    <Answersheet />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
