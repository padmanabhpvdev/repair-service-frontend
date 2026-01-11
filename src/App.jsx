import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BookNow from "./pages/BookNow";
import './App.css'

export default function App(){
  useEffect(()=>{
    const scrollElement = document.querySelector(".scrollspy-example");
    if(scrollElement){
      new window.bootstrap.ScrollSpy(scrollElement, {
        target: "#mynav",
        offset: 80,
      });
    }
  },[]);
  
  return(
    <Router>
      <div className="bg-light">
        <nav className="navbar sticky-top bg-body-tertiary navbar-expand-lg" id="mynav">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <span className="fw-bold"><i className="fa fa-tools"></i> K&K Automobiles</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto fw-bold text-uppercase p-2">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
                <li className="nav-item">
                  <Link to="/book-now" className="btn btn-primary mx-3">
                    <i className="fa fa-calendar-plus me-2"></i>Book Now
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <div id="carouselIndicators" className="carousel slide" data-bs-ride="true" style={{height:'90%'}}>
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="https://img1.wallspic.com/crops/4/0/7/3/3/133704/133704-transport-automotive_lighting-classic-scooter-headlamp-1920x1080.jpg" className="d-block w-100" alt="..." style={{mixBlendMode:'darken', filter:'brightness(50%)'}}/>
                    <div className="carousel-caption d-none d-md-block">
                      <h1 className="fw-1">Scooter Repair</h1>
                      <p className="fs-4">Scooter repair cheyyum</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://www.flywheels.com.au/wp-content/uploads/2019/01/Suzuki-Bike-Wallpapers-22-1920-x-1080.jpg" className="d-block w-100" alt="..." style={{mixBlendMode:'darken', filter:'brightness(50%)'}}/>
                    <div className="carousel-caption d-none d-md-block">
                      <h1 className="fw-1">Motorbike Repair</h1>
                      <p className="fs-4">Bike repair cheyyum</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://i.cdn.newsbytesapp.com/images/l30320240403175524.jpeg" className="d-block w-100" alt="..." style={{mixBlendMode:'darken', filter:'brightness(50%)'}}/>
                    <div className="carousel-caption d-none d-md-block">
                      <h1 className="fw-1">Car Repair</h1>
                      <p className="fs-4">Car repair cheyyum</p>
                    </div>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div data-bs-spy="scroll" data-bs-target="#mynav" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex="0">
                <MainPage/>
              </div>
            </>
          } />
          <Route path="/book-now" element={<BookNow />} />
        </Routes>
      </div>
    </Router>
  )
}