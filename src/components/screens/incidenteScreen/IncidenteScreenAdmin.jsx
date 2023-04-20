import React, { useState,useEffect } from "react";
import Header from "../common/Header";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import HeaderAdmin from "../common/HeaderAdmin";
import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { getImages } from "../../imageUploadVM/imageUploadVM";
import { getIncidenteAdmin2, validarIncidente } from "../../../IncidenteVM/IncidenteVM";
import { incidente } from "../../entities/incidente";
import { incidenteValidado } from "../../entities/validacion";

export default function IncidenteScreenAdmin(props){
  let user = sessionStorage.getItem("loggedUser")
  let incidenteTitle = sessionStorage.getItem("incidente")

    const [address,setAddress]=useState("");
    const [lat,setLat]=useState(-12.138500);
    const [lng,setLng]=useState(-77.016126);
    const [titulo,setTitulo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [tipo,setTipo]=useState("");
    const [fecha,setFecha]=useState("");
    const [autor,setAutor]=useState("");
    const [descripcionComp,setDescripcionComp]=useState("")
    const [lugar,setLugar]=useState("")
    const [ev1,setEv1]=useState("")
    const [ev2,setEv2]=useState("")
    const [ev3,setEv3]=useState("")
    const [hora,setHora]=useState("")
    const [validacion,setValidacion]=useState("")
    const [fechaShow,setFechaShow]=useState("")
    const [newIncidente,setNewIncidente]=useState(new incidenteValidado)
    const [defaultProps,setDefaultProps]=useState(
      {
        center: {
          lat:-12.138500,
          lng:-77.016126
        },
        zoom: 13
      }
    )
    const [comentariosAdmin,setComentariosAdmin]=useState("")
    const [mensajeValidacion,setMensajeValidaciion]=useState("")
    const [faltaEvidencia,setFaltaEvidencia]=useState("")

    
    Geocode.setApiKey("AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI");
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(()=>{
      getImages(titulo,setImageUrls)
    },[titulo])

    useEffect(()=>{
      getIncidenteAdmin2(setNewIncidente,incidenteTitle)
    },[])

    useEffect(()=>{
      setAutor(newIncidente.user)
      setTitulo(newIncidente.titulo);
      setDescripcion(newIncidente.descripcion);
      const fechaDisplay = `${new Date(newIncidente.fecha).toLocaleDateString()} ${new Date(newIncidente.fecha).toLocaleTimeString()}`
      setFechaShow(fechaDisplay)
      setFecha(newIncidente.fecha)
      setTipo(newIncidente.tipo);
      setDescripcionComp(newIncidente.descripcionCompleta);
      setLugar(newIncidente.lugar);
      setLat(newIncidente.lat);
      setLng(newIncidente.lng)
      setEv1(newIncidente.evidencia1);
      setEv2(newIncidente.evidencia2);
      setEv3(newIncidente.evidencia3);
      if(newIncidente.validacion==undefined || newIncidente.validacion==""){
        setValidacion("")
      }else{
        setValidacion(newIncidente.validacion);
      }
      if(newIncidente.comentariosAdmin==undefined || newIncidente.comentariosAdmin==""){
        setComentariosAdmin("");
      }else{
        setComentariosAdmin(newIncidente.comentariosAdmin);
      }
      if(newIncidente.mensajeValidacion==undefined || newIncidente.mensajeValidacion==""){
        setMensajeValidaciion("");
      }else{
        setMensajeValidaciion(newIncidente.mensajeValidacion);
      }
      if(newIncidente.faltaEvidencia==undefined || newIncidente.faltaEvidencia==""){
        setFaltaEvidencia("");
      }else{
        setFaltaEvidencia(newIncidente.faltaEvidencia);
      }
      
    },[newIncidente])
   
  

    
      const OPTIONS = {
        minZoom: 13,
        maxZoom: 20,
        disableDefaultUI: true
      }
      

      function validar(){
        let validado= new incidenteValidado(
          newIncidente.user,
          newIncidente.titulo,
          newIncidente.descripcion,
          newIncidente.tipo,
          newIncidente.lugar,
          newIncidente.fecha,
          newIncidente.lat,
          newIncidente.lng,
          newIncidente.descripcionCompleta,
          newIncidente.evidencia1,
          newIncidente.evidencia2,
          newIncidente.evidencia3,
          validacion,
          comentariosAdmin,
          mensajeValidacion,
          faltaEvidencia,
        )
        console.log(validado)
        validarIncidente(validado)
      }


      useEffect(()=>{
        Geocode.fromLatLng(lat,lng).then(
            (response) => {
              const address = response.results[0].formatted_address;
              let city, state, country;
              for (let i = 0; i < response.results[0].address_components.length; i++) {
                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case "locality":
                      city = response.results[0].address_components[i].long_name;
                      break;
                    case "administrative_area_level_1":
                      state = response.results[0].address_components[i].long_name;
                      break;
                    case "country":
                      country = response.results[0].address_components[i].long_name;
                      break;
                  }
                }
              }
              console.log(city, state, country);
              console.log(address);
              setAddress(address)
            },
            (error) => {
              console.error(error);
            }
          );
      },[lat,lng])

      const Marker = props => {
        return (
        
        <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px",marginTop:"-60px"}}>
            <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
                <img src={require("../../icons/location.png")} style={{width:"15px",filter:"invert(100%)",marginRight:"2px",display:(props.miMark)?"inline block":"none"}}/><b>{props.text}</b>
            </span>
            <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
                {props.fecha}
                <a href={`https://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},12z`} target="_blank" style={{textDecoration:"none"}}><button id="markerButton" style={{display:(props.miMark)?"none":"block"}}>Ver más</button></a>
            </span>
            <div style={{width:"0",height:"0",borderLeft:"0px solid transparent",borderRight:"15px solid transparent",borderTop:(props.miMark)?"10px solid #1976d2":"10px solid #f44336"}}></div>
        </div>
         
        )
      }
    
      

    return(
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <HeaderAdmin/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center mb-5" style={{borderRadius:"20px",paddingTop:"20px"}}>
                <div style={{position:"relative",textAlign:"center",width:"100%"}}>
                    <img src={require("../../images/loginBackground.jpg")} style={{width:"100%",maxHeight:"300px",objectFit:"cover",borderTopRightRadius:"20px",borderTopLeftRadius:"20px",filter:"brightness(0.5)"}}/>
                    <div style={{position:"absolute",top:"30%",width:"100%",color:"white"}}>
                        <h1>{(titulo!="")?titulo:"Nombre incidente x"}</h1>
                        <div className="mt-3">
                            <p><span>Fecha de incidente: {(fechaShow!="")?fechaShow:"12/04 3:00pm"}</span></p>
                            <p><span>Tipo de incidente: <span class="badge rounded-pill bg-light text-dark" style={{marginRight:"20px"}}>{(tipo!="")?tipo:"Tipo"}</span></span></p>
                        </div>
                    </div>
                </div>
                <div className="row w-100 mt-5">
                        <div className="col-lg-4">
                        <div style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <img src={require("../../images/fotolinkedin.png")} style={{width:"50px",borderRadius:"100px",marginRight:"10px"}}/>
                                    <div className="d-flex flex-column w-100" style={{color:"black"}}>
                                        <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                        <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{(autor!="")?autor:"Andrés Sato"}</b>
                                    </div>
                                    
                        </div>
                        <nav id="navbar-example3" class="navbar navbar-light bg-light flex-column align-items-stretch p-3">
                            <a class="navbar-brand" href="#">Índice</a>
                            <nav class="nav nav-pills flex-column">
                                <a class="nav-link" href="#item-1">Información general</a>
                                <nav class="nav nav-pills flex-column">
                                <a class="nav-link ms-3 my-1" href="#item-1-1">Descripción</a>
                                <a class="nav-link ms-3 my-1" href="#item-1-2">Ubicación</a>
                                <a class="nav-link ms-3 my-1" href="#item-1-2">Involucrados</a>
                                </nav>
                                <a class="nav-link" href="#item-2">Evidencia</a>
                                <a class="nav-link" href="#item-3">Validación</a>
                                <nav class="nav nav-pills flex-column">
                                <a class="nav-link ms-3 my-1" href="#item-3-1">Evidencia de usuarios</a>
                                <a class="nav-link ms-3 my-1" href="#item-3-2">Comentarios de municipalidad</a>
                                </nav>
                            </nav>
                            </nav>
                        </div>
                        <div className="col-lg-8">
                            <div style={{backgroundColor:"#e3f2fd",padding:"20px",borderRadius:"20px",textAlign:"center",marginBottom:"20px"}}>
                                <b>Vista de admin</b>
                            </div>
                            <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabindex="0">
                            <h4 id="item-1">Información general</h4>
                            <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={(validacion=="true")?true:false} onChange={()=>{
                              if(validacion==""){
                                setValidacion("true")
                              }else if(validacion=="true"){
                                setValidacion("false")
                              }else if (validacion=="false"){
                                setValidacion("true")
                              }else{
                                setValidacion("true")
                              }
                              console.log(validacion)
                            }
                            }/>
                            <label class="form-check-label" for="flexSwitchCheckDefault">Es válido?</label>
                            </div>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>
                            {(descripcion!="")?descripcion:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ."}
                            </p>
                            <h5 id="item-1-1">Descripción</h5>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>
                            {(descripcionComp!="")?descripcionComp:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}
                            </p>
                            <h5 id="item-1-2">Ubicación</h5>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>
                            {(lugar!="")?lugar:address}
                            </p>
                            <div style={{height:"300px",width:"800px"}}>
                              <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI" }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                options={OPTIONS}
                                >
                                <Marker lat={(lat!="")?lat:"-12.138500"} lng={(lng!="")?lng:"-77.016126"} text="Sucedió aquí" fecha="10/04 03:55 pm" onClick={()=>{console.log("hola")}}/>
                                
                                </GoogleMapReact>
                            </div>
                            <h5 id="item-1-3" style={{marginTop:"30px"}}>Involucrados</h5>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}> No hay Involucrados encontrados..</p>
                            <h4 id="item-2">Evidencia</h4>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}> No hay aportes de evidencia encontrada..</p>
                            <h4 id="item-3">Validación</h4>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <h5 id="item-3-1">Evidencia de usuarios</h5>
                            <div style={{backgroundColor:"#e3f2fd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:"20px",paddingRight:"20px",borderRadius:"20px"}}>
                                <b>Ingreso de evidencia oficial </b>
                                <p>La evidencia que coloca la municipalidad posee un check de oficial.</p>
                                <button className="btn btn-dark mb-3 rounded-pill">Solicitar</button>
                            </div>
                            {
                              (imageUrls.length>0)?imageUrls.map((url,index) => {
                                if (index==0){
                                  return <div className="w-100 mt-2">
                                    <img src={url} style={{height:"300px",borderRadius:"20px",marginBottom:"20px"}} />
                                    <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>{ev1}</p>
                                  </div>     
                                }else if(index==1){
                                  return <div className="w-100">
                                    <img src={url} style={{height:"300px",borderRadius:"20px",marginBottom:"20px"}} />
                                    <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>{ev2}</p>
                                  </div>  
                                }else if(index==2){
                                  return <div className="w-100">
                                    <img src={url} style={{height:"300px",borderRadius:"20px",marginBottom:"20px"}} />
                                    <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>{ev3}</p>
                                  </div>  
                                }
                                console.log(index)
                                                        
                              }):(<p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}> No hay aportes de evidencia encontrada..</p>)
                            }
                            <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={(faltaEvidencia=="true"?true:false)} onChange={()=>{
                              if(faltaEvidencia==""){
                                setFaltaEvidencia("true")
                              }else if(faltaEvidencia=="true"){
                                setFaltaEvidencia("false")
                              }else if (faltaEvidencia=="false"){
                                setFaltaEvidencia("true")
                              }else{
                                setFaltaEvidencia("true")
                              }
                              console.log(faltaEvidencia)
                            }}/>
                            <label class="form-check-label" for="flexSwitchCheckDefault">Falta evidencia?</label>
                            </div>
                            <div class="input-group mt-3 mb-3">
                                <span class="input-group-text"><b>Comentarios</b></span>
                                <textarea class="form-control" aria-label="With textarea" value={comentariosAdmin} onChange={(e)=>{setComentariosAdmin(e.target.value)}}></textarea>
                            </div>
                            <h5 id="item-3-2">Comentarios de municipalidad</h5>
                            <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={(validacion=="true")?true:false}  onChange={()=>{
                              if(validacion==""){
                                setValidacion("true")
                              }else if(validacion=="true"){
                                setValidacion("false")
                              }else if (validacion=="false"){
                                setValidacion("true")
                              }else{
                                setValidacion("true")
                              }
                              console.log(validacion)
                            }
                            }/>
                            <label class="form-check-label" for="flexSwitchCheckDefault">Es válido?</label>
                            </div>
                            <div class="input-group mt-3 mb-3">
                                <span class="input-group-text"><b>Descripción de evidencia</b></span>
                                <textarea class="form-control" aria-label="With textarea" value={mensajeValidacion} onChange={(e)=>{setMensajeValidaciion(e.target.value)}}></textarea>
                            </div>
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                                <a href="/dashboard"><button className="btn btn-secondary mb-5 rounded-pill" style={{marginRight:"20px"}}>Cancelar</button></a>
                                <button className="btn btn-primary mb-5 rounded-pill" onClick={
                                  ()=>{
                                    validar()
                                    window.location.pathname="/dashboard"
                                  }
                                }>Publicar</button>
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}