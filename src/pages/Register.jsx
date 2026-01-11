export default function Register({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4 className="mb-3">Register New Account</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Full Name *</label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone Number *</label>
          <input 
            type="tel" 
            className="form-control" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input 
          type="email" 
          className="form-control" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password *</label>
        <input 
          type="password" 
          className="form-control" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <i className="fa fa-user-plus me-2"></i>Register
      </button>
    </form>
  );
}