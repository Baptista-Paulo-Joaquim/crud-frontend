import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Read(){

    let { id } = useParams();
    let [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`/user/${id}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(error => {
        console.error("Error fetching user:", error);
        });
    }, [id]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                <form className="border p-4 shadow rounded">
                    <h2 className="mb-4">View user</h2>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input type="text" readOnly name="name" className="form-control" value={user.name || "Nothing"} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" readOnly name="email" className="form-control" value={user.email || "Nothing"} />
                        </div>
                    <Link to={"/"} className="btn btn-info w-100">Voltar</Link>
                </form>
                </div>
            </div>
        </div>
    )
}