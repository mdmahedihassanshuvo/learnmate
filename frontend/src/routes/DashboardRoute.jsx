import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, hasTeacherAccess, updateAuthUser } from "../auth/authStorage";
import { apiUrl } from "../lib/apiUrl";
import StudentDashboard from "../pages/home/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/home/dashboard/TeacherDashboard";

const DashboardRoute = () => {
    const [auth, setAuth] = useState(() => getAuth());
    const [isLoading, setIsLoading] = useState(Boolean(auth));

    useEffect(() => {
        if (!auth?.access) {
            return;
        }

        let shouldIgnore = false;

        const loadCurrentUser = async () => {
            try {
                const response = await axios.get(apiUrl("/api/v1/core/me/"), {
                    headers: {
                        Authorization: `Bearer ${auth.access}`,
                    },
                });
                if (!shouldIgnore) {
                    setAuth(updateAuthUser(response.data));
                }
            } catch {
                if (!shouldIgnore) {
                    setAuth(getAuth());
                }
            } finally {
                if (!shouldIgnore) {
                    setIsLoading(false);
                }
            }
        };

        loadCurrentUser();

        return () => {
            shouldIgnore = true;
        };
    }, [auth?.access]);

    if (!auth) {
        return <Navigate to="/login/" replace />;
    }

    if (isLoading) {
        return null;
    }

    return auth?.user?.is_teacher
        ? <TeacherDashboard />
        : <StudentDashboard />;
};

export default DashboardRoute;
