import './App.scss';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router';
import { CustomersList } from './components/customers/customers-list/CustomersList';
import { CustomerForm } from './components/customers/customer-form/CustomerForm';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { Login } from './components/auth/login/Login';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { Register } from './components/auth/register/Register';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { CustomerProfile } from './components/customers/customer-profile/CustomerProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<NonAuthenticatedRoute> <Login /> </NonAuthenticatedRoute>} />
        <Route path="/register" element={<NonAuthenticatedRoute> <Register /> </NonAuthenticatedRoute>} />
        <Route path="/" element={<AuthenticatedRoute> <Layout /> </AuthenticatedRoute>} >
          <Route path="customers" element={<CustomersList />} />
          <Route path="customers/create" element={<CustomerForm />} />
          <Route path="customers/edit/:id" element={<CustomerForm />} />
          <Route path="profile/:id" element={<CustomerProfile />} />

          <Route path="vehicles" element={<VehiclesList />} />
          <Route path="vehicles/:brand" element={<VehiclesList />} />
          <Route path="vehicles/create" element={<VehicleForm />} />
          <Route path="vehicles/edit/:id" element={<VehicleForm />} />


          <Route path="rentals/create/:id" element={<RentalForm />} />
          <Route path="rentals/edit/:id" element={<RentalForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
