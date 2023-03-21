import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getLoggedCustomer } from '../../utils/services/auth-http-utils';

export function Header() {

    const navigate = useNavigate();

    const onLogout = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const renderCreateCustomerLink = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer.isAdmin) {
            return <Link className="nav-link" to="/customers/create">Create customer</Link>
        }
    }

    const renderAdminMark = () => {
        const loggedCustomer = getLoggedCustomer();

        if (loggedCustomer.isAdmin) {
            return <div style={{color:"white", backgroundColor:" #302244",border:" 5px solid transparent",
             borderImage: " linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
              borderImageSlice: "1", margin:" 2vh",padding:"1vh" }}>You are Admin</div>

        }
    }

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Freamwork systems - React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/customers">Customers</Link>
                            {renderCreateCustomerLink()}
                            <Link className="nav-link" to="/vehicles">Vehicles</Link>
                        </Nav>
                        <Link className="nav-link" onClick={onLogout} > Logout </Link>
                        {renderAdminMark()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}