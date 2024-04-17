import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const fetchCourse = async () => {
        await fetch('http://localhost:3000/admin/getCourseList', {
            method: "get",
            headers: {
                "Authorization": localStorage.getItem('aJwt')
            }
        })
            .then(data => data.json())
            .then((data) => {
                if (data) {
                    setCourseList(data)
                }
                else {
                    toast.error(data.error);
                }
            })
            .catch((error) => {
                toast.error(error);
            })
    }
    const deleteCourse = async (_id) => {
        await fetch(`http://localhost:3000/admin/deleteCourse/${_id}`, {
            method: 'delete',
            headers: {
                'authorization': localStorage.getItem('aJwt')
            }
        }).then(data => data.json())
            .then((data) => {
                if (!data.error) {
                    fetchCourse();
                }
                else {
                    toast.error(data.error);
                }
            }).catch((error) => {
                toast.error(error);
            })
    }
    useEffect(() => {
        fetchCourse();
    }, [])
    return (
        <div className="w-100 table-responsive small py-1 my-1">
            <table className="table table-sm w-100 table-bordered border-primary-subtle table-responsive">
                <thead className="table table-dark table-sm  ">
                    <tr>
                        <th scope="col">Course</th>
                        <th scope="col">Description</th>
                        <th scope="col">Content</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Prerequisites</th>
                        <th scope="col">delete</th>
                    </tr>
                </thead>
                <tbody className="small">
                    {
                        courseList.length > 0 && courseList.map((course) => {
                            return (
                                <tr key={course._id}>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.subjects.map((subject) => {
                                        return (
                                            subject.name + `, `
                                        )
                                    })}</td>
                                    <td>{course.duration}</td>
                                    <td>{course.prerequisites}</td>
                                    <td onClick={() => { deleteCourse(course._id) }}><button className="btn btn-danger btn-sm"><i className="bi bi-trash"></i></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
