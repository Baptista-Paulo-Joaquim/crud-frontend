import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create(){

    let [user, setUser] = useState({
        name: "",
        email: ""
    });

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
         axios.post("/create/user", user)
        .then((res) => {
            console.log(res);
            navigate("/");
        }).catch((error) => {
            return error;
        }); 
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
                    <h2 className="mb-4">Formulário</h2>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input type="text" name="name" className="form-control" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                    <button type="submit" className="btn btn-primary w-100">Enviar</button>
                </form>
                </div>
            </div>
        </div>
    )
}