import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");



    if (!token) {

        return <Navigate to="/login"> </Navigate>
    }

    return children;
}
export default ProtectedRoute

