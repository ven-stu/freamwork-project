import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { saveVehicle, getVehicleById } from '../../../utils/services/vehicle-http-utils';
import { useNavigate, useParams, Navigate } from 'react-router';
import { useEffect } from 'react';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';

import './VehicleForm.scss';

export function VehicleForm() {
    const emptyVehicle = {
        brand:'',
        type: 'economy',
        photo: '',
        model:'',
        constructionYear:'',
        numberOfSeats:'',
        pricePerDay:'',
        count:'',
        fuelType:'petrol'

    };
    const [currentVehicle, setCurrentVehicle] = useState(emptyVehicle);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id)
                .then((response) => {
                    setCurrentVehicle(response.data);
                })
        } else {
            setCurrentVehicle(emptyVehicle);
        }
    }, [params.id]);


    const onFormControlChange = (event) => {
        const target = event.target;
        let prop = 'value';
        if (target.name === 'isAdmin')
            prop = 'checked';

        setCurrentVehicle((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        saveVehicle(currentVehicle).then(() => {
            navigate('/vehicles');
        }).catch(error => {
            setError(error.message);
        });
    }
    const navigateIfNotAdmin = () => {
        const loggedCustomer = getLoggedCustomer();

        if (!loggedCustomer.isAdmin){
            return <Navigate to='/customers' />
        }
        
    }


    return (
        <div className="customer-form-wrapper">
            {navigateIfNotAdmin()}
            <Form className="customer-form" onSubmit={onSubmit}>
                <span className="text-danger">{error}</span>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Select name="type" onChange={onFormControlChange} value={currentVehicle.type}>
                        <option value="economy">economy</option>
                        <option value="estate" >estate</option>
                        <option value="luxury">luxury</option>
                        <option value="SUV">SUV</option>
                        <option value="cargo">cargo</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" placeholder="Enter brand" onChange={onFormControlChange} value={currentVehicle.brand} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" placeholder="Enter model" onChange={onFormControlChange} value={currentVehicle.model} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Construction year</Form.Label>
                    <Form.Control type="number" name="constructionYear" placeholder="Enter year" onChange={onFormControlChange} value={currentVehicle.constructionYear} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats" placeholder="Enter seats number" onChange={onFormControlChange} value={currentVehicle.numberOfSeats} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control type="number" name="pricePerDay" placeholder="Enter price per day" onChange={onFormControlChange} value={currentVehicle.pricePerDay} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" name="count" placeholder="Enter count" onChange={onFormControlChange} value={currentVehicle.count} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fuel</Form.Label>
                    <Form.Select name="fuelType" onChange={onFormControlChange} value={currentVehicle.fuelType}>
                        <option value="petrol">petrol</option>
                        <option value="diesel" >diesel</option>
                        <option value="hybrid">hybrid</option>
                        <option value="electric">electric</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentVehicle.photo} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}