import { useOutlet } from "react-router-dom";
import NavBar from "../../shared/navbar/NavBar";

const TeacherDashboard = () => {
    const outlet = useOutlet();

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    {outlet || (
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
                                Teacher workspace
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                                Welcome to your dashboard
                            </h1>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;
