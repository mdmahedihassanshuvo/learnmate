import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../../../auth/authStorage";
import { apiUrl } from "../../../lib/apiUrl";

const NavBar = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const auth = getAuth();
    const user = auth?.user;
    const displayName = user?.username || user?.email || "User";
    const roleLabel = user?.is_teacher ? "Teacher" : "Student";

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleLogout = async () => {
        if (isLoggingOut) {
            return;
        }

        setIsLoggingOut(true);

        try {
            if (auth?.refresh && auth?.access) {
                await axios.post(
                    apiUrl("/api/v1/core/logout/"),
                    { refresh: auth.refresh },
                    {
                        headers: {
                            Authorization: `Bearer ${auth.access}`,
                        },
                    }
                );
            }
        } catch (error) {
            console.warn("Logout request failed:", error);
        } finally {
            clearAuth();
            setIsOpen(false);
            navigate("/login/", { replace: true });
            setIsLoggingOut(false);
        }
    };

    return (
        <nav className="navbar w-full border-b border-slate-200 bg-white px-4 py-2 shadow-sm lg:px-8">
            {/* Logo */}
            <div className="flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-3 text-xl font-bold text-slate-800"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-md">
                        AI
                    </div>

                    <span>
                        LearnMate
                        <span className="ml-1 text-violet-600">AI</span>
                    </span>
                </Link>
            </div>

            {/* Profile Dropdown */}
            <div
                ref={dropdownRef}
                className="relative rounded-2xl"
            >
                <button
                    type="button"
                    onClick={() => setIsOpen((previous) => !previous)}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className="flex items-center gap-3 rounded-4xl border border-slate-200 bg-slate-50 px-3 py-2 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50"
                >
                    {/* Profile image */}
                    <div className="avatar">
                        <div className="w-10 rounded-full ring-2 ring-violet-500 ring-offset-2 ring-offset-white">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="User profile"
                            />
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {displayName}
                        </p>
                        <p className="text-xs text-slate-500">
                            {roleLabel}
                        </p>
                    </div>

                    {/* Down arrow */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                <ul
                    className={`menu absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-150 ${
                        isOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible -translate-y-2 opacity-0"
                    }`}
                >
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                navigate("/dashboard/profile/");
                            }}
                            className="flex items-center gap-3 rounded-xl py-3 text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                                />
                            </svg>

                            Profile
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex w-full items-center gap-3 rounded-xl py-3 text-left text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M4.5 12a7.5 7.5 0 0114.776-1.822M19.5 12a7.5 7.5 0 01-14.776 1.822M8.25 12h7.5"
                                />
                            </svg>

                            Settings
                        </button>
                    </li>

                    <div className="my-1 border-t border-slate-200" />

                    <li>
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex w-full items-center gap-3 rounded-xl py-3 text-left text-red-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>

                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
