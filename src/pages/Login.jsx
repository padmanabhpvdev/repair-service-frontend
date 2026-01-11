export default function Login({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4 className="mb-3">Login to Book</h4>
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
      <div className="alert alert-info">
        
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <i className="fa fa-sign-in me-2"></i>Login
      </button>
    </form>
  );
}