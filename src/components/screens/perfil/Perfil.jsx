import React from "react";
import DateTimePicker from 'react-datetime-picker';
import { useState } from "react";
import Header from "../common/Header";

export default function Perfil(){
    sessionStorage.setItem("incidente","");
    
    const [value, onChangeDate] = useState(new Date());

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
                          <a href="/incidente"><button className="btn btn-primary rounded-pill" style={{marginRight:"20px"}}>Ver más</button></a>
                          <a href="/"><button className="btn btn-secondary rounded-pill">Aportar evidencia</button></a>
                        </div>
                    </div>
                </div>
        )
      }

    return(
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column" style={{borderRadius:"20px",padding:"30px"}}>
                <div className="row">
                    <div className="col-lg-2 d-flex flex-column align-items-center">
                        <img src={require("../../images/fotolinkedin.png")} style={{width:"150px",borderRadius:"100px"}}/>
                        <div style={{backgroundColor:"#e3f2fd",borderRadius:"20px",padding:"20px",marginTop:"20px",width:"100%"}}>
                            <p style={{textAlign:"center",width:"100%"}}><b>@SatoAtoo</b></p>
                            <p style={{marginTop:"10px"}}><i>0 Reportes</i></p>
                            <p><i>0 Aportes</i></p>
                        </div>
                        <button className="mt-3 btn btn-primary w-100 rounded-pill">Editar perfil</button>
                    </div>
                    <div className="col-lg-10 d-flex flex-column justify-content-center" style={{backgroundColor:"#eeeeee",borderRadius:"20px",padding:"20px"}}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Usuario</span>
                        <input type="text" class="form-control" placeholder="SatoAtoo" aria-label="Username" aria-describedby="basic-addon1" disabled={false}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">password</span>
                        <input type="password" class="form-control" placeholder="Contraseña oculta" aria-label="Username" aria-describedby="basic-addon1" disabled={false}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Identificación (DNI)</span>
                        <input type="text" class="form-control" placeholder="Número de DNI" aria-label="Username" aria-describedby="basic-addon1" disabled={false}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nombres</span>
                        <input type="text" class="form-control" placeholder="Nombres" aria-label="Username" aria-describedby="basic-addon1" disabled={false}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Apellidos</span>
                        <input type="text" class="form-control" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" disabled={false}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Número celular</span>
                        <input type="text" class="form-control" placeholder="# Celular" aria-label="Username" aria-describedby="basic-addon1" disabled={false}/>
                    </div>
                    <div className="d-flex flex-row w-100 justify-content-between align-items-center bg-light p-2 " style={{borderRadius:"10px"}}>
                        <span>Fecha de nacimiento</span>
                        <DateTimePicker onChange={onChangeDate} value={value} />
                    </div>
                    </div>
                </div>
                <div>
                    <p className="mt-5" style={{backgroundColor:"#e3f2fd",padding:"10px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",width:"300px",marginBottom:"0px",color:"black",textAlign:"center"}}><b>Incidentes con tu participación</b></p>
                    <div style={{borderTop:"1px solid #1976d2",marginTop:"0px"}}>
                        {Array(20).fill(0).map((_,index)=>{
                        return (
                            incidentMinimized()
                        )
                        })}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}