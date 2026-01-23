import { useState } from 'react';

export default function BookingHistory({ formData, bookings, staffAssignments, workUpdates, userRole, onAddFeedback }) {
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [bookingFeedbacks, setBookingFeedbacks] = useState({});

  const userBookings = bookings
    .filter(booking =>userRole === 'admin' ? true : booking.email === formData.email)
    .filter(booking => {
      if (filter === 'all') return true;
      return booking.status === filter;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'amount-high':
          return b.amount - a.amount;
        case 'amount-low':
          return a.amount - b.amount;
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      'completed': 'success',
      'in-progress': 'warning',
      'pending': 'secondary'
    };
    return (
      <span className={`badge bg-${colors[status] || 'secondary'}`}>
        {status}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    const colors = {
      'paid': 'success',
      'partial': 'warning',
      'pending': 'danger'
    };
    return (
      <span className={`badge bg-${colors[paymentStatus] || 'secondary'}`}>
        {paymentStatus}
      </span>
    );
  };

  const getAssignedStaff = (bookingId) => {
    const assignment = staffAssignments.find(a => a.bookingId === bookingId);
    return assignment ? assignment.staffName : 'Not assigned';
  };

  const getBookingUpdates = (bookingId) => {
    return workUpdates.filter(update => update.bookingId === bookingId)
      .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
  };

  const toggleBookingDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const getFeedbackState = (bookingId) => {
    if (!bookingFeedbacks[bookingId]) {
      return {
        showForm: false,
        customerExperience: '',
        rating: 5
      };
    }
    return bookingFeedbacks[bookingId];
  };

  const updateFeedbackState = (bookingId, updates) => {
    setBookingFeedbacks(prev => ({
      ...prev,
      [bookingId]: {
        ...getFeedbackState(bookingId),
        ...updates
      }
    }));
  };

  const handleSubmitRating = (bookingId) => {
    const feedbackState = getFeedbackState(bookingId);
    
    const newFeedback = {
      bookingId,
      rating: feedbackState.rating,
      comment: feedbackState.customerExperience,
      date: new Date().toISOString()
    };

    if (onAddFeedback) {
      onAddFeedback(newFeedback);
    }
    
    updateFeedbackState(bookingId, {
      showForm: false,
      customerExperience: '',
      rating: 5
    });
    
    alert(`Thank you for your ${feedbackState.rating}-star rating! Your feedback has been submitted.`);
  };

  const handleOpenRatingForm = (bookingId) => {
    updateFeedbackState(bookingId, { showForm: true });
  };

  const handleCancelRating = (bookingId) => {
    updateFeedbackState(bookingId, {
      showForm: false,
      customerExperience: '',
      rating: 5
    });
  };

  const stats = {
    total: userBookings.length,
    completed: userBookings.filter(b => b.status === 'completed').length,
    inProgress: userBookings.filter(b => b.status === 'in-progress').length,
    pending: userBookings.filter(b => b.status === 'pending').length,
    totalSpent: userBookings.reduce((sum, b) => sum + b.amount, 0),
    avgRating: userBookings
      .filter(b => b.feedback)
      .reduce((sum, b) => sum + b.feedback.rating, 0) / 
      userBookings.filter(b => b.feedback).length || 0
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">
          <i className="fa fa-history me-2"></i>
          {userRole === 'admin' ? 'All Booking History' : 'My Service History'}
        </h3>
        <div className="d-flex gap-2">
          <select 
            className="form-select form-select-sm w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
          <select 
            className="form-select form-select-sm w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount-high">Amount (High to Low)</option>
            <option value="amount-low">Amount (Low to High)</option>
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center p-3">
              <h6 className="card-title mb-1">Total</h6>
              <h4 className="mb-0">{stats.total}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center p-3">
              <h6 className="card-title mb-1">Completed</h6>
              <h4 className="mb-0">{stats.completed}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center p-3">
              <h6 className="card-title mb-1">In Progress</h6>
              <h4 className="mb-0">{stats.inProgress}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-secondary text-white">
            <div className="card-body text-center p-3">
              <h6 className="card-title mb-1">Pending</h6>
              <h4 className="mb-0">{stats.pending}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center p-3">
              <h6 className="card-title mb-1">Total Spent</h6>
              <h4 className="mb-0">₹{stats.totalSpent}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center p-3">
              <h6 className="card-title mb-1">Avg Rating</h6>
              <h4 className="mb-0">{stats.avgRating.toFixed(1)}/5</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="bookingHistoryAccordion">
        {userBookings.length > 0 ? (
          userBookings.map((booking) => {
            const feedbackState = getFeedbackState(booking.id);
            const isCompleted = booking.status === 'completed';
            const hasFeedback = booking.feedback;
            const canGiveFeedback = isCompleted && !hasFeedback && userRole !== 'admin';
            
            return (
              <div className="accordion-item mb-3" key={booking.id}>
                <h2 className="accordion-header">
                  <button 
                    className={`accordion-button ${expandedBooking === booking.id ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleBookingDetails(booking.id)}
                  >
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-dark me-2">#{booking.id}</span>
                        <strong>{booking.vehicleModel || `${booking.vehicleType} - ${booking.vehicleBrand}`}</strong>
                        <span className="ms-3 text-muted">{booking.serviceType}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        {getStatusBadge(booking.status)}
                        <span className="fw-bold text-success">₹{booking.amount}</span>
                        <span className="text-muted">
                          <i className="fa fa-calendar me-1"></i>
                          {formatDate(booking.date)}
                        </span>
                        {canGiveFeedback && (
                          <span className="badge bg-warning text-dark">
                            <i className="fa fa-star me-1"></i>Rate Us!
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </h2>
                
                <div className={`accordion-collapse collapse ${expandedBooking === booking.id ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6 className="border-bottom pb-2 mb-3">
                          <i className="fa fa-info-circle me-2"></i>Booking Details
                        </h6>
                        <div className="row">
                          <div className="col-6 mb-2">
                            <small className="text-muted">Booking ID</small>
                            <p className="mb-0 fw-bold">#{booking.id}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Invoice No</small>
                            <p className="mb-0 fw-bold">{booking.invoiceNo}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Customer</small>
                            <p className="mb-0 fw-bold">{booking.customer}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Email</small>
                            <p className="mb-0 fw-bold">{booking.email}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Vehicle</small>
                            <p className="mb-0 fw-bold">{booking.vehicleModel || `${booking.vehicleType} - ${booking.vehicleBrand}`}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Service Type</small>
                            <p className="mb-0 fw-bold text-capitalize">{booking.serviceType.replace('-', ' ')}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Service Date</small>
                            <p className="mb-0 fw-bold">{formatDate(booking.date)} ({booking.time})</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Booked On</small>
                            <p className="mb-0 fw-bold">{formatDate(booking.createdAt)}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Amount</small>
                            <p className="mb-0 fw-bold text-success">₹{booking.amount}</p>
                          </div>
                          <div className="col-6 mb-2">
                            <small className="text-muted">Payment Status</small>
                            <p className="mb-0">{getPaymentBadge(booking.paymentStatus)}</p>
                          </div>
                          {booking.completedDate && (
                            <div className="col-6 mb-2">
                              <small className="text-muted">Completed On</small>
                              <p className="mb-0 fw-bold">{formatDate(booking.completedDate)}</p>
                            </div>
                          )}
                          <div className="col-6 mb-2">
                            <small className="text-muted">Assigned Staff</small>
                            <p className="mb-0 fw-bold">{getAssignedStaff(booking.id)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <h6 className="border-bottom pb-2 mb-3">
                          <i className="fa fa-clipboard-list me-2"></i>Problem Description
                        </h6>
                        <div className="bg-light p-3 rounded mb-3">
                          <p className="mb-0">{booking.description}</p>
                        </div>
                        
                        {booking.feedback && (
                          <>
                            <h6 className="border-bottom pb-2 mb-3 mt-4">
                              <i className="fa fa-star me-2"></i>Your Feedback
                            </h6>
                            <div className="alert alert-info">
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <strong>Your Rating:</strong>
                                  <div className="text-warning">
                                    {'★'.repeat(booking.feedback.rating)}{'☆'.repeat(5 - booking.feedback.rating)}
                                    <span className="ms-2 fw-bold">({booking.feedback.rating}/5)</span>
                                  </div>
                                </div>
                                <div>
                                  <strong>Your Comment:</strong>
                                  <p className="mb-0 mt-1">{booking.feedback.comment}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-clock-rotate-left me-2"></i>Work Updates Timeline
                        </h6>
                      </div>
                      <div className="card-body">
                        {getBookingUpdates(booking.id).length > 0 ? (
                          <div className="timeline">
                            {getBookingUpdates(booking.id).map((update, idx) => (
                              <div className="timeline-item" key={update.id}>
                                <div className="timeline-marker bg-primary"></div>
                                <div className="timeline-content">
                                  <div className="d-flex justify-content-between">
                                    <strong>{update.technician}</strong>
                                    <small className="text-muted">
                                      {formatDate(update.date)} at {update.time}
                                    </small>
                                  </div>
                                  <p className="mb-1">{update.update}</p>
                                  <small className="text-muted">Status: {update.status}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-muted py-3">No work updates yet.</p>
                        )}
                      </div>
                    </div>

                    {canGiveFeedback && (
                      <div className="mt-4 pt-3 border-top">
                        {feedbackState.showForm ? (
                          <div className="card border-primary">
                            <div className="card-header bg-primary text-white">
                              <h6 className="mb-0">
                                <i className="fa fa-star me-2"></i>Rate Your Experience
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label">Service Rating</label>
                                <div className="d-flex align-items-center mb-2">
                                  <div className="me-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        type="button"
                                        className={`btn btn-link p-0 me-1 ${star <= feedbackState.rating ? 'text-warning' : 'text-secondary'}`}
                                        onClick={() => updateFeedbackState(booking.id, { rating: star })}
                                      >
                                        <i className={`fa fa-star fa-2x`}></i>
                                      </button>
                                    ))}
                                  </div>
                                  <span className="fs-5 fw-bold">{feedbackState.rating} / 5</span>
                                </div>
                              </div>
                              
                              <div className="mb-3">
                                <label className="form-label">Share Your Experience</label>
                                <textarea
                                  className="form-control"
                                  rows="3"
                                  placeholder="Please share your experience with our service. What did you like? What could be improved?"
                                  value={feedbackState.customerExperience}
                                  onChange={(e) => updateFeedbackState(booking.id, { customerExperience: e.target.value })}
                                />
                                <small className="text-muted">
                                  Your honest feedback helps us improve our services for you and other customers.
                                </small>
                              </div>
                              
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => handleCancelRating(booking.id)}
                                >
                                  <i className="fa fa-times me-1"></i>Cancel
                                </button>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleSubmitRating(booking.id)}
                                  disabled={!feedbackState.customerExperience.trim()}
                                >
                                  <i className="fa fa-paper-plane me-1"></i>Submit Feedback
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-3">
                            <div className="row align-items-center">
                              <div className="col-md-8 text-start">
                                <h5 className="text-primary">
                                  <i className="fa fa-check-circle text-success me-2"></i>
                                  How was your service experience?
                                </h5>
                                <p className="text-muted mb-3">
                                  Your service was completed on <strong>{formatDate(booking.completedDate || booking.date)}</strong>.
                                  We'd love to hear about your experience to help us serve you better in the future.
                                </p>
                                <div className="d-flex align-items-center">
                                  <i className="fa fa-lightbulb text-warning me-2"></i>
                                  <small className="text-muted">
                                    It only takes a minute to share your thoughts. Your feedback is valuable to us!
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <button
                                  className="btn btn-success btn-lg w-100 py-3"
                                  onClick={() => handleOpenRatingForm(booking.id)}
                                >
                                  <i className="fa fa-star me-2"></i>Rate Your Experience
                                </button>
                                <p className="small text-muted mt-2">
                                  Click to rate service quality and share feedback
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-top">
                      <div className="btn-group">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="fa fa-print me-1"></i>Print Invoice
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="fa fa-download me-1"></i>Download Report
                        </button>
                        {booking.status === 'completed' && booking.feedback && (
                          <button className="btn btn-outline-info btn-sm">
                            <i className="fa fa-star me-1"></i>View Your Rating
                          </button>
                        )}
                        {booking.status === 'pending' && (
                          <button className="btn btn-outline-warning btn-sm">
                            <i className="fa fa-edit me-1"></i>Reschedule
                          </button>
                        )}
                        {userRole === 'admin' && (
                          <button className="btn btn-outline-danger btn-sm">
                            <i className="fa fa-trash me-1"></i>Delete Record
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-5">
            <i className="fa fa-calendar-times fa-3x text-muted mb-3"></i>
            <h5>No Booking History Found</h5>
            <p className="text-muted">
              {userRole === 'admin' 
                ? 'No bookings found in the system.' 
                : 'You haven\'t booked any services yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}