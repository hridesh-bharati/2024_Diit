import React, { useState, useEffect } from 'react';
export default function UpdateCourse() {
    const [showInput, setShowInput] = useState(false);
    const [id, setId] = useState('');
    const [notice, setNotice] = useState([]);
    const [title, setTitle] = useState('');
    const [nMessage, setNewMessage] = useState('');
    const fetchNotice = async () => {
        await fetch('http://localhost:3000/admin/getAllNotice', {
            method: "get"
        }).then(data => data.json())
            .then((data) => {
                setNotice(data);
            })
    }
    const deleteNotice = async (_id) => {
        await fetch(`http://localhost:3000/admin/deleteNotice/${_id}`, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('aJwt')
            }
        }).then(data => data.json())
            .then((data) => {

                fetchNotice();
            })
    }
    const updateNotice = async (_id) => {
        await fetch(`http://localhost:3000/admin/updateNotice`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('aJwt')
            },
            body: JSON.stringify({ _id: _id, title: title, nMessage: nMessage })
        }).then(data => data.json())
            .then((data) => {
                setShowInput(false)
                fetchNotice();
            })
    }
    useEffect(() => {
        fetchNotice();
    }, [])
    return (
        <>
            <table className='table table-sm table-borderd border-primary py-2 mx-0 px-0'>
                <tbody>
                    <tr className="table-dark">
                        <th>Title</th>
                        <th colSpan={2}>Description</th>
                        <th>Action</th>
                    </tr>
                    {
                        notice && notice.map((notice, index) => {
                            return (
                                <tr key={index}>
                                    <td className='fw-bold text-primary'>{notice.title}</td>
                                    <td>{notice.nMessage}</td>
                                    <td><button className="btn btn-primary btn-sm" onClick={() => {
                                        setTitle(notice.title);
                                        setNewMessage(notice.nMessage);
                                        setId(notice._id);
                                        setShowInput(true)
                                    }}><i className="bi bi-pencil"></i>&nbsp; Edit</button></td>
                                    <td><button className="btn btn-danger small btn btn-sm" onClick={() => { deleteNotice(notice._id) }}>
                                        <i className="bi bi-trash-fill"></i>&nbsp; Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {showInput && <div className='py-2'>
                <input type="text" className='form-control my-2' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='New Title' />
                <textarea className='form-control my-2' value={nMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='New Description' />
                <button className="btn btn-primary" onClick={() => { updateNotice(id) }}>Update</button>
            </div>}
        </>
    );
}
