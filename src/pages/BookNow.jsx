import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import BookingForm from './BookingForm';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';

export default function BookNow() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    serviceType: '',
    preferredDate: '',
    timeSlot: '',
    description: ''
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('customer');
  const [activeTab, setActiveTab] = useState('booking');
  
  const navigate = useNavigate();

  // Demo user database
  const userDatabase = [
    { email: 'admin@kkauto.com', password: 'admin123', name: 'Admin User', phone: '9876543210', role: 'admin' },
    { email: 'staff@kkauto.com', password: 'staff123', name: 'Staff Member', phone: '9876543211', role: 'staff' },
    { email: 'shahin@kkauto.com', password: 'mech123', name: 'Shahin', phone: '9876543212', role: 'staff' },
    { email: 'padmanabh@kkauto.com', password: 'elec123', name: 'Padmanabh', phone: '9876543213', role: 'staff' },
    { email: 'customer@example.com', password: 'customer123', name: 'John Customer', phone: '9876543214', role: 'customer' },
    { email: 'user@example.com', password: 'user123', name: 'Jane User', phone: '9876543215', role: 'customer' }
  ];

  // Demo bookings data
  const [bookings, setBookings] = useState([
    { id: 1, customer: "John Doe", email: "customer@example.com", vehicleType: "car", vehicleBrand: "honda-car", serviceType: "general-service", date: "2024-01-15", time: "morning", description: "Regular service", status: "pending", amount: 1500, createdAt: "2024-01-10" },
    { id: 2, customer: "Jane Smith", email: "user@example.com", vehicleType: "motorbike", vehicleBrand: "honda-bike", serviceType: "repair", date: "2024-01-14", time: "afternoon", description: "Engine noise issue", status: "in-progress", amount: 2500, createdAt: "2024-01-09" },
    { id: 3, customer: "Bob Johnson", email: "bob@example.com", vehicleType: "scooter", vehicleBrand: "tvs-scooter", serviceType: "accident-repair", date: "2024-01-13", time: "evening", description: "Accident damage repair", status: "completed", amount: 5000, createdAt: "2024-01-08" },
    { id: 4, customer: "Alice Brown", email: "alice@example.com", vehicleType: "car", vehicleBrand: "ms-car", serviceType: "electrical", date: "2024-01-16", time: "morning", description: "AC not working", status: "pending", amount: 2000, createdAt: "2024-01-11" },
  ]);

  // Demo staff assignments
  const [staffAssignments, setStaffAssignments] = useState([
    { bookingId: 2, staffEmail: "shahin@kkauto.com", staffName: "Shahin", assignedDate: "2024-01-09" },
    { bookingId: 3, staffEmail: "padmanabh@kkauto.com", staffName: "Padmanabh", assignedDate: "2024-01-08" },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      const user = userDatabase.find(u => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        setIsLoggedIn(true);
        setUserRole(user.role);
        setFormData(prev => ({ ...prev, name: user.name, phone: user.phone }));
        
        if (user.role === 'admin') {
          setActiveTab('admin');
        } else if (user.role === 'staff') {
          setActiveTab('staff');
        }
        
        alert(`Login successful! Welcome ${user.name} (${user.role})`);
      } else {
        alert('Invalid credentials. Try: admin@kkauto.com/admin123 or staff@kkauto.com/staff123');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && formData.phone) {
      const existingUser = userDatabase.find(u => u.email === formData.email);
      if (existingUser) {
        alert('Email already registered. Please login instead.');
        return;
      }
      
      setIsLoggedIn(true);
      setUserRole('customer');
      alert('Registration successful! You can now book your service.');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please login or register first');
      return;
    }
    
    const newBooking = {
      id: bookings.length + 1,
      customer: formData.name,
      email: formData.email,
      vehicleType: formData.vehicleType,
      vehicleBrand: formData.vehicleBrand,
      serviceType: formData.serviceType,
      date: formData.preferredDate,
      time: formData.timeSlot,
      description: formData.description,
      status: "pending",
      amount: Math.floor(Math.random() * 5000) + 1000,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setBookings([...bookings, newBooking]);
    console.log('Booking submitted:', newBooking);
    alert('Booking submitted successfully! We will contact you soon.');
    
    setFormData(prev => ({
      ...prev,
      vehicleType: '',
      vehicleBrand: '',
      vehicleModel: '',
      serviceType: '',
      preferredDate: '',
      timeSlot: '',
      description: ''
    }));
  };

  // Admin functions
  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  const assignStaffToBooking = (bookingId, staffEmail) => {
    const staff = userDatabase.find(u => u.email === staffEmail && u.role === 'staff');
    if (staff) {
      setStaffAssignments([
        ...staffAssignments.filter(a => a.bookingId !== bookingId),
        { 
          bookingId, 
          staffEmail: staff.email, 
          staffName: staff.name,
          assignedDate: new Date().toISOString().split('T')[0]
        }
      ]);
    }
  };

  // Staff functions
  const updateBookingProgress = (id, notes) => {
    alert(`Progress updated for booking #${id}: ${notes}`);
  };

  const completeBooking = (id) => {
    updateBookingStatus(id, 'completed');
    alert(`Booking #${id} marked as completed`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('customer');
    setActiveTab('booking');
    setFormData(prev => ({ ...prev, name: '', email: '', password: '' }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <i className="fa fa-calendar-check me-2"></i> 
                  {userRole === 'admin' ? 'Admin Dashboard' : 
                   userRole === 'staff' ? 'Staff Dashboard' : 
                   'Book Your Service'}
                </h2>
                
                {isLoggedIn && (
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-light text-dark">
                      <i className="fa fa-user me-1"></i>
                      {formData.name} ({userRole})
                    </span>
                    <button 
                      className="btn btn-sm btn-outline-light"
                      onClick={handleLogout}
                    >
                      <i className="fa fa-sign-out me-1"></i>Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card-body p-0">
              {isLoggedIn && (userRole === 'admin' || userRole === 'staff') && (
                <div className="border-bottom">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button className={`nav-link ${activeTab === 'booking' ? 'active' : ''}`} onClick={() => setActiveTab('booking')}>
                        <i className="fa fa-calendar-plus me-2"></i>
                        Book Service
                      </button>
                    </li>
                    {userRole === 'admin' && (
                      <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
                          <i className="fa fa-tachometer me-2"></i>
                          Admin Dashboard
                        </button>
                      </li>
                    )}
                    {userRole === 'staff' && (
                      <li className="nav-item">
                        <button  className={`nav-link ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>
                          <i className="fa fa-tools me-2"></i>
                          My Assignments
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              <div className="p-4">
                {!isLoggedIn ? (
                  <>
                    <div className="mb-4">
                      <div className="btn-group w-100" role="group">
                        <button type="button" className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsLogin(true)}>
                          <i className="fa fa-sign-in me-2"></i>Login
                        </button>
                        <button type="button" className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsLogin(false)}>
                          <i className="fa fa-user-plus me-2"></i>Register
                        </button>
                      </div>
                    </div>

                    {isLogin ? (<Login  formData={formData} handleChange={handleChange} handleSubmit={handleLogin}/>) : (
                      <Register formData={formData} handleChange={handleChange} handleSubmit={handleRegister}/>
                    )}
                  </>
                ) : (
                  <>
                    {activeTab === 'booking' && (
                      <BookingForm formData={formData} handleChange={handleChange} handleSubmit={handleBooking} userRole={userRole}/>
                    )}
                    {isLoggedIn && userRole === 'admin' && activeTab === 'admin' && (
                      <AdminDashboard 
                        bookings={bookings} staffAssignments={staffAssignments} userDatabase={userDatabase} updateBookingStatus={updateBookingStatus} deleteBooking={deleteBooking} assignStaffToBooking={assignStaffToBooking}
                        formData={formData}/>
                    )}
                    {isLoggedIn && userRole === 'staff' && activeTab === 'staff' && (
                      <StaffDashboard 
                        bookings={bookings} staffAssignments={staffAssignments} userDatabase={userDatabase}
                        updateBookingStatus={updateBookingStatus} completeBooking={completeBooking} assignStaffToBooking={assignStaffToBooking}
                        formData={formData}/>
                    )}
                  </>
                )}
              </div>
            </div>
            
            <div className="card-footer text-center">
              <Link to="/" className="btn btn-outline-secondary">
                <i className="fa fa-home me-2"></i>Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}