import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../../../utils/services/customer-http-utils";
import { CustomerCard } from "../customer-card/CustomerCard";

export function CustomersList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers()
            .then((response) => {
                setCustomers(response.data);
            });
    }, []);

    const onDelete = (id) => {
        deleteCustomer(id).then(() => {
            setCustomers((prevState) => {
                return prevState.filter(customer => customer.id !== id);
            });
        });
    }

    return (
        <div className="customers-list" style={{ display: 'flex', justifyContent:'center',textAlign: 'center' }}>
            {customers.map(customer => <CustomerCard key={customer.id} customer={customer} onDelete={onDelete} />)}
        </div>
    );
}