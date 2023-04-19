import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Button from "react-bootstrap/Button"

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

export default function ListaIncidentes(props){
    const db = props.db

    let user = sessionStorage.getItem("loggedUser");
    sessionStorage.setItem("incidente","");

    const [incidentes,setIncidentes]=useState({});

    function getIncidentes(){
        const dbRef = ref(db);
        get(child(dbRef, `posts/`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setIncidentes(snapshot.val())
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }

    useEffect(()=>{
        getIncidentes()
    },[])

    useEffect(()=>{
        console.log(incidentes)
        
    },[incidentes])
    
      const incidentMinimized=()=>{
        return(
            <div className="mt-3 mb-3 d-flex flex-row w-80" style={{borderRadius:"20px"}} id="incidentCard">
                    <div>
                        <img src={require("../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                    </div>
                    <div className="w-100" style={{padding:"20px"}}>
                        <h3>Robo agravado</h3>
                        <p className="mt-3"><span class="badge text-bg-dark">Robo</span><i className="m-2">10/03/2023 13:05</i></p>
                        <div className="d-flex flex-column mb-3">
                                <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                <div>
                                    <img src={require("../../images/fotolinkedin.png")} style={{width:"20px",borderRadius:"100px"}}/>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>Andrés Sato</b>
                                </div>
                            </div>
                        <p style={{textAlign:"justify"}}>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <div className="w-100 d-flex flex-row justify-content-end">
                          <a href="/incidente"><button className="btn btn-primary rounded-pill">Ver más</button></a>
                        </div>
                    </div>
                </div>
        )
      }
      const incidentCard=(titulo,descripcion,tipo,user,fecha)=>{
        const fechaDisplay = `${new Date(fecha).toLocaleDateString()} ${new Date(fecha).toLocaleTimeString()}`
        return(
            <div className="mt-3 mb-3 d-flex flex-row w-100" style={{borderRadius:"20px"}} id="incidentCard">
                    <div>
                        <img src={require("../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                    </div>
                    <div style={{padding:"20px",width:"100%"}}>
                        <h3 className="w-100">{titulo}</h3>
                        <p className="mt-3"><span class="badge text-bg-dark">{tipo}</span><i className="m-2">{fechaDisplay}</i></p>
                        <div className="d-flex flex-column mb-3">
                                <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                <div>
                                    <img src={require("../../images/fotolinkedin.png")} style={{width:"20px",borderRadius:"100px"}}/>
                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{user}</b>
                                </div>
                            </div>
                        <p style={{textAlign:"justify"}}>{descripcion}</p>
                        <div className="w-100 d-flex flex-row justify-content-end">
                          <a href="/incidente"><button className="btn btn-primary rounded-pill" onClick={()=>{
                            sessionStorage.setItem("incidente",titulo)
                          }}>Ver más</button></a>
                        </div>
                    </div>
                </div>
        )
      }
    function showIncidentes(){
        if(Object.keys(incidentes).length>0){
            const sorted= []
            Object.keys(incidentes).forEach((incidente)=>{
                sorted.push({
                    key: incidente,
                    value: new Date(incidentes[incidente].fecha)
                })
            })
            sorted.sort((a, b) => b.value - a.value)
            console.log(sorted)
            
            let incidentesKeys=Object.keys(incidentes)
            let incidentesDisplay = Array(incidentesKeys.length).fill(0).map((_,index)=>{
                let i = sorted[index].key
                console.log(incidentes[i].descripcion)
                if(incidentes[i].descripcionCompleta.length>0){
                    return (
                        incidentCard(incidentes[i].titulo,incidentes[i].descripcion,incidentes[i].tipo,incidentes[i].user,incidentes[i].fecha,incidentes[i].descripcionCompleta)
                    )
                }
                
            })
            return incidentesDisplay
        }
        
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
                        <p><span class="badge rounded-pill bg-light text-dark" style={{marginRight:"20px"}}>Tipo</span><i>03/04 3:00pm</i></p>
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
                        <h5>Nombre de incidente 2</h5>
                        <p><span class="badge rounded-pill bg-light text-dark" style={{marginRight:"20px"}}>Tipo</span><i>03/04 3:00pm</i></p>
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
                        <h5>Nombre de incidente 3</h5>
                        <p><span class="badge rounded-pill bg-light text-dark" style={{marginRight:"20px"}}>Tipo</span><i>03/04 3:00pm</i></p>
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
                {showIncidentes()}
                {Array(3).fill(0).map((_,index)=>{
                    return (
                        incidentMinimized()
                    )
                })}
            </div>
        </div>
    )
}