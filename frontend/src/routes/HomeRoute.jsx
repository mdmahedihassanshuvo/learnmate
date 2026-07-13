import { Navigate } from "react-router-dom";
import { getAuth } from "../auth/authStorage";
import Home from "../pages/home/home/Home";

const HomeRoute = () => {
    const auth = getAuth();

    return auth
        ? <Navigate to="/dashboard/" replace />
        : <Home />;
};

export default HomeRoute;
