import { getCustomers,getCustomerById, saveCustomer  } from "./customer-http-utils";
import { parseBool } from "./bool-utils";

export function getLoggedCustomer() {
    const customer = JSON.parse(localStorage.getItem('loggedCustomer'));
    if (customer)
        customer.isAdmin = parseBool(customer.isAdmin);

    return customer;

}

export async function login(loginCreds) {
    const customers = (await getCustomers()).data;

    const foundCustomer = customers
        .find(customer => customer.email === loginCreds.email && customer.password === loginCreds.password);

    if (!foundCustomer) {
        throw new Error('Invalid email/password');
    }

    if(foundCustomer.timeElapsed<=0)
    {
        getCustomerById(foundCustomer.id).then(result=>{
            result.data.timeElapsed=59;
            result.data.isVip=0;
            saveCustomer(result.data);    
        });
    }
    else{
        let today = new Date().toLocaleDateString()
      if(foundCustomer.lastOnline!=today)
      {
        getCustomerById(foundCustomer.id).then(result=>{
            var time = result.data.timeElapsed;
            time = time-1;
            result.data.timeElapsed=time;
            result.data.lastOnline=today;
            saveCustomer(result.data);    
        });
      }
    }
 

    localStorage.setItem('loggedCustomer', JSON.stringify(foundCustomer));
    return foundCustomer;

}

export function logout() {
    return new Promise((resolve) => {
        localStorage.removeItem('loggedCustomer');
        resolve();
    });
}