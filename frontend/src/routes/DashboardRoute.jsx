import { Navigate } from "react-router-dom";
import { getAuth } from "../auth/authStorage";
import StudentDashboard from "../pages/home/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/home/dashboard/TeacherDashboard";

const DashboardRoute = () => {
    const auth = getAuth();

    if (!auth) {
        return <Navigate to="/login/" replace />;
    }

    return auth.user.is_teacher
        ? <TeacherDashboard />
        : <StudentDashboard />;
};

export default DashboardRoute;
