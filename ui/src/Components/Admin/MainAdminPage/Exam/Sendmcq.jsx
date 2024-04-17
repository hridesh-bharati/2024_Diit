import React, { useState } from 'react';

const Sendmcq = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-md-12 pb-5">
                <form className='bg-white myshadow2 p-4'>
                    <h4 className="text-center text-primary pb-3 fw-bolder">Send Question's for student</h4>
                    <div className="mb-3 input-group">
                        <label className="input-group-text text-primary">Question:</label>
                        <input type="text" className="form-control form-control-sm " name="question" />
                    </div>

                    <input type="text" className="form-control mb-2" placeholder='Option 1' />
                    <input type="text" className="form-control mb-2" placeholder='Option 2' />
                    <input type="text" className="form-control mb-2" placeholder='Option 3' />
                    <input type="text" className="form-control mb-2" placeholder='Option 4' />

                    <div className="mb-3 input-group">
                        <label className="input-group-text text-primary">Answer:</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>

                    <div className="pb-2 d-flex justify-content-center">
                        <button type="button" className="btn btn-primary">Add Question</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sendmcq;
