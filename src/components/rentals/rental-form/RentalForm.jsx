import { Form, Button, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { saveRental } from "../../../utils/services/rental-http-utils";
import { useNavigate, useParams } from "react-router";
import DateTimePicker from 'react-datetime-picker'

import './RentalForm.scss';
import { useEffect } from "react";

export function RentalForm() {
    var currentdate = new Date(); 

    const navigate = useNavigate();
    const params = useParams();
    const [currentRental, setCurrentRental] = useState({
        startDateTime: '',
        endDateTime: '',
        customerId: '',
        vehicleId: ''
    });

    useEffect(() => {
        if (params.id) {
            setCurrentRental((prevState) => {
                return {
                  ...prevState,
                  ["vehicleId"]: params.id
                }
            });
        } else {
           navigate(`/customers`);
        }
    }, [params.id]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        var start = currentRental.startDateTime.split(" ");
        var startDate = new Date(start);
        var end = currentRental.endDateTime.split(" ");
        var endDate = new Date(end);
        if((startDate<currentdate )||
        (endDate<currentdate)||
        (endDate<=startDate)){

            alert("Wrong dates check red fielsd or if start date is after end date");
        }
        else{
            saveRental(currentRental).then(() => {
                navigate('/customers');
            });
        }
        
    }
    const onChange=(date,atrName) => {
        const dateTimeString = new Date(date).toLocaleDateString()+" "+new Date(date).toLocaleTimeString();
            setCurrentRental((prevState) => {
                return {
                  ...prevState,
                  [atrName]: dateTimeString
                }
            });
      }

    return (
        <div className="rental-form-wrapper">
            <Form onSubmit={onFormSubmit} noValidate>
                <FormGroup>
                    <Form.Label>Starting date and time</Form.Label>
                    <br></br>
                    <DateTimePicker
                        required
                        id='startdate'
                        type='text'
                        disableClock = "true"
                        disableCalendar = "true"
                        minDate={currentdate}
                        dayPlaceholder = "day"
                        monthPlaceholder= "month"
                        yearPlaceholder= "year"
                        hourPlaceholder= "hour"
                        minutePlaceholder="minute"
                        onChange={(date) => onChange(date,"startDateTime")}
                        value={currentRental.endDate}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Ending date and time</Form.Label>
                    <br></br>
                    <DateTimePicker
                        required
                        id='enddate'
                        type='text'
                        disableClock = "true"
                        disableCalendar = "true"
                        minDate={currentdate}
                        dayPlaceholder = "day"
                        monthPlaceholder= "month"
                        yearPlaceholder= "year"
                        hourPlaceholder= "hour"
                        minutePlaceholder="minute"
                        onChange={(date) => onChange(date,"endDateTime")}
                        value={currentRental.endDate}
                    />
                </FormGroup>
                
                <Button type="submit">Save Rental</Button>
            </Form>
        </div>
    );
}