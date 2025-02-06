import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {

    const [user, setUser] = useState([]);

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
       axios.delete(`/delete/${id}`)
        .then(() => {
            setUser(prevUsers => prevUsers.filter(user => user.id !== id));
            toast.error("User deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        });
    }

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
