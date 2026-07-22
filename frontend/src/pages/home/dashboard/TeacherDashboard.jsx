import { NavLink, useOutlet } from "react-router-dom";
import NavBar from "../../shared/navbar/NavBar";
import TeacherMenuItems from "../../shared/sidebar/menuItems/TeacherMenuItems";
import TeacherHome from "../home/TeacherHome";

const TeacherDashboard = () => {
    const outlet = useOutlet();
    const menuItems = TeacherMenuItems();

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
                            {outlet || <TeacherHome />}
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

export default TeacherDashboard;
