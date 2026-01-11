import { vehicleType, serviceType } from './utils/constant';

export default function AdminDashboard({ 
  bookings, 
  staffAssignments, 
  userDatabase, 
  updateBookingStatus, 
  deleteBooking, 
  assignStaffToBooking,
  formData 
}) {
  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    inProgressBookings: bookings.filter(b => b.status === 'in-progress').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    activeStaff: userDatabase.filter(u => u.role === 'staff').length
  };

  return (
    <div>
      <h3 className="mb-4">Admin Dashboard</h3>
      
      {/* Stats Cards */}
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

      {/* Bookings Table */}
      <div className="card">
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
                              .filter(u => u.role === 'staff')
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
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => alert(`View booking #${booking.id}`)}
                          >
                            View
                          </button>
                          {booking.status === 'pending' && (
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => updateBookingStatus(booking.id, 'in-progress')}
                            >
                              Start
                            </button>
                          )}
                          {booking.status === 'in-progress' && (
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                            >
                              Complete
                            </button>
                          )}
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => deleteBooking(booking.id)}
                          >
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

      {/* Staff Members */}
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Staff Members ({stats.activeStaff})</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {userDatabase
              .filter(user => user.role === 'staff')
              .map(staff => {
                const assignedCount = staffAssignments.filter(a => a.staffEmail === staff.email).length;
                return (
                  <div key={staff.email} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h6>{staff.name}</h6>
                        <p className="mb-1"><small>{staff.email}</small></p>
                        <p className="mb-1"><small>{staff.phone}</small></p>
                        <span className="badge bg-primary">Assigned: {assignedCount} jobs</span>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}