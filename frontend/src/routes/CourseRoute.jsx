import { Navigate } from "react-router-dom";
import { getAuth } from "../auth/authStorage";
import TeacherCourse from "../pages/course/teacherCourse/TeacherCourse";
import StudentCourse from "../pages/course/studentCourse/StudentCourse";

const CourseRoute = () => {
    const auth = getAuth();

    if (!auth) {
        return <Navigate to="/login/" replace />;
    }

    return auth.user.is_teacher
        ? <TeacherCourse />
        : <StudentCourse />;
};

export default CourseRoute;
