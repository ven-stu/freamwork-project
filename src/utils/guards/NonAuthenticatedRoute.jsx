import { getLoggedCustomer } from "../services/auth-http-utils";
import { useNavigate, Navigate } from "react-router";
import { CustomersList } from "../../components/customers/customers-list/CustomersList";

export function NonAuthenticatedRoute({ children }) {
    const customer = getLoggedCustomer();

    if (customer) {
        return <Navigate to="/customers" />;
    }

    return children;
}