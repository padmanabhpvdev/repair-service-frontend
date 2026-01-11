import { useState } from 'react';
import { vehicleType, serviceType } from './utils/constant';

export default function AdminDashboard({ 
  bookings, 
  staffAssignments, 
  userDatabase, 
  updateBookingStatus, 
  deleteBooking, 
  assignStaffToBooking,
  formData,
  addNewStaff,
  terminateStaff,
  updateStaffStatus 
}) {
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [newStaffData, setNewStaffData] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'default123'
  });

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    inProgressBookings: bookings.filter(b => b.status === 'in-progress').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    activeStaff: userDatabase.filter(u => u.role === 'staff' && u.active !== false).length,
    inactiveStaff: userDatabase.filter(u => u.role === 'staff' && u.active === false).length
  };

  const handleStaffInputChange = (e) => {
    setNewStaffData({
      ...newStaffData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (newStaffData.name && newStaffData.email && newStaffData.phone) {
      addNewStaff(newStaffData);
      setNewStaffData({
        name: '',
        email: '',
        phone: '',
        password: 'default123'
      });
      setShowAddStaffForm(false);
    } else {
      alert('Please fill all required fields');
    }
  };

  const staffMembers = userDatabase.filter(user => user.role === 'staff');

  return (
    <div>
      <h3 className="mb-4">Admin Dashboard</h3>
      
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Total Bookings</h5>
              <h2>{stats.totalBookings}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <h5 className="card-title">Pending</h5>
              <h2>{stats.pendingBookings}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h5 className="card-title">In Progress</h5>
              <h2>{stats.inProgressBookings}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Completed</h5>
              <h2>{stats.completedBookings}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">All Bookings</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => {
                  const assignment = staffAssignments.find(a => a.bookingId === booking.id);
                  return (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{vehicleType.find(v => v.value === booking.vehicleType)?.label}</td>
                      <td>{serviceType.find(s => s.value === booking.serviceType)?.label}</td>
                      <td>{booking.date}</td>
                      <td>₹{booking.amount}</td>
                      <td>
                        <span className={`badge bg-${booking.status === 'completed' ? 'success' : booking.status === 'in-progress' ? 'warning' : 'secondary'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        {assignment ? (
                          <span className="badge bg-info">{assignment.staffName}</span>
                        ) : (
                          <select 
                            className="form-select form-select-sm"
                            onChange={(e) => assignStaffToBooking(booking.id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="">Assign...</option>
                            {userDatabase
                              .filter(u => u.role === 'staff' && u.active !== false)
                              .map(staff => (
                                <option key={staff.email} value={staff.email}>
                                  {staff.name}
                                </option>
                              ))
                            }
                          </select>
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" onClick={() => alert(`View booking #${booking.id}`)}>
                            View
                          </button>
                          {booking.status === 'pending' && (
                            <button className="btn btn-outline-success" onClick={() => updateBookingStatus(booking.id, 'in-progress')}>
                              Start
                            </button>
                          )}
                          {booking.status === 'in-progress' && (
                            <button className="btn btn-outline-success" onClick={() => updateBookingStatus(booking.id, 'completed')}>
                              Complete
                            </button>
                          )}
                          <button className="btn btn-outline-danger" onClick={() => deleteBooking(booking.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            Staff Management 
            <span className="badge bg-success ms-2">{stats.activeStaff} Active</span>
            <span className="badge bg-secondary ms-2">{stats.inactiveStaff} Inactive</span>
          </h5>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddStaffForm(!showAddStaffForm)}>
            <i className="fa fa-plus me-1"></i>
            {showAddStaffForm ? 'Cancel' : 'Add New Staff'}
          </button>
        </div>
        <div className="card-body">
          {showAddStaffForm && (
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Add New Staff Member</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddStaffSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-control" name="name" value={newStaffData.name}
                        onChange={handleStaffInputChange} required placeholder="Enter staff name"/>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-control" name="email" value={newStaffData.email}
                        onChange={handleStaffInputChange} required placeholder="staff@kkauto.com" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input type="tel" className="form-control" name="phone" value={newStaffData.phone} onChange={handleStaffInputChange} required placeholder="9876543210" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Default Password</label>
                      <input
                        type="text"
                        className="form-control"
                        name="password"
                        value={newStaffData.password}
                        onChange={handleStaffInputChange}
                        placeholder="Leave as default"
                      />
                      <small className="text-muted">Default: default123 (can be changed later)</small>
                    </div>
                  </div>
                  <div className="alert alert-info">
                    <small>
                      <i className="fa fa-info-circle me-1"></i>
                      Staff member will receive email with login credentials. They should change password on first login.
                    </small>
                  </div>
                  <button type="submit" className="btn btn-success">
                    <i className="fa fa-user-plus me-1"></i>Add Staff Member
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="row">
            {staffMembers.length > 0 ? (
              staffMembers.map(staff => {
                const assignedCount = staffAssignments.filter(a => a.staffEmail === staff.email).length;
                const isActive = staff.active !== false;
                
                return (
                  <div key={staff.email} className="col-md-4 mb-3">
                    <div className={`card ${isActive ? 'border-success' : 'border-secondary'}`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">
                            {staff.name}
                            {!isActive && <span className="badge bg-secondary ms-2">Inactive</span>}
                          </h6>
                          <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <p className="mb-1">
                          <i className="fa fa-envelope text-muted me-2"></i>
                          <small>{staff.email}</small>
                        </p>
                        <p className="mb-1">
                          <i className="fa fa-phone text-muted me-2"></i>
                          <small>{staff.phone}</small>
                        </p>
                        
                        <div className="d-flex align-items-center mb-2">
                          <span className="badge bg-primary">
                            <i className="fa fa-tasks me-1"></i>
                            Assigned: {assignedCount} jobs
                          </span>
                          {staff.joinedDate && (
                            <small className="text-muted ms-2">
                              Joined: {staff.joinedDate}
                            </small>
                          )}
                        </div>

                        <div className="btn-group w-100">
                          {isActive ? (
                            <>
                              <button 
                                className="btn btn-outline-warning btn-sm"
                                onClick={() => updateStaffStatus(staff.email, false)}
                                title="Deactivate Staff"
                              >
                                <i className="fa fa-pause"></i>
                              </button>
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => alert(`Edit staff: ${staff.name}`)}
                                title="Edit Details"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => terminateStaff(staff.email)}
                                title="Terminate Staff"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </>
                          ) : (
                            <>
                              <button  className="btn btn-outline-success btn-sm" onClick={() => updateStaffStatus(staff.email, true)} title="Reactivate Staff">
                                <i className="fa fa-play"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm" onClick={() => terminateStaff(staff.email)} title="Permanently Remove">
                                <i className="fa fa-trash"></i>
                              </button>
                            </>
                          )}
                        </div>

                        {assignedCount > 0 && (
                          <div className="mt-3 pt-2 border-top">
                            <small className="text-muted d-block mb-1">Performance:</small>
                            <div className="progress mb-1" style={{height: '5px'}}>
                              <div 
                                className="progress-bar bg-success" 
                                style={{width: `${Math.min(assignedCount * 20, 100)}%`}}
                              ></div>
                            </div>
                            <small className="text-muted">
                              {assignedCount} active assignments
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <div className="alert alert-warning text-center">
                  <i className="fa fa-users fa-2x mb-3"></i>
                  <h5>No Staff Members Found</h5>
                  <p>Add your first staff member to get started!</p>
                  <button className="btn btn-primary" onClick={() => setShowAddStaffForm(true)}>
                    <i className="fa fa-plus me-1"></i>Add First Staff
                  </button>
                </div>
              </div>
            )}
          </div>

          {staffMembers.length > 0 && (
            <div className="mt-4 pt-3 border-top">
              <h6>Bulk Staff Actions</h6>
              <div className="btn-group">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    if (window.confirm('Send reminder email to all active staff?')) {
                      alert('Reminder emails sent to all active staff members!');
                    }
                  }}
                >
                  <i className="fa fa-envelope me-1"></i>Send Reminders
                </button>
                <button 
                  className="btn btn-outline-info btn-sm"
                  onClick={() => {
                    if (window.confirm('Export staff list to CSV?')) {
                      alert('Staff list exported successfully!');
                    }
                  }}
                >
                  <i className="fa fa-download me-1"></i>Export Staff List
                </button>
                <button 
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => {
                    if (window.confirm('Reset all staff passwords to default?')) {
                      alert('Staff passwords reset to default!');
                    }
                  }}
                >
                  <i className="fa fa-key me-1"></i>Reset Passwords
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
