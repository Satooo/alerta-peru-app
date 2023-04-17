import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Header from "../common/Header";
import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

export default function Perfil(props){
    sessionStorage.setItem("incidente","");
    const db = props.db

    const [value, onChangeDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [loggedUser,setLoggedUser]=useState("");

    const [nombres,setNombres]=useState("")
    const [apellidos,setApellidos]=useState("")
    const [id,setId]=useState("")
    const [num,setNum]=useState("")
    const [user,setUser]=useState("")
    const [pass,setPass]=useState("")

    const[showPass,setShowPass]=useState(false)
    const[editMode,setEditMode]=useState(false)
    

    useEffect(()=>{
        setLoggedUser(sessionStorage.getItem("loggedUser"));
        console.log(loggedUser)
        
    },[])

    useEffect(()=>{
        getPerfilInfo()
    },[loggedUser])

    function getPerfilInfo(){
        const dbRef = ref(db);
        get(child(dbRef, `users/${loggedUser}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val())
            setUser(snapshot.val().username)
            setPass(snapshot.val().password)
            setNombres(snapshot.val().nombres)
            setApellidos(snapshot.val().apellidos)
            setId(snapshot.val().id)
            setNum(snapshot.val().celular)
            let [day, month, year] = (snapshot.val().fechaNacimiento).split('/')
            const dateObj = new Date(+year, +month - 1, +day)
            console.log(dateObj)
            setStartDate(dateObj)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }

      function writeUserData() {
      
        set(ref(db, 'users/' + user), {
          username: user,
          password : pass,
          id: id,
          nombres: nombres,
          apellidos: apellidos,
          fechaNacimiento: startDate.toLocaleDateString(),
          celular: num
        });
      }

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
    function profileInfo(){
        if(sessionStorage.getItem("loggedUser")!="" && sessionStorage.getItem("loggedUser")!=null){
            return <div className="row">
                    <div className="col-lg-2 d-flex flex-column align-items-center">
                        <img src={require("../../images/fotolinkedin.png")} style={{width:"150px",borderRadius:"100px"}}/>
                        <div style={{backgroundColor:"#e3f2fd",borderRadius:"20px",padding:"20px",marginTop:"20px",width:"100%"}}>
                            <p style={{textAlign:"center",width:"100%"}}><b>@{(user!="")?user:"SatoAtoo"}</b></p>
                            <p style={{marginTop:"10px"}}><i>0 Reportes</i></p>
                            <p><i>0 Aportes</i></p>
                        </div>
                        <button className="mt-3 btn btn-primary w-100 rounded-pill" style={{display:(editMode)?"none":"block"}} onClick={()=>{setEditMode(true)}}>Editar perfil</button>
                        <button className="mt-3 btn btn-primary w-100 rounded-pill" style={{display:(editMode)?"block":"none"}} onClick={()=>{
                            setEditMode(false)
                            writeUserData()
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
                 <a href="/login"><button className="btn btn-primary p-2 rounded-pill" style={{marginLeft:"20px"}}>Inciar sesión</button></a>
            </div>
        }
        
    }
    function participacion(){
        if(sessionStorage.getItem("loggedUser")!="" && sessionStorage.getItem("loggedUser")!=null){
       return <div>
                    <p className="mt-5" style={{backgroundColor:"#e3f2fd",padding:"10px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",width:"300px",marginBottom:"0px",color:"black",textAlign:"center"}}><b>Incidentes con tu participación</b></p>
                    <div style={{borderTop:"1px solid #1976d2",marginTop:"0px"}}>
                        {Array(20).fill(0).map((_,index)=>{
                        return (
                            incidentMinimized()
                        )
                        })}
                    </div>
                </div>
        }
    }
    return(
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column" style={{borderRadius:"20px",padding:"30px"}}>
                {profileInfo()}
                {participacion()}
            </div>
        </div>
    )
}