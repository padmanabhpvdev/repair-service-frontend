import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import BookingForm from './BookingForm';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import BookingHistory from './BookingHistory';

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

  // Demo bookings data (with more details for history)
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      customer: "John Doe", 
      email: "customer@example.com", 
      vehicleType: "car", 
      vehicleBrand: "honda-car", 
      vehicleModel: "Honda City",
      serviceType: "general-service", 
      date: "2024-01-15", 
      time: "morning", 
      description: "Regular maintenance service including oil change, filter replacement, brake check", 
      status: "completed", 
      amount: 2500, 
      createdAt: "2024-01-10",
      completedDate: "2024-01-15",
      workDetails: [
        { task: "Oil Change", completed: true, timeTaken: "30 mins", technician: "Shahin" },
        { task: "Air Filter Replacement", completed: true, timeTaken: "15 mins", technician: "Shahin" },
        { task: "Brake Inspection", completed: true, timeTaken: "45 mins", technician: "Padmanabh" },
        { task: "Tyre Pressure Check", completed: true, timeTaken: "10 mins", technician: "Padmanabh" }
      ],
      partsUsed: [
        { part: "Engine Oil", quantity: "1 liter", cost: 800 },
        { part: "Oil Filter", quantity: "1 unit", cost: 300 },
        { part: "Air Filter", quantity: "1 unit", cost: 400 }
      ],
      paymentStatus: "paid",
      invoiceNo: "INV-2024-001",
      feedback: { rating: 5, comment: "Excellent service, very professional" }
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      email: "user@example.com", 
      vehicleType: "motorbike", 
      vehicleBrand: "honda-bike", 
      vehicleModel: "Honda Shine",
      serviceType: "repair", 
      date: "2024-01-14", 
      time: "afternoon", 
      description: "Engine making unusual noise, needs inspection and repair", 
      status: "in-progress", 
      amount: 3500, 
      createdAt: "2024-01-09",
      workDetails: [
        { task: "Engine Diagnosis", completed: true, timeTaken: "1 hour", technician: "Shahin" },
        { task: "Carburetor Cleaning", completed: true, timeTaken: "45 mins", technician: "Shahin" },
        { task: "Spark Plug Replacement", completed: false, timeTaken: "30 mins", technician: null }
      ],
      partsUsed: [
        { part: "Spark Plug", quantity: "1 unit", cost: 200 }
      ],
      paymentStatus: "partial",
      invoiceNo: "INV-2024-002"
    },
    { 
      id: 3, 
      customer: "Bob Johnson", 
      email: "bob@example.com", 
      vehicleType: "scooter", 
      vehicleBrand: "tvs-scooter", 
      vehicleModel: "TVS Jupiter",
      serviceType: "accident-repair", 
      date: "2024-01-13", 
      time: "evening", 
      description: "Front panel damaged in minor accident, needs replacement and painting", 
      status: "completed", 
      amount: 5500, 
      createdAt: "2024-01-08",
      completedDate: "2024-01-13",
      workDetails: [
        { task: "Front Panel Replacement", completed: true, timeTaken: "2 hours", technician: "Shahin" },
        { task: "Primer Application", completed: true, timeTaken: "1 hour", technician: "Padmanabh" },
        { task: "Color Painting", completed: true, timeTaken: "2 hours", technician: "Padmanabh" },
        { task: "Polish & Finish", completed: true, timeTaken: "30 mins", technician: "Padmanabh" }
      ],
      partsUsed: [
        { part: "Front Panel", quantity: "1 unit", cost: 2500 },
        { part: "Paint", quantity: "500 ml", cost: 800 },
        { part: "Primer", quantity: "200 ml", cost: 400 }
      ],
      paymentStatus: "paid",
      invoiceNo: "INV-2024-003",
      feedback: { rating: 4, comment: "Good work but took longer than expected" }
    },
    { 
      id: 4, 
      customer: "Alice Brown", 
      email: "alice@example.com", 
      vehicleType: "car", 
      vehicleBrand: "ms-car", 
      vehicleModel: "Maruti Swift",
      serviceType: "electrical", 
      date: "2024-01-16", 
      time: "morning", 
      description: "AC not working properly, cooling issue", 
      status: "pending", 
      amount: 2000, 
      createdAt: "2024-01-11",
      workDetails: [],
      partsUsed: [],
      paymentStatus: "pending",
      invoiceNo: "INV-2024-004"
    },
    { 
      id: 5, 
      customer: "John Doe", 
      email: "customer@example.com", 
      vehicleType: "car", 
      vehicleBrand: "honda-car", 
      vehicleModel: "Honda City",
      serviceType: "paint", 
      date: "2023-12-20", 
      time: "afternoon", 
      description: "Full body paint job for car", 
      status: "completed", 
      amount: 12000, 
      createdAt: "2023-12-15",
      completedDate: "2023-12-20",
      workDetails: [
        { task: "Body Preparation", completed: true, timeTaken: "3 hours", technician: "Padmanabh" },
        { task: "Primer Application", completed: true, timeTaken: "2 hours", technician: "Padmanabh" },
        { task: "Color Painting", completed: true, timeTaken: "4 hours", technician: "Padmanabh" },
        { task: "Clear Coat", completed: true, timeTaken: "2 hours", technician: "Padmanabh" }
      ],
      partsUsed: [
        { part: "Paint", quantity: "2 liters", cost: 4000 },
        { part: "Primer", quantity: "1 liter", cost: 1500 },
        { part: "Clear Coat", quantity: "1 liter", cost: 2000 }
      ],
      paymentStatus: "paid",
      invoiceNo: "INV-2023-045",
      feedback: { rating: 5, comment: "Perfect paint job, car looks brand new!" }
    }
  ]);

  // Demo staff assignments
  const [staffAssignments, setStaffAssignments] = useState([
    { bookingId: 2, staffEmail: "shahin@kkauto.com", staffName: "Shahin", assignedDate: "2024-01-09" },
    { bookingId: 3, staffEmail: "padmanabh@kkauto.com", staffName: "Padmanabh", assignedDate: "2024-01-08" },
    { bookingId: 4, staffEmail: "shahin@kkauto.com", staffName: "Shahin", assignedDate: "2024-01-11" },
    { bookingId: 5, staffEmail: "padmanabh@kkauto.com", staffName: "Padmanabh", assignedDate: "2023-12-15" }
  ]);

  // Work update history for each booking
  const [workUpdates, setWorkUpdates] = useState([
    { 
      id: 1, 
      bookingId: 2, 
      date: "2024-01-09", 
      time: "10:30 AM", 
      technician: "Shahin", 
      update: "Initial diagnosis completed. Found issue with carburetor.", 
      status: "diagnosis_completed" 
    },
    { 
      id: 2, 
      bookingId: 2, 
      date: "2024-01-09", 
      time: "11:45 AM", 
      technician: "Shahin", 
      update: "Carburetor cleaned and adjusted. Engine noise reduced.", 
      status: "repair_in_progress" 
    },
    { 
      id: 3, 
      bookingId: 3, 
      date: "2024-01-08", 
      time: "2:00 PM", 
      technician: "Padmanabh", 
      update: "Damaged panel removed. New panel fitted and aligned.", 
      status: "repair_in_progress" 
    },
    { 
      id: 4, 
      bookingId: 3, 
      date: "2024-01-08", 
      time: "4:30 PM", 
      technician: "Padmanabh", 
      update: "Primer applied. Waiting for drying.", 
      status: "painting_in_progress" 
    },
    { 
      id: 5, 
      bookingId: 3, 
      date: "2024-01-13", 
      time: "10:00 AM", 
      technician: "Padmanabh", 
      update: "Final color coat applied. Vehicle ready for polishing.", 
      status: "painting_completed" 
    },
    { 
      id: 6, 
      bookingId: 3, 
      date: "2024-01-13", 
      time: "3:00 PM", 
      technician: "Padmanabh", 
      update: "Polishing completed. Vehicle ready for delivery.", 
      status: "completed" 
    }
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
      vehicleModel: formData.vehicleModel,
      serviceType: formData.serviceType,
      date: formData.preferredDate,
      time: formData.timeSlot,
      description: formData.description,
      status: "pending",
      amount: Math.floor(Math.random() * 5000) + 1000,
      createdAt: new Date().toISOString().split('T')[0],
      workDetails: [],
      partsUsed: [],
      paymentStatus: "pending",
      invoiceNo: `INV-${new Date().getFullYear()}-${(bookings.length + 1).toString().padStart(3, '0')}`
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

  const addWorkUpdate = (bookingId, technician, update, status) => {
    const newUpdate = {
      id: workUpdates.length + 1,
      bookingId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      technician,
      update,
      status
    };
    
    setWorkUpdates([...workUpdates, newUpdate]);
    
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const taskMatch = update.match(/Completed (.+?) task/);
      if (taskMatch) {
        const taskName = taskMatch[1];
        const updatedWorkDetails = booking.workDetails.map(task => 
          task.task === taskName ? { ...task, completed: true, technician } : task
        );
        
        if (!updatedWorkDetails.some(task => task.task === taskName)) {
          updatedWorkDetails.push({
            task: taskName,
            completed: true,
            timeTaken: "30 mins", // Default
            technician
          });
        }
        
        const updatedBookings = bookings.map(b => 
          b.id === bookingId ? { ...b, workDetails: updatedWorkDetails } : b
        );
        setBookings(updatedBookings);
      }
    }
  };

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { 
        ...booking, 
        status,
        completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : booking.completedDate
      } : booking
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

  const addNewStaff = (staffData) => {
    const newStaff = {
      email: staffData.email,
      password: staffData.password || 'default123',
      name: staffData.name,
      phone: staffData.phone,
      role: 'staff',
      active: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    userDatabase.push(newStaff);
    alert(`Staff member ${staffData.name} added successfully!`);
  };

  const terminateStaff = (staffEmail) => {
    if (window.confirm('Are you sure you want to terminate this staff member?')) {
      alert('Staff member terminated successfully!');
    }
  };

  const updateStaffStatus = (staffEmail, isActive) => {
    alert(`Staff ${isActive ? 'activated' : 'deactivated'} successfully!`);
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
              {isLoggedIn && (
                <div className="border-bottom">
                  <ul className="nav nav-tabs">
                    {userRole==='customer' &&(<>
                        <li className="nav-item">
                          <button 
                            className={`nav-link ${activeTab === 'booking' ? 'active' : ''}`}
                            onClick={() => setActiveTab('booking')}
                          >
                            <i className="fa fa-calendar-plus me-2"></i>
                              Book Service
                            </button>
                        </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                      >
                        <i className="fa fa-history me-2"></i>
                        My History
                        {bookings.filter(b => b.email === formData.email).length > 0 && (
                          <span className="badge bg-danger ms-1">
                            {bookings.filter(b => b.email === formData.email).length}
                          </span>
                        )}
                      </button>
                    </li></>
                    )}
                    
                    {userRole === 'admin' && (
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                          onClick={() => setActiveTab('admin')}
                        >
                          <i className="fa fa-tachometer me-2"></i>
                          Admin Dashboard
                        </button>
                      </li>
                    )}
                    
                    {userRole === 'staff' && (
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${activeTab === 'staff' ? 'active' : ''}`}
                          onClick={() => setActiveTab('staff')}
                        >
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

                    {isLogin ? (
                      <Login 
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                      />
                    ) : (
                      <Register 
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleRegister}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {activeTab === 'booking' && (
                      <BookingForm 
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleBooking}
                        userRole={userRole}
                        bookings={bookings}
                        staffAssignments={staffAssignments}
                      />
                    )}

                    {activeTab === 'history' && (
                      <BookingHistory
                        formData={formData}
                        bookings={bookings}
                        staffAssignments={staffAssignments}
                        workUpdates={workUpdates}
                        userRole={userRole}
                      />
                    )}

                    {isLoggedIn && userRole === 'admin' && activeTab === 'admin' && (
                      <AdminDashboard 
                        bookings={bookings}
                        staffAssignments={staffAssignments}
                        userDatabase={userDatabase}
                        updateBookingStatus={updateBookingStatus}
                        deleteBooking={deleteBooking}
                        assignStaffToBooking={assignStaffToBooking}
                        formData={formData}
                        addNewStaff={addNewStaff}
                        terminateStaff={terminateStaff}
                        updateStaffStatus={updateStaffStatus}
                      />
                    )}

                    {isLoggedIn && userRole === 'staff' && activeTab === 'staff' && (
                      <StaffDashboard 
                        bookings={bookings}
                        staffAssignments={staffAssignments}
                        userDatabase={userDatabase}
                        updateBookingStatus={updateBookingStatus}
                        completeBooking={completeBooking}
                        assignStaffToBooking={assignStaffToBooking}
                        formData={formData}
                        addWorkUpdate={addWorkUpdate}
                      />
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
