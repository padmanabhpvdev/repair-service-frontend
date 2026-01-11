export default function BookingForm({ formData, handleChange, handleSubmit, userRole }) {
  const vehicleType = [
    {value:"",label:"Select Vehicle Type",disabled:true},
    {value:"scooter",label:"Scooter"},
    {value:"motorbike",label:"Motorbike"},
    {value:"car",label:"Car"},
    {value:"suv",label:"SUV"},
    {value:"other",label:"Other"},
  ];

  const vehicleBrand = [
    {value:"",label:"Select Vehicle Brand",type:"",disabled:true},
    {value:"honda-scooter",label:"Honda",type:"scooter"},
    {value:"honda-bike",label:"Honda",type:"motorbike"},
    {value:"honda-car",label:"Honda",type:"car"},
    {value:"tvs-scooter",label:"TVS",type:"scooter"},
    {value:"tvs-bike",label:"TVS",type:"motorbike"},
    {value:"ms-car",label:"Maruti Suzuki",type:"car"},
    {value:"suzuki-scooter",label:"Suzuki",type:"scooter"},
    {value:"suzuki-bike",label:"Suzuki",type:"motorbike"},
    {value:"mahindra-bike",label:"Mahindra",type:"motorbike"},
    {value:"mahindra-car",label:"Mahindra",type:"car"},
    {value:"mahindra-suv",label:"Mahindra",type:"suv"},
  ];

  const serviceType = [
    {value:"",label:"Select Service Type",disabled:true},
    {value:"general-service",label:"General Service"},
    {value:"repair",label:"Repair"},
    {value:"accident-repair",label:"Accident Repair"},
    {value:"paint",label:"Paint Job"},
    {value:"engine-overhaul",label:"Engine Overhaul"},
    {value:"electrical",label:"Electrical Work"},
    {value:"other",label:"Other"},
  ];

  const filterBrands = formData.vehicleType 
    ? vehicleBrand.filter(brand => brand.type === formData.vehicleType || brand.type === "")
    : vehicleBrand.filter(brand => brand.type === "");

  return (
    <form onSubmit={handleSubmit}>
      <div className="alert alert-success">
        <i className="fa fa-check-circle me-2"></i>
        Welcome, {formData.name}! You are logged in as {userRole}.
      </div>

      <h4 className="mb-3">Service Details</h4>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Vehicle Type *</label>
          <select 
            className="form-select" 
            name="vehicleType" 
            value={formData.vehicleType} 
            onChange={handleChange} 
            required
          >
            {vehicleType.map((option,index) => (
              <option 
                key={index} 
                value={option.value} 
                disabled={option.disabled||false}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 mb-3">
          <label className="form-label">Vehicle Brand *</label>
          <select 
            className="form-select" 
            name="vehicleBrand" 
            value={formData.vehicleBrand} 
            onChange={handleChange} 
            disabled={!formData.vehicleType} 
            required
          >
            {filterBrands.map((brand,index) => (
              <option 
                key={index} 
                value={brand.value} 
                disabled={brand.disabled||false}
              >
                {brand.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Service Type *</label>
          <select 
            className="form-select" 
            name="serviceType" 
            value={formData.serviceType} 
            onChange={handleChange} 
            required
          >
            {serviceType.map((option,index) => (
              <option 
                key={index} 
                value={option.value} 
                disabled={option.disabled||false}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 mb-3">
          <label className="form-label">Vehicle Model (Optional)</label>
          <input 
            type="text" 
            className="form-control" 
            name="vehicleModel" 
            value={formData.vehicleModel} 
            onChange={handleChange} 
            placeholder="e.g., Activa 6G, Swift Dzire"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Preferred Date *</label>
          <input 
            type="date" 
            className="form-control" 
            name="preferredDate" 
            value={formData.preferredDate} 
            onChange={handleChange} 
            min={new Date().toISOString().split('T')[0]} 
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Preferred Time Slot *</label>
          <select 
            className="form-select" 
            name="timeSlot" 
            value={formData.timeSlot} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Time</option>
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (4 PM - 7 PM)</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Problem Description</label>
        <textarea 
          className="form-control" 
          name="description" 
          rows="4" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Describe the issue with your vehicle..."
        ></textarea>
      </div>

      <div className="mb-3">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" required />
          <label className="form-check-label">
            I agree to the terms and conditions
          </label>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-success btn-lg">
          <i className="fa fa-calendar-plus me-2"></i>
          Confirm Booking
        </button>
      </div>
    </form>
  );
}