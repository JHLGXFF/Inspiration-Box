import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState({ full_name: "", email: "", gender: "", bio: "", avatar_url: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const res = await axios.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put("/auth/me", user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage("Profile updated successfully");
        } catch (err) {
            setMessage("Update failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
            <header className="space-y-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
                    <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Back to Home
                    </Link>
                </div>
                <p className="text-sm text-gray-600">
                    Manage your personal information.
                </p>
            </header>

            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                {message && <div className="mb-4 text-sm text-green-600 font-medium">{message}</div>}
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                            value={user.full_name || ""}
                            onChange={e => setUser({ ...user, full_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                            value={user.email || ""}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <input
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                            value={user.gender || ""}
                            onChange={e => setUser({ ...user, gender: e.target.value })}
                            placeholder="e.g. Male, Female, Non-binary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                            rows={3}
                            value={user.bio || ""}
                            onChange={e => setUser({ ...user, bio: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                        <input
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                            value={user.avatar_url || ""}
                            onChange={e => setUser({ ...user, avatar_url: e.target.value })}
                        />
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none">
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>

            <section className="border-t border-gray-100 pt-6">
                <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700">
                    Sign out
                </button>
            </section>
        </main>
    );
}
