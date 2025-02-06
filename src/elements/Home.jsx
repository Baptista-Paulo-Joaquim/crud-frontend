import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Home() {

    const [user, setUser] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
            navigate(".", { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        axios.get("/read")
        .then(res => {
            setUser(res.data);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        })
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete/${id}`)
                    .then(() => {
                        setUser(prevUsers => prevUsers.filter(user => user.id !== id));
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                        Swal.fire("Error!", "Failed to delete user.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
            <ToastContainer />
            <Link to={`/create`} className="btn btn-success p mb-2">Create user</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/user/${user.id}`} className="btn btn-outline-info btn-sm">View</Link>
                                    <Link to={`/edit/${user.id}`} className="btn btn-outline-primary btn-sm m-1">Edit</Link>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
