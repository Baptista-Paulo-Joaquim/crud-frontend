import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";

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
/*         <div className="container">
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
        </div> */

        <div class="w-full max-w-xs flex items-center justify-center min-h-screen mx-auto">
        <form onSubmit={handleUpdate} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="font-bold text-gray-700 text-center py-5">Edit User</h2>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="name" type="text" placeholder="Name" name="name" 
                value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            </div>

            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" type="email" placeholder="Email" name="email" 
                value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            </div>
            
            <div class="flex items-center justify-center justify">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update
            </button>
            <Link to={"/"} class="bg-red-500 hover:bg-red-700 text-white m-3 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Voltar</Link>
            </div>
        </form>
        </div>
    )
}