import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Header from "../common/Header";
import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import { getPerfil2,writeUserData2, getUser , modificarUser} from "../login/viewmodel/LoginVM";
import { usuario } from "../../entities/usuario";


import { participacion } from "./components/showParticipacion";
import loginImpl from "../login/viewmodel/loginImpl";
import userManager from "../../IncidenteVM/userManager";

export default function Perfil(props){
    sessionStorage.setItem("incidente","");
    const loginFunctionality = new loginImpl();
    const incidentesGetter = new userManager().factoryMethod();
    const db = props.db

    const [value, onChangeDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [loggedUser,setLoggedUser]=useState("");
    const[misPublicaciones,setMisPublicaciones]=useState(0);
    const [deleteConfirmation,setDeleteConfirmation]=useState(false);

    const [nombres,setNombres]=useState("")
    const [apellidos,setApellidos]=useState("")
    const [id,setId]=useState("")
    const [num,setNum]=useState("")
    const [user,setUser]=useState("")
    const [pass,setPass]=useState("")
    const [loggedPerfil,setLoggedPerfil]=useState(new usuario)

    const[showPass,setShowPass]=useState(false)
    const[editMode,setEditMode]=useState(false)

    const [incidentes,setIncidentes]=useState({});

    const user_id = sessionStorage.getItem("user_id")
    

    useEffect(()=>{
        setLoggedUser(sessionStorage.getItem("loggedUser"));
        console.log(loggedUser)
    },[])

    useEffect(()=>{
        //getPerfil2(loggedUser,setLoggedPerfil,setStartDate)
        //getUser(loggedUser,setLoggedPerfil,setStartDate)
        //getIncidentesDb(setIncidentes)
        loginFunctionality.getUser(loggedUser,setLoggedPerfil,setStartDate)
        incidentesGetter.getIncidentes(setIncidentes)
    },[loggedUser])

    useEffect(()=>{
        console.log(loggedPerfil.user_id)
        console.log(loggedPerfil)
        setUser(loggedPerfil.user)
        setPass(loggedPerfil.pass)
        setNombres(loggedPerfil.nombres)
        setApellidos(loggedPerfil.apellidos)
        setId(loggedPerfil.id)
        setNum(loggedPerfil.celular)
    },[loggedPerfil])

    useEffect(()=>{
        let cantidad=0;
        if(incidentes.length>0){
            for(let index=0;index<incidentes.length;index++){
                if(incidentes[index].user_id==user_id){
                    cantidad++
                }
            }
        }
        setMisPublicaciones(cantidad)
    },[incidentes])

    function profileInfo(){
        if(sessionStorage.getItem("loggedUser")!="" && sessionStorage.getItem("loggedUser")!=null){
            return <div className="row">
                    <div className="col-lg-2 d-flex flex-column align-items-center">
                        <img src={require("../../images/fotolinkedin.png")} style={{width:"150px",borderRadius:"100px"}}/>
                        <div style={{backgroundColor:"#e3f2fd",borderRadius:"20px",padding:"20px",marginTop:"20px",width:"100%"}}>
                            <p style={{textAlign:"center",width:"100%"}}><b>@{(user!="")?user:"SatoAtoo"}</b></p>
                            <p style={{marginTop:"10px"}}><i>{misPublicaciones} reportes</i></p>
                        </div>
                        <button className="mt-3 btn btn-primary w-100 rounded-pill" style={{display:(editMode)?"none":"block"}} onClick={()=>{setEditMode(true)}}>Editar perfil</button>
                        <button className="mt-3 btn btn-primary w-100 rounded-pill" style={{display:(editMode)?"block":"none"}} onClick={()=>{
                            setEditMode(false)
                            let actualizarUser = new usuario(
                                user,
                                pass,
                                id,
                                nombres,
                                apellidos,
                                num,
                                startDate.toLocaleDateString(),
                                loggedPerfil.user_id
                            )
                            //writeUserData2(actualizarUser)
                            //modificarUser(actualizarUser)
                            loginFunctionality.modificarUser(actualizarUser)
                            }}>Save</button>
                        <button style={{display:(editMode)?"block":"none"}} className="mt-3 btn btn-danger w-100 rounded-pill mt-3" onClick={()=>{setEditMode(false)}}>Cancelar</button>
                    </div>
                    <div className="col-lg-10 d-flex flex-column justify-content-center" style={{backgroundColor:"#eeeeee",borderRadius:"20px",padding:"20px"}}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Usuario</span>
                        <input type="text" class="form-control" placeholder="SatoAtoo" aria-label="Username" aria-describedby="basic-addon1" disabled={true} value={user}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">password</span>
                        <input type={(showPass)?"text":"password"} class="form-control" placeholder="Contraseña oculta" aria-label="Username" aria-describedby="basic-addon1" disabled={!editMode} value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                        <button className="btn btn-secondary" onClick={()=>{setShowPass(!showPass)}}>{(showPass)?"Hide":"Show"}</button>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Identificación (DNI)</span>
                        <input type="text" class="form-control" placeholder="Número de DNI" aria-label="Username" aria-describedby="basic-addon1" disabled={!editMode} value={id} onChange={(e)=>{setId(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nombres</span>
                        <input type="text" class="form-control" placeholder="Nombres" aria-label="Username" aria-describedby="basic-addon1" disabled={!editMode} value={nombres} onChange={(e)=>{setNombres(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Apellidos</span>
                        <input type="text" class="form-control" placeholder="Apellidos" aria-label="Username" aria-describedby="basic-addon1" disabled={!editMode} value={apellidos} onChange={(e)=>{setApellidos(e.target.value)}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Número celular</span>
                        <input type="text" class="form-control" placeholder="# Celular" aria-label="Username" aria-describedby="basic-addon1" disabled={!editMode} value={num} onChange={(e)=>{setNum(e.target.value)}}/>
                    </div>
                    <div className="d-flex flex-row w-100 justify-content-between align-items-center bg-light p-2 " style={{borderRadius:"10px"}}>
                        <span >Fecha de nacimiento</span>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} disabled={!editMode} />
                    </div>
                    </div>
                </div>
        }else{
            return <div style={{backgroundColor:"#eeeeee",borderRadius:"20px",textAlign:"center",padding:"20px"}}>
                 Esta con cuenta de invitado
                 <a href="/login"><button className="btn btn-primary p-2 rounded-pill" style={{marginLeft:"20px"}} onClick={()=>{
                    sessionStorage.setItem("user_id","")
                 }}
                 >Inciar sesión</button></a>
            </div>
        }
        
    }
    
    return(
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column" style={{borderRadius:"20px",padding:"30px"}}>
                {profileInfo()}
                {participacion(incidentes,user_id,deleteConfirmation,setDeleteConfirmation)} 
            </div>
        </div>
    )
}