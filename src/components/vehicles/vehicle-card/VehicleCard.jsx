import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';
import { Link } from 'react-router-dom';

export function VehicleCard({ vehicle, onDelete }) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(vehicle.id);
    }

    const navigateToUpdate = () => {
        navigate(`/vehicles/edit/${vehicle.id}`);
    }

    const renderChanges = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer.isAdmin) {
            return <Card.Body>
            <Card.Link onClick={navigateToUpdate} >Update</Card.Link>
            <Card.Link onClick={onDeleteClicked}>Delete</Card.Link>
        </Card.Body>
        }
    }
    const onRentEvent = () => {
        navigate(`/rentals/create/${vehicle.id}`);
    }
    const rentCheck = (vehicleCount) => {
        if(vehicleCount>0){
            console.log(vehicle);
          return  <Card.Body>
                <Button  onClick={() => {onRentEvent()}}>Rent</Button>
            </Card.Body>
        }
        else{
            console.log(vehicle);
        }
       
    }
   

    return (
        <Card style={{ width: '10rem', margin: '10px' }}>
            <Card.Img variant="top" src={vehicle.photo} />
            <Card.Body>
                <Card.Title>
                        {vehicle.brand} {vehicle.model}
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>Vehicle Type: {vehicle.type}</ListGroup.Item>
                <ListGroup.Item>Brand: {vehicle.brand}</ListGroup.Item>
                <ListGroup.Item>Model: {vehicle.model} </ListGroup.Item>
                <ListGroup.Item>Year: {vehicle.constructionYear} </ListGroup.Item>
                <ListGroup.Item>FuelType: {vehicle.fuelType} </ListGroup.Item>
                <ListGroup.Item>Number of seats: {vehicle.numberOfSeats} </ListGroup.Item>
                <ListGroup.Item>Price per day: {vehicle.pricePerDay} </ListGroup.Item>
                <ListGroup.Item>Count: {vehicle.count} </ListGroup.Item>
            </ListGroup>
            {renderChanges()}
            {rentCheck(vehicle.count)}
        </Card>
    );
}