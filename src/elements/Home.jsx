import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch users
    const fetchUsers = () => {
        axios.get("http://localhost:5000/read")
            .then((response) => {
                console.log(response);
                setData(response.data.user); // Make sure backend returns `users` array
            })
            .catch((error) => {
                console.error("There was an error fetching the data:", error);
            });
    };

    // Handle delete user
    const handleDelete = async (id) => {
        const confirmDelete = toast("Do you really want to delete?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/delete/${id}`);
                setData(data);
                toast.success("User deleted succesfuly");
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error("User deleted succesfuly");
            }
        }
    };

    return (
        <div className="container">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2>User <b>Details</b></h2></div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>CreatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <Link to={"user/" + user.id} className="write" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link>
                                        <Link to="#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link>
                                        <button onClick={() => handleDelete(user.id)} className="delete" title="Delete" data-toggle="tooltip">
                                            <i className="material-icons">&#xE872;</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
    );
}
