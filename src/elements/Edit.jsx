import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Edit(){

    const navigate = useNavigate();
    const { id } = useParams();
    let [user, setUser] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        axios.get(`/user/${id}`)
        .then(res => {
            console.log(res)
            setUser(res.data);
        })
        .catch(error => {
        console.error("Error fetching user:", error);
        });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`/edit/${id}`, user)
        .then(res => {
            console.log(res)
            setUser(user);
            navigate("/", { state: { message: "User updated successfully!" } });
        })
        .catch(error => {
            console.log(user)
            console.error("Error editiong user:", error.message);
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                <form onSubmit={handleUpdate} className="border p-4 shadow rounded">
                    <h2 className="mb-4">Edit user</h2>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input type="text" name="name" className="form-control" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                    <button className="btn btn-primary w-100">Submit</button>
                </form>
                </div>
            </div>
        </div>
    )
}