import { vehicleType, serviceType } from './utils/constant';

export default function StaffDashboard({ 
  bookings, 
  staffAssignments, 
  userDatabase, 
  updateBookingStatus, 
  completeBooking, 
  assignStaffToBooking,
  formData 
}) {
  const myAssignments = staffAssignments.filter(a => a.staffEmail === formData.email);

  return (
    <div>
      <h3 className="mb-4">Staff Dashboard</h3>
      
      <div className="alert alert-info">
        <i className="fa fa-user me-2"></i>
        Welcome, {formData.name}! You have {myAssignments.length} assigned jobs.
      </div>

      {/* My Assignments */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">My Assigned Jobs</h5>
        </div>
        <div className="card-body">
          {myAssignments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myAssignments.map(assignment => {
                    const booking = bookings.find(b => b.id === assignment.bookingId);
                    if (!booking) return null;
                    
                    return (
                      <tr key={assignment.bookingId}>
                        <td>#{booking.id}</td>
                        <td>{booking.customer}</td>
                        <td>{vehicleType.find(v => v.value === booking.vehicleType)?.label}</td>
                        <td>{serviceType.find(s => s.value === booking.serviceType)?.label}</td>
                        <td>{booking.date}</td>
                        <td>
                          <span className={`badge bg-${booking.status === 'completed' ? 'success' : 'warning'}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => alert(`View details for booking #${booking.id}\nCustomer: ${booking.customer}\nIssue: ${booking.description}`)}
                            >
                              View Details
                            </button>
                            {booking.status === 'in-progress' && (
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => completeBooking(booking.id)}
                              >
                                Mark Complete
                              </button>
                            )}
                            {booking.status === 'pending' && (
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => updateBookingStatus(booking.id, 'in-progress')}
                              >
                                Start Job
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No assignments yet.</p>
          )}
        </div>
      </div>

      {/* Available Pending Jobs */}
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Available Pending Jobs</h5>
        </div>
        <div className="card-body">
          {bookings
            .filter(b => b.status === 'pending')
            .filter(b => !staffAssignments.find(a => a.bookingId === b.id))
            .length > 0 ? (
            <div className="row">
              {bookings
                .filter(b => b.status === 'pending')
                .filter(b => !staffAssignments.find(a => a.bookingId === b.id))
                .map(booking => (
                  <div key={booking.id} className="col-md-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h6>Booking #{booking.id}</h6>
                        <p className="mb-1"><strong>Customer:</strong> {booking.customer}</p>
                        <p className="mb-1"><strong>Vehicle:</strong> {vehicleType.find(v => v.value === booking.vehicleType)?.label}</p>
                        <p className="mb-1"><strong>Service:</strong> {serviceType.find(s => s.value === booking.serviceType)?.label}</p>
                        <p className="mb-2"><strong>Issue:</strong> {booking.description.substring(0, 50)}...</p>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => assignStaffToBooking(booking.id, formData.email)}
                        >
                          <i className="fa fa-hand-paper me-1"></i>Take This Job
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <p className="text-center text-muted">No pending jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}