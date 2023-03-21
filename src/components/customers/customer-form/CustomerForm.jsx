import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { saveCustomer, getCustomerById } from '../../../utils/services/customer-http-utils';
import { useNavigate, useParams, Navigate } from 'react-router';
import { useEffect } from 'react';

import './CustomerForm.scss';
import { parseBool } from '../../../utils/services/bool-utils';
import { getLoggedCustomer } from '../../../utils/services/auth-http-utils';

export function CustomerForm() {
    let today = new Date().toLocaleDateString()
    const emptyCustomer = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        photo: '',
        isVip: 0,
        timeElapsed: 0,
        lastOnline: today,
        isAdmin: false
    };
    const [currentCustomer, setCurrentCustomer] = useState(emptyCustomer);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getCustomerById(params.id)
                .then((response) => {
                    setCurrentCustomer(response.data);
                })
        } else {
            setCurrentCustomer(emptyCustomer);
        }
    }, [params.id]);

    const onCheckboxChange = (event) => {
        setCurrentCustomer((prevState) => {
            return {
                ...prevState,
                isAdmin: event.target.checked.toString()
            }
        })
    }

    const onFormControlChange = (event) => {
        const target = event.target;
        let prop = 'value';
        if (target.name === 'isAdmin')
            prop = 'checked';

        setCurrentCustomer((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(currentCustomer);
        saveCustomer(currentCustomer).then(() => {
            navigate('/customers');
        }).catch(error => {
            setError(error.message);
        });
    }

    const renderIsAdminControl = () => {
        const loggedCustomer = getLoggedCustomer();

        if (!loggedCustomer || !loggedCustomer.isAdmin || loggedCustomer.id === currentCustomer.id)
            return '';

        return <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Is Admin</Form.Label>
            <Form.Check name="isAdmin" onChange={onCheckboxChange} checked={parseBool(currentCustomer.isAdmin)} />
        </Form.Group>
    }

    const navigateIfNotMentToTouch = () => {
        const loggedCustomer = getLoggedCustomer();
        const opennedProfileId = window.location.href.split("/").pop();

        if (loggedCustomer.id == opennedProfileId){}
        else if(loggedCustomer.isAdmin){}
        else{return <Navigate to='/customers' />}
        
    }

    return (
        <div className="customer-form-wrapper">
            {navigateIfNotMentToTouch()}
            <Form className="customer-form" onSubmit={onSubmit}>
                <span className="text-danger">{error}</span>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={onFormControlChange} value={currentCustomer.firstName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={onFormControlChange} value={currentCustomer.lastName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={onFormControlChange} value={currentCustomer.email} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter Address" onChange={onFormControlChange} value={currentCustomer.address} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentCustomer.password} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentCustomer.photo} />
                </Form.Group>
                {renderIsAdminControl()}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}