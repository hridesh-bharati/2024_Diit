import React from 'react';
import '../../App.css';
import Exams from './Exams';
function StudentLogin() {
    return (
        <>
            <div className="wrapper">
                <div className="text-center shadow shadow-sm fw-bold text-success p-3">Student Examination Login Portal</div><div className="Stdlogo mt-4"><img src="/images/icon/user.png" alt="Student" /></div>

                <form className="p-3 mt-3">
                    <div className="form-field d-flex align-items-center"><i className="bi bi-person-circle"></i>
                        <input type="text" placeholder="Candidate Name" />
                    </div>
                    <div className="form-field d-flex align-items-center"><i className="bi bi-person-lock"></i>
                        <input type="number" placeholder="Registration No." />
                    </div>
                    <div className="form-field d-flex align-items-center"><i className="fa fa-book" aria-hidden="true"></i>
                        <input type="text" placeholder="Course Name" />
                    </div>
                    <button className="btn btn-info mt-3 text-white fw-bold">Login</button>
                </form>
            </div>
            <Exams />
        </>
    );
}

export default StudentLogin;
