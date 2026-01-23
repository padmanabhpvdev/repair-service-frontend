import { useState } from 'react';
import { vehicleType, serviceType } from './utils/constant';

export default function StaffDashboard({ 
  bookings, 
  staffAssignments, 
  userDatabase, 
  updateBookingStatus, 
  completeBooking, 
  assignStaffToBooking,
  formData,
  addWorkUpdate
}) {
  const myAssignments = staffAssignments.filter(a => a.staffEmail === formData.email);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [workUpdateText, setWorkUpdateText] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const selectedBookingDetails = selectedBooking 
    ? bookings.find(b => b.id === selectedBooking)
    : null;

  const handleUpdateSubmit = () => {
    if (!workUpdateText.trim() || !selectedBooking) return;
    
    const updateText = selectedTask 
      ? `Completed ${selectedTask} task. ${workUpdateText}`
      : workUpdateText;
    
    const status = getStatusFromUpdate(workUpdateText);
    
    addWorkUpdate(selectedBooking, formData.name, updateText, status);
    
    if (selectedTask && selectedBookingDetails) {
      const updatedWorkDetails = selectedBookingDetails.workDetails.map(task => 
        task.task === selectedTask ? { ...task, completed: true, technician: formData.name } : task
      );
      
      const updatedBookings = bookings.map(b => 
        b.id === selectedBooking ? { ...b, workDetails: updatedWorkDetails } : b
      );
    }
    
    alert('Work update submitted successfully!');
    setWorkUpdateText('');
    setSelectedTask('');
    setShowUpdateForm(false);
  };

  const getStatusFromUpdate = (updateText) => {
    const lowerText = updateText.toLowerCase();
    if (lowerText.includes('diagnosis') || lowerText.includes('inspection')) return 'diagnosis_completed';
    if (lowerText.includes('repair') || lowerText.includes('fixed')) return 'repair_in_progress';
    if (lowerText.includes('painting') || lowerText.includes('paint')) return 'painting_in_progress';
    if (lowerText.includes('completed') || lowerText.includes('finished')) return 'completed';
    if (lowerText.includes('started') || lowerText.includes('begin')) return 'work_started';
    return 'update_added';
  };

  const getTaskOptions = (booking) => {
    if (!booking || !booking.workDetails) return [];
    return booking.workDetails
      .filter(task => !task.completed)
      .map(task => task.task);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeSlotLabel = (timeSlot) => {
    const slots = {
      'morning': 'Morning (9 AM - 12 PM)',
      'afternoon': 'Afternoon (12 PM - 4 PM)',
      'evening': 'Evening (4 PM - 7 PM)'
    };
    return slots[timeSlot] || timeSlot;
  };

  return (
    <div>
      <h3 className="mb-4">Staff Dashboard</h3>
      
      <div className="alert alert-info">
        <i className="fa fa-user me-2"></i>
        Welcome, {formData.name}! You have {myAssignments.length} assigned jobs.
      </div>

      {showUpdateForm && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Work Update</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowUpdateForm(false);
                    setWorkUpdateText('');
                    setSelectedTask('');
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {selectedBookingDetails && (
                  <div className="mb-3">
                    <p className="mb-1"><strong>Booking #:</strong> {selectedBookingDetails.id}</p>
                    <p className="mb-1"><strong>Vehicle:</strong> {vehicleType.find(v => v.value === selectedBookingDetails.vehicleType)?.label}</p>
                    <p className="mb-1"><strong>Service:</strong> {serviceType.find(s => s.value === selectedBookingDetails.serviceType)?.label}</p>
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label">Select Task (Optional)</label>
                  <select 
                    className="form-select"
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                  >
                    <option value="">Select a task to mark as complete</option>
                    {getTaskOptions(selectedBookingDetails).map((task, idx) => (
                      <option key={idx} value={task}>{task}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Work Update *</label>
                  <textarea 
                    className="form-control"
                    rows="4"
                    value={workUpdateText}
                    onChange={(e) => setWorkUpdateText(e.target.value)}
                    placeholder="Describe the work done, issues faced, next steps..."
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Quick Templates</label>
                  <div className="btn-group btn-group-sm w-100">
                    <button 
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setWorkUpdateText("Initial diagnosis completed. Found issue with the component.")}
                    >
                      Diagnosis Done
                    </button>
                    <button 
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setWorkUpdateText("Repair work in progress. Parts ordered/replaced.")}
                    >
                      Repair Started
                    </button>
                    <button 
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setWorkUpdateText("Testing completed. All systems working properly.")}
                    >
                      Testing Done
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowUpdateForm(false);
                    setWorkUpdateText('');
                    setSelectedTask('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleUpdateSubmit}
                  disabled={!workUpdateText.trim()}
                >
                  Submit Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Assigned Jobs</h5>
              <span className="badge bg-primary">{myAssignments.length} Jobs</span>
            </div>
            <div className="card-body">
              {myAssignments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
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
                            <td>
                              <small>{formatDate(booking.date)}</small><br/>
                              <small className="text-muted">{getTimeSlotLabel(booking.time)}</small>
                            </td>
                            <td>
                              <span className={`badge bg-${booking.status === 'completed' ? 'success' : booking.status === 'in-progress' ? 'warning' : 'secondary'}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setSelectedBooking(booking.id);
                                    alert(`Booking #${booking.id}\nCustomer: ${booking.customer}\nVehicle: ${vehicleType.find(v => v.value === booking.vehicleType)?.label}\nIssue: ${booking.description}\nStatus: ${booking.status}`);
                                  }}
                                >
                                  <i className="fa fa-eye"></i>
                                </button>
                                
                                <button 
                                  className="btn btn-outline-info"
                                  onClick={() => {
                                    setSelectedBooking(booking.id);
                                    setShowUpdateForm(true);
                                  }}
                                >
                                  <i className="fa fa-plus"></i> Update
                                </button>
                                
                                {booking.status === 'in-progress' && (
                                  <button 
                                    className="btn btn-outline-success"
                                    onClick={() => {
                                      if (window.confirm(`Mark booking #${booking.id} as completed?`)) {
                                        completeBooking(booking.id);
                                      }
                                    }}
                                  >
                                    <i className="fa fa-check"></i> Complete
                                  </button>
                                )}
                                
                                {booking.status === 'pending' && (
                                  <button 
                                    className="btn btn-outline-warning"
                                    onClick={() => {
                                      if (window.confirm(`Start working on booking #${booking.id}?`)) {
                                        updateBookingStatus(booking.id, 'in-progress');
                                        addWorkUpdate(
                                          booking.id, 
                                          formData.name, 
                                          "Started work on the vehicle. Initial inspection in progress.", 
                                          "work_started"
                                        );
                                      }
                                    }}
                                  >
                                    <i className="fa fa-play"></i> Start
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
                <div className="text-center py-5">
                  <i className="fa fa-tasks fa-3x text-muted mb-3"></i>
                  <h5>No Assigned Jobs</h5>
                  <p className="text-muted">You haven't been assigned any jobs yet.</p>
                  <p className="text-muted small">Check available jobs below or wait for assignment.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">My Performance</h6>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="display-6 text-primary mb-2">
                  {myAssignments.filter(a => {
                    const booking = bookings.find(b => b.id === a.bookingId);
                    return booking?.status === 'completed';
                  }).length}
                </div>
                <small className="text-muted">Completed Jobs</small>
              </div>
              
              <div className="progress mb-3" style={{height: '10px'}}>
                <div 
                  className="progress-bar bg-success" 
                  style={{width: '75%'}}
                  title="75% Completion Rate"
                ></div>
              </div>
              
              <div className="row text-center">
                <div className="col-6">
                  <div className="text-warning">
                    <i className="fa fa-clock fa-2x mb-2"></i>
                    <div>
                      {myAssignments.filter(a => {
                        const booking = bookings.find(b => b.id === a.bookingId);
                        return booking?.status === 'in-progress';
                      }).length}
                    </div>
                    <small>In Progress</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-secondary">
                    <i className="fa fa-hourglass fa-2x mb-2"></i>
                    <div>
                      {myAssignments.filter(a => {
                        const booking = bookings.find(b => b.id === a.bookingId);
                        return booking?.status === 'pending';
                      }).length}
                    </div>
                    <small>Pending</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => {
                    if (myAssignments.length === 0) {
                      alert("No assigned jobs to update");
                      return;
                    }
                    const firstJob = myAssignments[0];
                    const booking = bookings.find(b => b.id === firstJob.bookingId);
                    if (booking) {
                      setSelectedBooking(booking.id);
                      setShowUpdateForm(true);
                    }
                  }}
                >
                  <i className="fa fa-plus-circle me-2"></i>Add Quick Update
                </button>
                
                <button 
                  className="btn btn-outline-success"
                  onClick={() => {
                    const inProgressJobs = myAssignments.filter(a => {
                      const booking = bookings.find(b => b.id === a.bookingId);
                      return booking?.status === 'in-progress';
                    });
                    
                    if (inProgressJobs.length === 0) {
                      alert("No in-progress jobs to complete");
                      return;
                    }
                    
                    if (window.confirm(`Mark ${inProgressJobs.length} job(s) as completed?`)) {
                      inProgressJobs.forEach(job => {
                        completeBooking(job.bookingId);
                      });
                    }
                  }}
                >
                  <i className="fa fa-check-double me-2"></i>Complete All In-Progress
                </button>
                
                <button 
                  className="btn btn-outline-info"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    const todayJobs = myAssignments.filter(a => {
                      const booking = bookings.find(b => b.id === a.bookingId);
                      return booking?.createdAt === today;
                    });
                    alert(`Today's Jobs: ${todayJobs.length}\nCompleted: ${todayJobs.filter(j => {
                      const booking = bookings.find(b => b.id === j.bookingId);
                      return booking?.status === 'completed';
                    }).length}`);
                  }}
                >
                  <i className="fa fa-chart-bar me-2"></i>Today's Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedBooking && selectedBookingDetails && !showUpdateForm && (
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Job Details: Booking #{selectedBooking}</h6>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSelectedBooking(null)}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6>Customer & Vehicle Info</h6>
                <div className="mb-3">
                  <p className="mb-1"><strong>Customer:</strong> {selectedBookingDetails.customer}</p>
                  <p className="mb-1"><strong>Vehicle:</strong> {vehicleType.find(v => v.value === selectedBookingDetails.vehicleType)?.label}</p>
                  <p className="mb-1"><strong>Model:</strong> {selectedBookingDetails.vehicleModel || 'Not specified'}</p>
                  <p className="mb-1"><strong>Service Date:</strong> {formatDate(selectedBookingDetails.date)}</p>
                  <p className="mb-1"><strong>Time Slot:</strong> {getTimeSlotLabel(selectedBookingDetails.time)}</p>
                </div>
              </div>
              <div className="col-md-6">
                <h6>Service Details</h6>
                <div className="mb-3">
                  <p className="mb-1"><strong>Service Type:</strong> {serviceType.find(s => s.value === selectedBookingDetails.serviceType)?.label}</p>
                  <p className="mb-1"><strong>Amount:</strong> ₹{selectedBookingDetails.amount}</p>
                  <p className="mb-1"><strong>Status:</strong> {selectedBookingDetails.status}</p>
                  <p className="mb-1"><strong>Booked On:</strong> {formatDate(selectedBookingDetails.createdAt)}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <h6>Problem Description</h6>
              <div className="bg-light p-3 rounded">
                <p className="mb-0">{selectedBookingDetails.description}</p>
              </div>
            </div>
            
            {selectedBookingDetails.workDetails && selectedBookingDetails.workDetails.length > 0 && (
              <div className="mb-3">
                <h6>Assigned Tasks</h6>
                <div className="list-group">
                  {selectedBookingDetails.workDetails.map((task, idx) => (
                    <div key={idx} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{task.task}</strong>
                          <div className="small text-muted">
                            Time: {task.timeTaken} | Technician: {task.technician || 'Not assigned'}
                          </div>
                        </div>
                        <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary"
                onClick={() => setShowUpdateForm(true)}
              >
                <i className="fa fa-plus me-1"></i>Add Work Update
              </button>
              
              {selectedBookingDetails.status === 'in-progress' && (
                <button 
                  className="btn btn-success"
                  onClick={() => {
                    if (window.confirm('Mark this job as completed?')) {
                      completeBooking(selectedBookingDetails.id);
                      setSelectedBooking(null);
                    }
                  }}
                >
                  <i className="fa fa-check me-1"></i>Mark as Completed
                </button>
              )}
              
              {selectedBookingDetails.status === 'pending' && (
                <button 
                  className="btn btn-warning"
                  onClick={() => {
                    if (window.confirm('Start working on this job?')) {
                      updateBookingStatus(selectedBookingDetails.id, 'in-progress');
                      addWorkUpdate(
                        selectedBookingDetails.id,
                        formData.name,
                        "Started work on the vehicle. Initial inspection in progress.",
                        "work_started"
                      );
                    }
                  }}
                >
                  <i className="fa fa-play me-1"></i>Start Job
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Booking #{booking.id}</h6>
                          <span className="badge bg-secondary">Pending</span>
                        </div>
                        <p className="mb-1"><strong>Customer:</strong> {booking.customer}</p>
                        <p className="mb-1"><strong>Vehicle:</strong> {vehicleType.find(v => v.value === booking.vehicleType)?.label}</p>
                        <p className="mb-1"><strong>Service:</strong> {serviceType.find(s => s.value === booking.serviceType)?.label}</p>
                        <p className="mb-1"><strong>Date:</strong> {formatDate(booking.date)}</p>
                        <p className="mb-2">
                          <strong>Issue:</strong> 
                          <span className="d-block text-muted small mt-1">
                            {booking.description.substring(0, 80)}...
                          </span>
                        </p>
                        <button 
                          className="btn btn-primary btn-sm w-100"
                          onClick={() => {
                            if (window.confirm(`Take assignment for booking #${booking.id}?`)) {
                              assignStaffToBooking(booking.id, formData.email);
                            }
                          }}
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
            <div className="text-center py-4">
              <i className="fa fa-check-circle fa-2x text-success mb-3"></i>
              <h5>No Pending Jobs Available</h5>
              <p className="text-muted">All pending jobs have been assigned.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
