import React from "react"
import generalImpl from "../../../IncidenteVM/generalImpl"
export const incidenteCard=(titulo,descripcion, fecha,tipo,validacion_status,descripcionCompleta,user,incidenteId)=>{
    const incidenteDelete= new generalImpl();
    return(
        <div className="mt-3 mb-3 d-flex flex-row w-80" style={{borderRadius:"20px"}} id="incidentCard">
                <div>
                    <img src={require("../../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                </div>
                <div className="w-100" style={{padding:"20px"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <i style={{marginRight:"10px"}}>{(descripcionCompleta=="")?"Draft ":""}</i>
                        <h3>{titulo}</h3>
                        <img src={require("../../../icons/verified.png")} style={{marginLeft:"10px",width:"30px",height:"30px",display:(validacion_status=="true")?"inline-block":"none"}}/>
                    </div>
                
                    <p className="mt-3"><span class="badge text-bg-dark">{tipo}</span><i className="m-2">{fecha}</i></p>
                    <div className="d-flex flex-column mb-3">
                            <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                            <div>
                                <img src={require("../../../images/fotolinkedin.png")} style={{width:"20px",borderRadius:"100px"}}/>
                                <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{user}</b>
                            </div>
                        </div>
                    <p style={{textAlign:"justify"}}>{descripcion}</p>
                    <div className="w-100 d-flex flex-row justify-content-end">
                        <button className="btn btn-danger rounded-pill" style={{marginRight:"20px"}} onClick={()=>{
                            incidenteDelete.deleteIncidente({
                                id:incidenteId
                              })
                            window.location.pathname="/perfil"
                        }}>Eliminar</button>
                      <a href="/incidente" onClick={()=>{
                        sessionStorage.setItem("incidente_id",incidenteId)
                      }}><button className="btn btn-primary rounded-pill" style={{marginRight:"20px"}}>Ver más</button></a>
                      <a href={(descripcionCompleta=="")?"/agregar":"/"} onClick={()=>{
                        sessionStorage.setItem("incidente_id",incidenteId)
                      }} style={{display:(descripcionCompleta=="")?"flex":"none"}}><button className="btn btn-secondary rounded-pill">Completar</button></a>
                    </div>
                </div>
            </div>
    )
  }