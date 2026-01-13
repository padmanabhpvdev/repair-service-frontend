export default function MainPage(){
    const filterBright={
        filter:'brightness(50%)'
    }
    return(
        <div className="">
            <section id="about" className="container-fluid">
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col">
                        <img src="https://miro.medium.com/v2/1*JktzC9GrA_l4yz0cCy8a5Q.jpeg" alt="Auto Repair" className="img-fluid"/>
                    </div>
                    <div className="col">
                        <h1 className="fw-bold text-center text-primary">About Us</h1>
                        <p className="text-justify">At <strong className="text-primary">K&K Automobiles</strong>, we provide comprehensive auto repair services tailored to keep your vehicles running smoothly and safely. Whether you own a scooter, motorbike or car, our experienced technicians use state-of-the-art diagnostic tools and genuine parts to deliver reliable and efficient repairs. From routine maintenance like oil changes, brake inspections, and tire rotations to more complex engine diagnostics, transmission repairs, and electrical system fixes, we handle it all with precision and care. Our commitment to quality service, transparent pricing, and customer satisfaction has made us a trusted name in the automotive repair industry. Trust K&K Automobiles to get you back on the road with confidence - because your journey matters to us.</p>
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            <div className="col">
                                <div className="card text-white bg-primary mb-3">
                                    <div className="card-body text-center">
                                        <h2 className="fw-bold">1000+</h2>
                                        <strong>Happy Clients</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-white bg-primary mb-3">
                                    <div className="card-body text-center">
                                        <h2 className="fw-bold">8+</h2>
                                        <strong>Technical Experts</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-white bg-primary mb-3">
                                    <div className="card-body text-center">
                                        <h2 className="fw-bold">5+</h2>
                                        <strong>Years of Services</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section><br />
            <section id="services" className="container-fluid">
                <div className="container">
                    <h1 className="text-primary fw-bold text-center">Our Services</h1>
                    <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
                        <div className="col">
                            <div class="card bg-dark text-white h-100">
                                <img src="https://5.imimg.com/data5/SELLER/Default/2025/3/498621064/SF/FW/TA/104071679/two-wheeler-repair-service.jpg" alt="" className="card-img" style={filterBright} />
                                <div className="card-img-overlay">
                                    <h3 className="card-title fw-bold">Scooter Repair</h3>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div class="card bg-dark text-white h-100">
                                <img src="https://png.pngtree.com/background/20250105/original/pngtree-automobile-mechanic-repairing-motorcycle-in-bike-repair-shop-picture-image_15515724.jpg" alt="" className="card-img h-100" style={filterBright}/>
                                <div className="card-img-overlay">
                                    <h3 className="card-title fw-bold">Motorbike Repair</h3>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div class="card bg-dark text-white h-100">
                                <img src="https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="card-img h-100" style={filterBright}/>
                                <div className="card-img-overlay">
                                    <h3 className="card-title fw-bold">Car Repair</h3>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                    </div><br />
                </div>
            </section><br />
            <section id="contact" className="container-fluid">
                <h1 className="text-center text-primary fw-bold">Contact</h1><br />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <ul className="mt-3 lh-lg" style={{listStyleType:'none'}}>
                                <li className="fs-3"><i className="fa fa-envelope"></i> <strong className="text-primary">info@kkauto.com</strong></li>
                                <li className="fs-3"><i className="fa fa-phone"></i> <strong className="text-primary">+91 9876543210</strong></li>
                                <li className="fs-3"><i className="fab fa-instagram"></i> <strong className="text-primary">kkauto_tvm</strong></li>
                                <li className="fs-3"><i className="fab fa-x-twitter"></i> <strong className="text-primary">kkauto_twitter</strong></li>
                            </ul>
                        </div>
                        <div className="col">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d986.3314368982441!2d76.8860309!3d8.5646426!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bee2f4878db5%3A0x44f9cf2f3f7bcd8f!2sDepartment%20of%20Computer%20Science%2C%20University%20of%20Kerala!5e0!3m2!1sen!2sin!4v1768294699100!5m2!1sen!2sin" width="800" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="shadow-lg"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
