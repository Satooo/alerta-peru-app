import React from "react";
export const TopIncidentes=()=>{
    return(
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner" style={{borderRadius:"20px"}}>
                <div class="carousel-item active">
                <img src={require("../../../images/loginBackground.jpg")} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                    <h5>Tipo incidente 1</h5>
                    <p><i>Este mes</i></p>
                    <div className="row w-100">
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 1</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 2</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 3</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 4</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-outline-light rounded-pill p-2 mt-3"> Detalles del tipo</button>
                    </div>
                </div>
                </div>
                <div class="carousel-item">
                <img src={require("../../../images/robbery.jpg")}  class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                    <h5>Tipo incidente 2</h5>
                    <p><i>03/04 3:00pm</i></p>
                    <div className="row w-100">
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 1</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 2</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 3</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 4</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-outline-light rounded-pill p-2 mt-3"> Detalles del tipo</button>
                    </div>
                </div>
                </div>
                <div class="carousel-item">
                <img src={require("../../../images/loginBackground.jpg")} class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                    <h5>Tipo de incidente 3</h5>
                    <p><i>03/04 3:00pm</i></p>
                    <div className="row w-100">
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 1</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 2</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 3</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div className="d-flex flex-column w-100">
                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Dato 4</span>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>100</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button className="btn btn-outline-light rounded-pill p-2 mt-3"> Detalles del tipo</button>
                    </div>
                </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
    )
}