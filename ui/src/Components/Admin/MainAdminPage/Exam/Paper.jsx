import React from 'react';
export default function Paper() {
    return (
        <div className='bg-light p-2'>

            <ul className="list-group p-3 bg-white myshadow">
                <div className="d-flex justify-content-between m-0 p-0">
                    <p className="text-danger">02:00 Pm</p>
                    <p className="text-end text-primary">Total Question : 1</p>
                </div>
                <li className='list-unstyled pb-2'>
                    <strong>Q:1 Full form of HTML.?</strong>
                    <ul className='list-group py-3'>
                        <li className='list-group-item border border-info bg-info-subtle mcqCode rounded-2'><input type="radio" id="q1a" name="q1" />
                            <label className='mx-1' htmlFor="q1a">Hyper text mark-up language</label>
                        </li>
                        <li className='list-group-item border border-info bg-info-subtle mcqCode rounded-2'><input type="radio" id="q1b" name="q1" />
                            <label className='mx-1' htmlFor="q1b">Hyper test mark-up letter</label>
                        </li>
                        <li className='list-group-item border border-info bg-info-subtle mcqCode rounded-2'><input type="radio" id="q1c" name="q1" />
                            <label className='mx-1' htmlFor="q1c">Hyper text main language</label>
                        </li>
                        <li className='list-group-item border border-info bg-info-subtle mcqCode rounded-2'><input type="radio" id="q1d" name="q1" />
                            <label className='mx-1' htmlFor="q1d">hyphen text main language</label>
                        </li>
                    </ul>
                </li>
                <li className='d-flex justify-content-between py-2'>
                    <button className="btn btn-primary">Previous</button>
                    <button className="btn btn-primary">Next</button>
                </li>
            </ul>
        </div>
    );
}
