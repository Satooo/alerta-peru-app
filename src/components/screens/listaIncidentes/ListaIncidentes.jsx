import React from "react";
import Header from "../common/Header";

import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Button from "react-bootstrap/Button"

export default function ListaIncidentes(){

      const incidentMinimized=()=>{
        return(
            <div className="mt-3 mb-3 d-flex flex-row w-80" style={{borderRadius:"20px"}} id="incidentCard">
                    <div>
                        <img src={require("../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                    </div>
                    <div className="w-100" style={{padding:"20px"}}>
                        <h3>Robo agravado</h3>
                        <p className="mt-3"><span class="badge text-bg-dark">Robo</span><i className="m-2">10/03/2023 13:05</i></p>
                        <p style={{textAlign:"justify"}}>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <div className="w-100 d-flex flex-row justify-content-end">
                          <a href="/lista-incidentes"><button className="btn btn-primary rounded-pill">Ver más</button></a>
                        </div>
                    </div>
                </div>
        )
      }
    const TopIncidentes=()=>{
        return(
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner" style={{borderRadius:"20px"}}>
                    <div class="carousel-item active">
                    <img src={require("../../images/loginBackground.jpg")} class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                        <h5>Nombre de incidente 1</h5>
                        <p><i>03/04 3:00pm</i></p>
                        <div className="row w-100">
                            <div className="col-lg-3">
                                <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <img src={require("../../images/fotolinkedin.png")} style={{width:"50px",borderRadius:"100px",marginRight:"10px"}}/>
                                    <div className="d-flex flex-column w-100">
                                        <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                        <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>Andrés Sato</b>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <p style={{textAlign:"justify"}}> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src={require("../../images/robbery.jpg")}  class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                        <h5>Nombre de incidente 1</h5>
                        <p><i>03/04 3:00pm</i></p>
                        <div className="row w-100">
                            <div className="col-lg-3">
                                <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <img src={require("../../images/fotolinkedin.png")} style={{width:"50px",borderRadius:"100px",marginRight:"10px"}}/>
                                    <div className="d-flex flex-column w-100">
                                        <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                        <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>Andrés Sato</b>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <p style={{textAlign:"justify"}}> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src={require("../../images/loginBackground.jpg")} class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                        <h5>Nombre de incidente 1</h5>
                        <p><i>03/04 3:00pm</i></p>
                        <div className="row w-100">
                            <div className="col-lg-3">
                                <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <img src={require("../../images/fotolinkedin.png")} style={{width:"50px",borderRadius:"100px",marginRight:"10px"}}/>
                                    <div className="d-flex flex-column w-100">
                                        <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                        <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>Andrés Sato</b>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <p style={{textAlign:"justify"}}> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
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
    return (
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" style={{borderRadius:"20px",paddingTop:"20px"}}>
                <TopIncidentes/>
                {Array(20).fill(0).map((_,index)=>{
                    return (
                        incidentMinimized()
                    )
                })}
            </div>
        </div>
    )
}