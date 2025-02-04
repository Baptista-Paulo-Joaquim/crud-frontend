import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/read")
            .then((response) => {
                console.log(response);
                setData(response.data.users);
            })
            .catch((error) => {
                console.error("There was an error fetching the data:", error);
            });
    }, []); 

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
                            {
                                data.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.createdAt}</td>
                                        <td>
                                            <a href={"/user/" + user.id} className="write" title="Write" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a>
                                            <a href={"/update/" + user.id} className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                            <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
    );
}
