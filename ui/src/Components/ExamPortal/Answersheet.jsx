import React from 'react'

export default function Answersheet() {
    return (
        <>
            <div className="row h-100">
                <div className="col">
                    <div class="table-responsive">
                        <table class="table table-white table-sm small table-hover table-bordered" >
                            <thead className='table-dark'>
                                <tr>
                                    <th>Rag No.</th>
                                    <th>Name of student </th>
                                    <th>Course</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">121</td>
                                    <td>Hridesh</td>
                                    <td>ADCA</td>
                                </tr>

                                <tr>
                                    <th>Total Questions</th>
                                    <th>True</th>
                                    <th>False</th>
                                </tr>
                                <tr>
                                    <td scope="row">100</td>
                                    <td>95</td>
                                    <td>5</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
