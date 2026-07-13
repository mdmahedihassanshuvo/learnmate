import { NavLink, useOutlet } from "react-router-dom";
import NavBar from "../../shared/navbar/NavBar";
import StudentHome from "../home/StudentHome";

const StudentDashboard = () => {
    const outlet = useOutlet();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard/",
            end: true,
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3.75 3v7.5h7.5V3h-7.5zm9 0v4.5h7.5V3h-7.5zm0 6v12h7.5v-12h-7.5zm-9 3v9h7.5v-9h-7.5z"
                    />
                </svg>
            ),
        },
        {
            name: "My Courses",
            path: "/dashboard/courses/",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 6.75L3.75 3v13.5L12 20.25m0-13.5L20.25 3v13.5L12 20.25m0-13.5v13.5"
                    />
                </svg>
            ),
        },
        {
            name: "Quizzes",
            path: "/student-dashboard/quizzes",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M9 5.25h6M9 9h6m-6 3.75h3.75M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25z"
                    />
                </svg>
            ),
        },
        {
            name: "Assignments",
            path: "/student-dashboard/assignments",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M9 12.75l2.25 2.25L15 10.5M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25z"
                    />
                </svg>
            ),
        },
        {
            name: "Results",
            path: "/student-dashboard/results",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M4.5 19.5v-6m5 6V9m5 10.5V4.5m5 15v-9"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="relative">
                <label
                    htmlFor="student-dashboard-drawer"
                    className="btn btn-ghost absolute left-4 top-1/2 z-10 -translate-y-1/2 lg:hidden"
                    aria-label="Open sidebar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15"
                        />
                    </svg>
                </label>

                <NavBar />
            </div>

            <div className="drawer min-h-[calc(100vh-73px)] lg:drawer-open">
                <input
                    id="student-dashboard-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />

                {/* Main content */}
                <div className="drawer-content flex min-h-[calc(100vh-73px)] flex-col">
                    {/* Page content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="mx-auto max-w-7xl">
                            {outlet || <StudentHome />}
                        </div>
                    </main>
                </div>

                {/* Sidebar */}
                <aside className="drawer-side z-40">
                    <label
                        htmlFor="student-dashboard-drawer"
                        aria-label="Close sidebar"
                        className="drawer-overlay"
                    />

                    <div className="flex min-h-full w-72 flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950 text-white">
                        <nav className="flex-1 px-4 py-5">
                            <ul className="space-y-1.5">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.path}
                                            end={item.end}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30"
                                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                                }`
                                            }
                                        >
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default StudentDashboard;
