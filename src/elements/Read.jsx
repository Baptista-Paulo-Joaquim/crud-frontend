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
/*         <div className="container">
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
        </div> */

        <div class="w-full max-w-xs flex items-center justify-center min-h-screen mx-auto">
        <form class="bg-blue shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="font-bold text-gray-700 text-center py-5">User ({user.id})</h2>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="name" type="text" readOnly placeholder="Name" name="name" 
                value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            </div>

            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" type="email" readOnly placeholder="Email" name="email" 
                value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            </div>
            
            <div class="flex items-center justify-center">
                <Link to={"/"} class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Voltar</Link>
            </div>
        </form>
        </div>
    )
}