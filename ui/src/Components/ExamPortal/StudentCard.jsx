import React from 'react'

export default function StudentCard() {
    return (
        <>
            <div className="bg-light m-0 py-5 myshadow">
                <div className="row mx-2">
                    <div className="col-md-4 mx-0 px-0 my-2">
                        <div className="card mx-2 text-center py-3">
                            <img src="/images/vender/abhay.jpg" style={{ width: '120px' }} className='card-img-top img-fluid m-auto border border-3 border-light' alt="Title" />
                            <div className="card-body text-primary text-uppercase fw-bolder ">
                                <h4 className="card-title fw-bolder p-0 m-0">Manjesh Kumar</h4>
                                <p className="py-0 my-0">Course: ADCA</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mx-0 px-0 my-2">
                        <div className="card mx-2">
                            <h4 className="card-title m-1 fw-bold text-primary"><i className="bi bi-front"></i> Generalar Inforamtion</h4>
                            <div className="card-body">
                                <div className="table table-dark table-responsive m-0 p-0 table-sm small">
                                    <table className="table table-hover table-sm table-bordered">
                                        <tbody>
                                            <tr>
                                                <td scope="col"><p className="py-0 my-0">Student Name</p></td>
                                                <td>Manjesh Kumar</td>
                                            </tr>
                                            <tr>
                                                <td scope="col"><p className="py-0 my-0">Registration No.:</p></td>
                                                <td>1206</td>
                                            </tr>
                                            <tr>
                                                <td scope="col"><p className="py-0 my-0">Course:</p></td>
                                                <td>ADCA</td>
                                            </tr>
                                            <tr>
                                                <td scope="col"><p className="py-0 my-0">Joining Year: </p></td>
                                                <td>1206</td>
                                            </tr>
                                            <tr>
                                                <td scope="col"><p className="py-0 my-0">Contact: </p></td>
                                                <td>7267995307</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
