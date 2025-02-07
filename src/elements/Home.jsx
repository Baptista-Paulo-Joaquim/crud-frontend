import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
<div class="w-3/5 p-10 m-20 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg p-4 border border-gray-300 rounded-lg">
    <ToastContainer />

    <div class="mb-2 flex justify-end">
        <Link to={`/create`} class="px-3 py-3 text-white bg-blue-700 rounded hover:bg-blue-500 text-xs">
            Add New User
        </Link>
    </div>

    <table class="w-full text-xs text-left text-gray-700 border border-gray-200 rounded-lg">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th class="px-4 py-2 border-b">ID</th>
                <th class="px-4 py-2 border-b">NAME</th>
                <th class="px-4 py-2 border-b">EMAIL</th>
                <th class="px-4 py-2 border-b">ACTION</th>
            </tr>
        </thead>
        <tbody>
            {user.map((user, index) => (
                <tr key={index} class="bg-white border-b hover:bg-gray-100">
                    <td class="px-4 py-2">{user.id}</td>
                    <td class="px-4 py-2">{user.name}</td>
                    <td class="px-4 py-2">{user.email}</td>
                    <td class="px-4 py-2 flex gap-1">
                        <Link to={`/user/${user.id}`} class="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 text-xs">View</Link>
                        <Link to={`/edit/${user.id}`} class="px-2 py-1 text-white bg-green-600 rounded hover:bg-green-700 text-xs">Edit</Link>
                        <button onClick={() => handleDelete(user.id)} class="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700 text-xs">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    )
}
