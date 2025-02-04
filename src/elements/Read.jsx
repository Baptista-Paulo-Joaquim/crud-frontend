import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Read() {
    const { id } = useParams(); // Get the id from URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`) // Replace :id with actual value
            .then((response) => {
                console.log(response);
                setUser(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [id]); // Depend on id to refetch if it changes

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h2>User Details</h2>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>CreatedAt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.createdAt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
