import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Farmer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      if (response.data.success) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert("Registration Failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🛡️ FarmLink
          </h1>

          <p className="text-gray-600 mt-2">
            Create Your Account
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="Farmer">Farmer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;