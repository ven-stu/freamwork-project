import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCustomerById } from "../../../utils/services/customer-http-utils";
import { CustomerCard } from "../customer-card/CustomerCard";
import { getVehicles } from "../../../utils/services/vehicle-http-utils";

import './CustomerProfile.scss';
import { deleteRental, getRentals, getPrice } from "../../../utils/services/rental-http-utils";

export function CustomerProfile() {
    const params = useParams();
    const [customer, setCustomer] = useState({});
    const [customerRentals, setCustomerRentals] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        if (params.id) {
            const promises = [getCustomerById(params.id), getRentals(),getVehicles()];
            Promise.all(promises)
                .then(result => {
                    setCustomer(result[0].data);
                    setCustomerRentals(result[1].data);
                    setVehicles(result[2].data);
                });
        }
    }, [params.id])

    const onDeleteRental = (id) => {
        deleteRental(id).then(() => {
            setCustomerRentals((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id);
            });
        });
    }

    return (
        <div className="customer-profile">
            <div className="customer-info">
                <CustomerCard customer={customer} />
            </div>
            <div className="customer-rentals">
                {
                    customerRentals && customerRentals.map(rental => {

                        const renderActionButton = (id) => {
                            return <button className="Delete" onClick={() => onDeleteRental(id) }>Delete</button>
                        }
                  
                        const getVehicle =(id) => {
                            var vehicleRes = vehicles.filter(obj=>obj.id==rental.vehicleId)[0];
                              return <div>
                                    <div>Vehicle Brand: {vehicleRes.brand}</div>
                                    <div>Vehicle Model: {vehicleRes.model}</div>
                                    <div>Vehicle Seats: {vehicleRes.numberOfSeats}</div>
                                    <div>Vehicle Fuel: {vehicleRes.fuelType}</div>
                                    <div>Total Price: {getPrice(rental,vehicleRes.pricePerDay,customer.isVip)}</div>
                                </div>
                        }

                        



                        return <div className={`customer-rental`} key={rental.id}>
                            <div className="rental-info">
                                <div>Start date and time: {rental.startDateTime}</div>
                                <div>End date and time: {rental.endDateTime}</div>
                                {getVehicle(rental)}
                            </div>
                            <div className="action-button">
                                {renderActionButton(rental.id)}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}