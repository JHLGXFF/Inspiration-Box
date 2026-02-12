import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.access_token);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm border border-gray-200">
                <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Welcome Back
                </h2>
                {error && (
                    <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
