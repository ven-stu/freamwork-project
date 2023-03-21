import { getLoggedCustomer } from "../services/auth-http-utils";
import { Navigate } from "react-router";

export function AuthenticatedRoute({ children }) {
    const customer = getLoggedCustomer();

    if (!customer) {
        return <Navigate to="/login" />;
    }

    return children;
}