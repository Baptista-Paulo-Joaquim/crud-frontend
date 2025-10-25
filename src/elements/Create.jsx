import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  let [user, setUser] = useState({
    name: "",
    email: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/create/user", user)
      .then((res) => {
        navigate("/", { state: { message: "User created successfully!" } });
      })
      .catch((error) => {
        toast.error("Failed to create user!");
        return error;
      });
  };

  return (
    <div class="w-full max-w-xs flex items-center justify-center min-h-screen mx-auto">
      <form
        onSubmit={handleSubmit}
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 class="font-bold text-gray-700 text-center py-5">
          Create New User
        </h2>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
