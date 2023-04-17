import React from "react"
import { useNavigate } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import { useState,useEffect } from "react";
import DatePicker from "react-datepicker";



import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

export default function Login(props){
    const db = props.db

    sessionStorage.setItem("incidente","");

    const [screen,setScreen]=useState(1)
    const [cantidadUsers,setCantidadUsers]=useState(0)
    const [user,setUser]=useState("")
    const [pass,setPass]=useState("")
    const [mail,setMail]=useState("")
    const [nombres,setNombres]=useState("")
    const [apellidos,setApellidos]=useState("")
    const [id,setId]=useState("")
    const [num,setNum]=useState("")
    const [startDate, setStartDate] = useState(new Date());

    const [loginSuccess,setLoginSuccess]=useState(false)

    const navigate = useNavigate();

    const defaultProps = {
        center: {
          lat: -12.142500,
          lng: -77.006126
        },
        zoom: 16
      };
    
      const OPTIONS = {
        minZoom: 16,
        maxZoom: 16,
        styles: [{ stylers: [{ 'saturation': 0 }, {'lightness':10}] }],
        disableDefaultUI: true
      }

      const Marker = props => {
        return <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px",marginTop:"-60px"}}>
            <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
                <img src={require("../../icons/location.png")} style={{width:"15px",filter:"invert(100%)",marginRight:"2px",display:(props.miMark)?"inline block":"none"}}/><b>{props.text}</b>
            </span>
            <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
                {props.fecha}
            </span>
            <div style={{width:"0",height:"0",borderLeft:"0px solid transparent",borderRight:"15px solid transparent",borderTop:(props.miMark)?"10px solid #1976d2":"10px solid #f44336"}}></div>
        </div>
      }

      function writeUserData(name, password) {
      
        set(ref(db, 'users/' + name), {
          username: name,
          password : password,
          id: id,
          nombres: nombres,
          apellidos: apellidos,
          fechaNacimiento: startDate.toLocaleDateString(),
          celular: num
        });
      }

      useEffect(()=>{
        console.log(startDate.toLocaleDateString())
      },[startDate])
  
      function getCantidadUsers(){
        const dbRef = ref(db);
        get(child(dbRef, `users/`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(Object.keys(snapshot.val()).length);
            setCantidadUsers(Object.keys(snapshot.val()).length)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }

      function getLogin(user,password){
        const dbRef = ref(db);
        get(child(dbRef, `users/`+user)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val().password);
            if(password==snapshot.val().password){
                console.log("success")
                setLoginSuccess(true)
                window.location.pathname="/"
            }else{
                console.log("fail")
                setLoginSuccess(false)
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
  
      useEffect(()=>{
        console.log(getCantidadUsers())
      },[])

      function signUp(){
        return(
            <div className="card" style={{width: "30rem",borderRadius:"20px",border:"none",overflow:"hidden",filter:"drop-shadow(2px 0px 20px gray)",display:(screen==2)?"block":"none"}} id="loginCard">
                        <span style={{marginBottom:"-100px",zIndex:"1",color:"white",marginLeft:"30px",marginTop:"50px",display:"flex",alignItems:"center"}}>
                            <img src={require("../../icons/alerta-peru-logo.png")} style={{width:"40px",marginRight:"10px",filter:"brightness(0%) invert(100%) "}}/>
                            <span style={{fontSize:"30px"}}>Alerta<b>Perú</b></span>
                        </span>
                        <img src={require("../../images/loginBackground.jpg")} class="card-img-top" alt="..." style={{height:"300px",zIndex:"0"}}/>
                        <div className="card-body">
                                <h5 className="card-title">
                                
                                </h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Bienvenido</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <input type="text" className="form-control mb-3" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                    setUser(e.target.value)
                                }}/>
                                <input type="text" className="form-control mb-3" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                    setPass(e.target.value)
                                }}/>
                                <input type="text" className="form-control mb-3" placeholder="ID" aria-label="ID" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                    setId(e.target.value)
                                }}/>
                                <div className="d-flex">
                                    <input type="text" className="form-control mb-3 me-3" placeholder="Nombres" aria-label="Nombres" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                        setNombres(e.target.value)
                                    }}/>
                                    <input type="text" className="form-control mb-3" placeholder="Apellidos" aria-label="Apellidos" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                        setApellidos(e.target.value)
                                    }}/>
                                </div>
                                <input type="text" className="form-control mb-3" placeholder="# Celular (Opcional)" aria-label="Celular" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                    setNum(e.target.value)
                                }}/>
                                <div className="d-flex flex-row w-100 justify-content-between align-items-center p-2 mb-3" style={{borderRadius:"10px",backgroundColor:"#eeeeee"}}>
                                    <span className="w-100">Fecha de nacimiento</span>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <button href="#" class="btn bg-transparent"  onClick={()=>{
                                    setScreen(1)
                                    }}>Cancelar</button>
                                <button href="#" class="btn btn-primary" style={{borderRadius:"20px"}} onClick={()=>{
                                    setScreen(1)
                                    writeUserData(user,pass)
                                    getCantidadUsers()
                                }}>Crear cuenta</button>
                        </div>
                    </div>
        )
      }
      function signIn(){
        return(
            <div className="card" style={{width: "30rem",borderRadius:"20px",border:"none",overflow:"hidden",filter:"drop-shadow(2px 0px 20px gray)",display:(screen==1)?"block":"none"}} id="loginCard">
                        <span style={{marginBottom:"-100px",zIndex:"1",color:"white",marginLeft:"30px",marginTop:"50px",display:"flex",alignItems:"center"}}>
                            <img src={require("../../icons/alerta-peru-logo.png")} style={{width:"40px",marginRight:"10px",filter:"brightness(0%) invert(100%) "}}/>
                            <span style={{fontSize:"30px"}}>Alerta<b>Perú</b></span>
                        </span>
                        <img src={require("../../images/loginBackground.jpg")} class="card-img-top" alt="..." style={{height:"300px",zIndex:"0"}}/>
                        <div className="card-body">
                                <h5 className="card-title">
                                
                                </h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Bienvenido</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <input type="text" className="form-control mb-3" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                    setUser(e.target.value)
                                }}/>
                                <input type="text" className="form-control mb-3" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}} onChange={(e)=>{
                                    setPass(e.target.value)
                                }}/>
                                <button href="#" class="btn bg-transparent" onClick={()=>{
                                    setScreen(2)
                                    setUser("")
                                    setPass("")
                                    }}>Sign up</button>
                                <button href="#" class="btn btn-primary" style={{borderRadius:"20px"}} onClick={()=>{
                                    sessionStorage.setItem("loggedUser", user);
                                    getLogin(user,pass)
                                }}>Log in</button>
                        </div>
                    </div>
        )
      }

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{height:"100vh",width:"100%",minWidth:"1200px",minHeight:"800px",backgroundColor:"#eeeeee",overflow:"scroll",zIndex:"0"}} id="loginBackground">
            <div style={{height:"100vh",width:"100%",zIndex:"1",position:"absolute"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    options={OPTIONS}
                                
                >
                    <Marker lat={-12.138500} lng={-77.016126} text="Robo" fecha="10/04 03:55 pm"/>
                    <Marker lat={-12.140500} lng={-77.015126} text="Acoso" fecha="10/04 04:55 pm"/>
                    <Marker lat={-12.138800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
                    <Marker lat={-12.148800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
                    <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
                    <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
                </GoogleMapReact>
            </div>
            <div style={{width:"100%",height:"100vh",backgroundColor:"transparent",zIndex:"2",position:"absolute"}} className="d-flex justify-content-center align-items-center" >
                    {signUp()}
                    {signIn()}
                </div>
            
            
            
        </div>
        
    );
}