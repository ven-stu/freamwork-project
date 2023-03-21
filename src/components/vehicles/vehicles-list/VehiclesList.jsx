import { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "../../../utils/services/vehicle-http-utils";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import { Button } from 'react-bootstrap';
import { getLoggedCustomer } from "../../../utils/services/auth-http-utils";
import Form from 'react-bootstrap/Form';
import { useNavigate} from 'react-router';
import { useSearchParams } from "react-router-dom";


export function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    var searchedBrand = "";
    const [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get('brand')

    useEffect(() => {
        if (params!=""&&params!=null) {
            getVehicles()
            .then((response) => {
                var newdata = response.data;
                newdata = newdata.filter(vehicle => vehicle.brand==params)
                setVehicles(newdata);
            });
        }
        else{
             getVehicles()
            .then((response) => {
                setVehicles(response.data);
            });
    }
       }, []);

    const onDelete = (id) => {
        deleteVehicle(id).then(() => {
            setVehicles((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id);
            });
        });
    }

    const renderAdminButton = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer.isAdmin) {
            return <Button style={{height:"10vh", display:'block'}}  href = "/vehicles/create">Add</Button>
 
        }
    }

    const onSubmit = (event) => {
        useNavigate(`/vehicles/`+searchedBrand.toString());
    }

    const onFormChange = (event) => {
      searchedBrand = event.target.value;
    }

 

    return (
        <div>
            <Form className="customer-form" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control type="text" name="brand" onChange={onFormChange} placeholder="Search for car brand" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Search
        </Button>
    </Form>
        <div className="vehicles-list" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={onDelete} />)}
            
        </div>
        {renderAdminButton()}
    </div>
        
    );
}