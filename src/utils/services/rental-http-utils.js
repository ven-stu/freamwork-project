import axios from "axios";
import { getLoggedCustomer } from "./auth-http-utils";
import { getCustomerById, saveCustomer } from "./customer-http-utils";
import { getVehicleById, saveVehicle } from "./vehicle-http-utils";

const apiUrl = 'http://localhost:3005/rentals';

export function getRentals() {
    const loggedCustomer = getLoggedCustomer();
    const opennedProfileId = window.location.href.split("/").pop();

    if (loggedCustomer.isAdmin && loggedCustomer.id==opennedProfileId)
    {
        return axios.get(apiUrl);
    }
    else if(loggedCustomer.isAdmin)
    {
        const correctUrl = `${apiUrl}?customerId=${opennedProfileId}`;
        return axios.get(correctUrl);
    }

    const url=`${apiUrl}?customerId=0`;
    if(loggedCustomer.id==opennedProfileId)
    {
        const correctUrl = `${apiUrl}?customerId=${loggedCustomer.id}`;
        return axios.get(correctUrl);
    }
    return axios.get(url);
}

export function getRentalById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function getPrice(rental,vehPrice,isVip){
    var date1 = rental.startDateTime.split('/');
    date1[2] = date1[2].substring(0,4);
    var date2 = rental.endDateTime.split('/');
    date2[2] = date2[2].substring(0,4);
    var difInDays = (date2[2]-date1[2])*365 + (date2[0]-date1[0])*30 + (date2[1]-date1[1]);
    var price = difInDays*vehPrice;
    if(isVip>3)
    {
        price = price - ((price/100)*15);
    }
    else if(difInDays>10)
    {
        price = price - (price/10);
    }
    else if(difInDays>5)
    {
        price = price - ((price/100)*7);
    }
    else if(difInDays>3)
    {
        price = price - (price/20);
    }
    return price;
}

export function saveRental(rentalObject) {
    if (rentalObject.id) {
        return axios.put(`${apiUrl}/${rentalObject.id}`, rentalObject);
    }

    const loggedCustomer = getLoggedCustomer();
    rentalObject.customerId = loggedCustomer.id;
    getCustomerById(loggedCustomer.id).then(result=>{
        var vip = result.data.isVip;
        vip = vip+1;
        result.data.isVip=vip;
        saveCustomer(result.data);    
    });
    getVehicleById(rentalObject.vehicleId).then(result=>{
        var count = parseInt(result.data.count);
        count = count-1;
        result.data.count = count.toString();
        saveVehicle(result.data);
    })
    console.log(rentalObject);
    return axios.post(apiUrl, rentalObject);
}

export function deleteRental(id) {
    getRentalById(id).then(result=>{
        getVehicleById(result.data.vehicleId).then(result=>{
            var count = parseInt(result.data.count);
            count = count+1;
            result.data.count = count.toString();
            saveVehicle(result.data);
        })
    })
    return axios.delete(`${apiUrl}/${id}`);
}