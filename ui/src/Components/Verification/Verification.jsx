import React, { useState, useEffect } from 'react';
import UseFullCard from './UseFullCard';
import html2pdf from 'html2pdf.js';
import Marquee from '../PauseMarquee/PauseMarquee';
import Typed from 'typed.js';
import Footer from '../Footer/Footer';
const Verification = () => {
   const [regNum, setRegNum] = useState('');
   const [stdData, setStdData] = useState([]);
   const [captchaValue, setCaptchaValue] = useState('');
   const [userInput, setUserInput] = useState('');
   const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
   useEffect(() => {
      generateCaptcha();
   }, []);
   const verifyCertificate = async () => {
      if (!regNum) {
         alert('Please Enter Registration Number');
      } else {
         try {
            const response = await fetch('http://localhost:3000/admin/verifyCertificate', {
               method: "post",
               headers: {
                  "Content-type": 'application/json'
               },
               body: JSON.stringify({
                  regNum
               })
            });
            const data = await response.json();
            if (data.error) {
               alert(data.error);
            } else {
               setStdData(data);
               // console.log("All", JSON.stringify(data));
            }
         } catch (error) {
            console.error('Error:', error);
         }
      }
   };

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear().toString() // Get last two digits of the year
      return `${day}/${month}/${year}`;
   };
   const generateCaptcha = () => {
      const randomText = Math.random().toString(36).substring(7);
      setCaptchaValue(randomText);
   };
   const handleInputChange = (event) => {
      setUserInput(event.target.value);
   };
   const handleCaptchaCheck = () => {
      if (userInput.toLowerCase() === captchaValue.toLowerCase()) {
         setIsCaptchaVerified(true);
         verifyCertificate();
      } else {
         setIsCaptchaVerified(false);
         alert('CAPTCHA verification failed.');
         generateCaptcha();
      }
   };
   const handleReloadCaptcha = () => {
      generateCaptcha();
      setIsCaptchaVerified(false);
   };
   const downloadPDF = async () => {
      const printResult = document.getElementById('printResult');
      if (printResult) {
         try {
            const imageDataUrl = await getImageDataUrl(stdData?.details?.photo);
            const clonedPrintResult = printResult.cloneNode(true);
            const imagesInPrintResult = clonedPrintResult.getElementsByTagName('img');
            for (let i = 0; i < imagesInPrintResult.length; i++) {
               const img = imagesInPrintResult[i];
               if (img.src === stdData?.details?.photo) {
                  img.src = imageDataUrl;
               }
            }
            const htmlContent = clonedPrintResult.innerHTML;
            const options = {
               margin: 3,
               html2canvas: { scale: 2 },
               jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
            };
            html2pdf().from(htmlContent).set(options).save();
         } catch (error) {
            console.error('Error generating PDF:', error);
         }
      } else {
         alert('Element not found.');
      }
   };
   const getImageDataUrl = (imageUrl) => {
      return new Promise((resolve, reject) => {
         const img = new Image();
         img.crossOrigin = 'Anonymous';
         img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
         };
         img.onerror = (error) => {
            reject(error);
         };
         img.src = imageUrl;
      });
   };
   useEffect(() => {
      const typed = new Typed('#guidline', {
         strings: ['Important Guidelines.', 'Important Guidelines.', 'Important Guidelines.'],
         typeSpeed: 50,
         loop: true,
      });
      return () => {
         typed.destroy();
      };
   }, []);
   const backgroundStyle = {
      // backgroundImage: 'url("../public/images/icon/captcha.png")',
      border: '1px dotted maroon',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '0 10px',
      height: '80%',
   };
   const captchaTextStyle = {
      fontFamily: "Kotta One, serif",
      fontWeight: 'bolder',
      fontStyle: 'italic',
      fontSize: '2rem',
      height: '100%',
      letterSpacing: '10px',
      userSelect: 'none',
   };
   //--------------------------Start BgImage----------------------------------//
   const MainBg = {
      backgroundImage: 'url("/images/vender/enquiryBg.png") ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      width: '100%',
      height: '100vh !important',
      padding: '0 !important',
      margin: '0 !important',
   };
   const darkBlueBg = {
      background: '#00062B',
   };
   var a = "केवल पंजीकृत उपयोगकर्ताओं को ही आगे बढ़ने की अनुमति है।";
   var b = "पंजीकरण संख्या छात्र इसे छात्र द्वारा सही ढंग से भरा जाना चाहिए।";
   var c = "किसी भी छात्र/छात्रा का रिकॉर्ड प्राप्त करने के लिए छात्र/छात्रा का पंजीकृत संख्या सही - सही से भरें";
   var d = `रिकॉर्ड फाइल पाने के लिए नियम: सबसे पहले इंस्टीट्यूट कोड डाले फिर अपना सर्टिफिकेट नंबर डाले, जैसे`;
   return (
      <>
         <div className="container-fluid m-0 p-2 pb-5" style={MainBg}>
            <div style={{ margin: '4.1rem 0 0 0' }} id="VerificationBody">
               <div className="row m-0 p-0 justify-content-center my-4 py-5" style={{ fontFamily: "'Poppins', sans-serif" }} >
                  <UseFullCard />
                  <div className="col-md-4 col-sm-12 mt-4 ">
                     <div className='rounded-2 cardEffectsBorder cardEffects'>
                        <form className="row gy-2 m-0 myshadow searchCard m-auto text-center">
                           <div className="col-12 m-0 p-0 " style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}>
                              <div className="container text-center m-0 py-2 h4 fw-bold text-uppercase " style={{ color: 'rgb(255, 255, 255)' }}>
                                 <b style={{ letterSpacing: '1px', color: 'white' }}>
                                    Verify Your <font color="red">Certificate</font>
                                 </b>
                              </div>
                           </div>
                           <div className="col-md-12 position-relative">
                              <p className="text-center text-white py-0 my-0"> <span className="text-warning">
                                 <i className="bi bi-exclamation-triangle-fill fs-5 py-0 my-0"></i></span> Read the guidline's.</p>
                              <div className="input-group mb-3">
                                 <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                                 <input type="text" className="form-control" placeholder="Enter Registration No." onChange={(e) => { setRegNum(e.target.value) }} />
                              </div>
                           </div>
                           <div className='my-1'>
                              <div className='row'>
                                 <div className="col-8 ">
                                    <label htmlFor="captcha" style={captchaTextStyle}>
                                       <div style={backgroundStyle} className='pb-3'>  {captchaValue} </div>
                                    </label>
                                 </div>
                                 <div className="col-4">
                                    <button
                                       type="button"
                                       className="btn px-2 mx-5 border-0"
                                       onClick={handleReloadCaptcha}>
                                       <img src="/images/icon/refresh.png" alt="Reload Captcha" />
                                    </button>
                                 </div>
                                 <br />
                              </div>
                              <div>
                                 <div className="input-group">
                                    <span className="input-group-text my-0 py-0">
                                       <i className="bi bi-check2-square"></i>
                                    </span>
                                    <input
                                       type="text"
                                       id="captcha"
                                       placeholder='Enter Captcha here..'
                                       value={userInput}
                                       className='form-control d-inline border-0 bg-white'
                                       onChange={handleInputChange}
                                    />
                                 </div>
                                 <p className="text-center small my-0 py-0">ऊपर दिया गया कैप्चा कोड डालें (केस सेंसिटिव)</p>
                                 <button
                                    type="button"
                                    className='btn btn-warning btn my-3 w-100'
                                    onClick={handleCaptchaCheck}
                                    disabled={!userInput || isCaptchaVerified}
                                    style={{ marginTop: '10px' }} > <i className="bi bi-search fs-4"></i> Verify
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
                  <div className="col-md-4 col-sm-12 mt-4 rounded-2 cardEffectsBorder cardEffects" >
                     <div className="row">
                        <div className="col-12 bg-warning fw-bolder py-1 text-dark fs-4 text-uppercase">
                           <b style={{ letterSpacing: '1px' }}>
                              <span id='guidline'></span></b></div>
                     </div>
                     <div className="row"  >
                        <div className="col-12 text-white fw-normal py-0 my-0">
                           <Marquee behavior="scroll" scrollamount="1" direction="up" >
                              <p className='HindiFont'>[1]. {a} </p>
                              <hr width="100%" />
                              <p className='HindiFont' >[2]. {b}</p>
                              <hr width="100%" />
                              <p className='HindiFont' >[3]. {c} </p>
                              <hr width="100%" />
                              <p className='HindiFont'>[4]. {d} <span className='text-danger'>DIIT124 <font color="white">/</font> कोर्स का नाम <font color="white">/</font> रजिस्ट्रेशन नंबर</span>`</p>
                           </Marquee>
                        </div>
                     </div>
                  </div>
               </div>
               {
                  stdData.details &&
                  (<div className='mt-5  fs-5' >
                     <div id="printResult" className='bg-white py-3 px-4' style={{ color: '#00062B' }}>
                        <div className="m-1 bg-white certificate " id="watermark" style={{ border: "15px solid #00062B" }}>
                           <div className="header row bg-white d-flex p-2 mx-1">
                              <div className="col-2 HeaderLeft">
                                 <img src="images/vender/logo.png" width={130} alt="DIIT" />
                              </div>
                              <div className="col-7 text-center HeaderCenter">
                                 <div className="row d-flex justify-content-end ">
                                    <div className="col-8  title">
                                       <h1 className='fw-bolder m-0 p-0 custom-heading'> <big>DRISHTEE</big> </h1>
                                       <p className='p-0 m-0' style={{ color: 'maroon' }} >An ISO 9001-2008 Certified Institute</p>
                                    </div>
                                    <div className="col-4">
                                       <img src={stdData?.details?.photo} width={120} alt="DIIT_Student" className='bg-white' />
                                    </div>
                                 </div>
                              </div>
                              <div className="col-3 p-0 m-0 HeaderRight text-end fw-medium small ">
                                 <p className='p-0 m-0 small'>Reg Under Society act 21, 1860 govt, of india</p>
                                 <p className='p-0 m-0 small'>Reg NO : 72/2013-14</p>
                              </div>
                           </div>
                           <div className="caption text-center " style={{ background: '#00062B', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
                              <h1 className='py-1 fw-bolder custom-heading fahkwang-bold letterspc'>Certificate of  Course Completion</h1>
                           </div>
                           <div className="row p-1 px-3 fs-4 text-center">
                              <div className="col ">
                                 <p className='m-0 p-0 scrtspace'> This Certified is awarded to Mr/Miss
                                    <span className='scrtawd ps-1'>
                                       {stdData?.details?.name} S/O  {stdData?.details?.fatherName}
                                    </span>
                                 </p> on the successful Completion of a <span><b>{stdData?.details?.duration} </b></span> course, titled
                                 <h3 className='text-decoration-underline link-underline-danger fw-bolder' style={{ color: "red", letterSpacing: '0' }}> {stdData?.details?.description} </h3>
                                 <p className='py-1 scrtspace '>
                                    with grade & percentage <span style={{ color: 'red' }}> Execellent & {stdData?.details?.percentage} % </span>
                                    <br />Examination conducted on at all-india basis at <span style={{ color: 'red' }} className='scrtawd'> Maharajganj / U.P.</span>
                                 </p>
                                 <div className='AllCoursseContent m-0'>
                                    <ul className='px-lg-3 list-group-numbered d-flex flex-wrap fw-bold'>
                                       <p className='m-0 p-0 ps-lg-5 '> <b style={{ color: "black" }}>Modules Covered:</b> </p>
                                       {
                                          stdData?.details?.subjects?.map((subjectGroup) =>
                                             subjectGroup.map((subject) => (
                                                <li className='mx-1 px-1 list-group-item DarkBlueText' key={subject._id}>{subject.name}</li>
                                             ))
                                          )
                                       }
                                    </ul>
                                    <table className='w-100 table-responsive m-0 p-0 mt-2'>
                                       <tbody>
                                          <tr className='m-0 p-0'>
                                             <td className='m-0 p-0 text-start'>
                                                <img src="images/vender/signature.png" alt="Sign" />
                                                <p className='m-0 p-0'>Chif Exam Controller</p>
                                             </td>
                                             <td className='m-0 p-0' colSpan={3}>
                                                Date of issue: <b><span>{formatDate(stdData?.details?.completationDate)}</span></b>
                                             </td>
                                          </tr>
                                          <tr className='text-center w-100' style={{ fontWeight: 'bold', borderTop: '1px solid blue', borderBottom: '1px solid blue' }}>
                                             <td className='m-0' colSpan={2}>
                                                Student Reg No.: <span className='text-danger text-uppercase'> {stdData?.details?.regNum} </span>
                                             </td>
                                             <td className='m-0' colSpan={2}>
                                                Center Code: DIIT0124
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                                 <div className="col  text-center mt-2">
                                    <p className='border border-1 border-warning-subtle bg-warning-subtle d-inline-block px-4'>Grade Mark : Exellent (81% - 100%), &nbsp;Very Good (71% - 80), &nbsp; Good (61% - 70%), &nbsp; Satisfactory (50% - 60%)</p>
                                 </div>
                                 <div className="col fw-normal text-center mb-1">
                                    <h5 className='m-0 p-0' style={{ color: 'maroon', fontSize: '1.6rem', fontWeight: 'bold' }} > DRISHTEE INSTITUTE OF INFORMATION TECHNOLOGY</h5>
                                    <p className='m-0 p-0'>( A UNIT OF DRISHTEE EDUCATIONAL & WELFARE SOCIETY )</p>
                                    <p className='m-0 p-0 fs-4'><b>Corporate Office :  Harredeeh, ward No. 5, Nichlaul, District: Maharajganj(273304) </b></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-12 text-end">
                           <button className="btn btn-sm hover-btn p-0 m-0" onClick={downloadPDF}>
                              <img src="/images/icon/download.png" className='img-fluid p-0 m-0 ' alt="Download" />  </button>
                           <h5 className='text-white lh-lg'>Download your E-Certificate  </h5>
                        </div>
                     </div>
                  </div>)
               }
            </div>
         </div >
         <Footer />
      </>
   );
};
export default Verification;
