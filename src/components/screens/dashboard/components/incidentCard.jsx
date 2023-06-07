import React from "react"
import { deleteIncidente } from "../../../../IncidenteVM/IncidenteVM"
export const incidentCardAdmin=(titulo,descripcion,tipo,user,fecha,validacion,id)=>{
    const fechaDisplay = `${new Date(fecha).toLocaleDateString()} ${new Date(fecha).toLocaleTimeString()}`
    return(
        <div className="mt-3 mb-3 d-flex flex-row w-100" style={{borderRadius:"20px"}} id="incidentCard">
                <div>
                    <img src={require("../../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                </div>
                <div style={{padding:"20px",width:"100%"}}>
                    <div className="d-flex">
                        <h3 className="w-100">{titulo}</h3>
                        <img src={require("../../../icons/verified.png")} style={{width:"30px",height:"30px",display:(validacion=="true")?"inline-block":"none"}}/>
                    </div>
                    
                    <p className="mt-3"><span class="badge text-bg-dark">{tipo}</span><i className="m-2">{fechaDisplay}</i></p>
                    <div className="d-flex flex-column mb-3">
                            <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                            <div>
                                <img src={require("../../../images/fotolinkedin.png")} style={{width:"20px",borderRadius:"100px"}}/>
                                <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{user}</b>
                            </div>
                        </div>
                    <p style={{textAlign:"justify"}}>{descripcion}</p>
                    <div className="w-100 d-flex flex-row justify-content-end">
                      <a href="/incidente"><button className="btn btn-primary rounded-pill" onClick={()=>{
                        sessionStorage.setItem("incidente",titulo)
                        sessionStorage.setItem("incidente_id",id)
                      }}>Ver más</button></a>
                    </div>
                    <div className="d-flex flex-row justify-content-end mt-3">
                        <button className="btn btn-danger" style={{borderRadius:"0px",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}} onClick={()=>{
                            deleteIncidente({
                                id:id
                            })
                            window.location.pathname="/dashboard"
                        }}>Eliminar</button>
                        <button className="btn btn-warning" style={{borderRadius:"0px"}} data-bs-toggle="modal" data-bs-target="#exampleModal">Solicitar evidencia</button>
                        <a href="/incidente-admin"><button className="btn btn-success" style={{borderRadius:"0px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}} onClick={()=>{
                            sessionStorage.setItem("incidente",titulo)
                            sessionStorage.setItem("incidente_id",id)
                        }}>Validar</button></a>
                    </div>
                </div>
            </div>
    )
  }