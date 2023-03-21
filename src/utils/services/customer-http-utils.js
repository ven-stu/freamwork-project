import axios from 'axios';
import { getLoggedCustomer} from "./auth-http-utils";

const apiUrl = 'http://localhost:3005/customers';

export function getCustomers() {
    return axios.get(apiUrl);
}

export function getCustomerById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export async function saveCustomer(customerObj) {

    if (!customerObj.photo) {
        customerObj.photo = `https://picsum.photos/200/300?random=${Math.random()}`
    }

    const response = await getCustomers();
    const customers = response.data;
    const existingCustomer = customers.find(u => u.email === customerObj.email && u.id !== customerObj.id);

    if (existingCustomer) {
        throw new Error('Email already taken.');
    }

    if (customerObj.id) {
        return axios.put(`${apiUrl}/${customerObj.id}`, customerObj).then(() => {
            if(!(getLoggedCustomer().isAdmin))
            {
                localStorage.setItem('loggedCustomer', JSON.stringify(customerObj));
            }
           
        });
    }

    return axios.post(apiUrl, customerObj);
}

export function deleteCustomer(id) {
    return axios.delete(`${apiUrl}/${id}`);
}