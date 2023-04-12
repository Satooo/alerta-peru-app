import React from "react";
import { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import DateTimePicker from 'react-datetime-picker';
import ImageUploading from 'react-images-uploading';
import { createPopper } from '@popperjs/core';
import HeaderTopMenu from "../common/HeaderTopMap";

import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import HeaderAdminMap from "../common/HeaderAdminMap";
import HeaderAdmin from "../common/HeaderAdmin";

export default function Dashboard(){
    const [seccion,setSeccion]=useState("pendientes")
    const [filter,setFilter]=useState("")
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
                        <div className="d-flex flex-row justify-content-end mt-3">
                            <button className="btn btn-danger" style={{borderRadius:"0px",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}>Eliminar</button>
                            <button className="btn btn-warning" style={{borderRadius:"0px"}}>Solicitar evidencia</button>
                            <button className="btn btn-success" style={{borderRadius:"0px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}}>Validar</button>
                          </div>
                    </div>
                </div>
        )
      }
      function Secciones(){
        return(
            <ul class="nav nav-pills me-3 mt-3 nav-justified" id="pills-tab" role="tablist" style={{backgroundColor:"#e0e0e0",borderRadius:"20px"}}>
            <li class="nav-item" role="presentation">
                <button class="nav-link active rounded-pill" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={
                    ()=>{
                        setSeccion("pendientes")
                    }
                }>Pendientes</button>
            </li>
            <li class="nav-item"  role="presentation">
                <button class="nav-link rounded-pill" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={
                    ()=>{
                        setSeccion("atendidos")
                    }
                }>Atendidos</button>
            </li>
            </ul>
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
                    <img src={require("../../images/robbery.jpg")}  class="d-block w-100" alt="..."/>
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
                    <img src={require("../../images/loginBackground.jpg")} class="d-block w-100" alt="..."/>
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
    function filterSection(){
        return(
            <div className="w-100">
                <div class="btn-group">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#eeeeee"}}>
                    <img src={require("../../icons/filter.png")} style={{width:"20px",marginRight:"20px"}}/>Filter
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
                </div>
            </div>
        )
    }
    return (
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <HeaderAdmin/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" style={{borderRadius:"20px",paddingTop:"20px"}}>
                <TopIncidentes/>
                {Secciones()}
                {filterSection()}
                {Array(20).fill(0).map((_,index)=>{
                    return (
                        incidentMinimized()
                    )
                })}
            </div>
        </div>
    )

}