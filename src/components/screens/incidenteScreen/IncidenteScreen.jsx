import React, { useState,useEffect } from "react";
import Header from "../common/Header";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";


export default function IncidenteScreen(props){
  let user = sessionStorage.getItem("loggedUser")
  let incidente = sessionStorage.getItem("incidente")

    const [address,setAddress]=useState("");
    const [lat,setLat]=useState("");
    const [lng,setLng]=useState("");
    const [titulo,setTitulo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [tipo,setTipo]=useState("");
    const [fecha,setFecha]=useState("");
    const [autor,setAutor]=useState("");
    const [descripcionComp,setDescripcionComp]=useState("")

    const db = props.db

    const defaultProps = {
        center: {
          lat: -12.138500,
          lng: -77.016126
        },
        zoom: 16
      };
    
      const OPTIONS = {
        minZoom: 16,
        maxZoom: 20,
        disableDefaultUI: true
      }

      function getIncidenteData(titulo){
        const dbRef = ref(db);
        get(child(dbRef, `posts/`+titulo)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setAutor(snapshot.val().user)
            setTitulo(snapshot.val().titulo);
            setDescripcion(snapshot.val().descripcion);
            setFecha(snapshot.val().fecha)
            setTipo(snapshot.val().tipo);
            setDescripcionComp(snapshot.val().descripcionCompleta);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }


      useEffect(()=>{
        
        if(incidente.length>0){
          getIncidenteData(incidente)
        }
      },[])

      Geocode.setApiKey("AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
      
      useEffect(()=>{
        Geocode.fromLatLng("-12.138500"," -77.016126").then(
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
      },[])

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
                {props.fecha}<button id="markerButton" style={{display:(props.miMark)?"none":"block"}}>Ver más</button>
            </span>
            <div style={{width:"0",height:"0",borderLeft:"0px solid transparent",borderRight:"15px solid transparent",borderTop:(props.miMark)?"10px solid #1976d2":"10px solid #f44336"}}></div>
        </div>
         
        )
      }

    return(
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center mb-5" style={{borderRadius:"20px",paddingTop:"20px"}}>
                <div style={{position:"relative",textAlign:"center",width:"100%"}}>
                    <img src={require("../../images/loginBackground.jpg")} style={{width:"100%",maxHeight:"300px",objectFit:"cover",borderTopRightRadius:"20px",borderTopLeftRadius:"20px",filter:"brightness(0.5)"}}/>
                    <div style={{position:"absolute",top:"30%",width:"100%",color:"white"}}>
                        <h1>{(titulo!="")?titulo:"Nombre incidente x"}</h1>
                        <div className="mt-3">
                            <p><span>Fecha de incidente: {(fecha!="")?fecha:"12/04 3:00pm"}</span></p>
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
                            <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabindex="0">
                            <h4 id="item-1">Información general</h4>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>
                            {(descripcion!="")?descripcion:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ."}
                            </p>
                            <h5 id="item-1-1">Descripción</h5>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>
                            {(descripcionComp!="")?descripcionComp:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}
                            </p>
                            <h5 id="item-1-2">Ubicación</h5>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}>
                                {address}
                            </p>
                            <div style={{height:"300px",width:"800px"}}>
                                <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI" }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                options={OPTIONS}
                                >
                                <Marker lat={-12.138500} lng={-77.016126} text="Robo" fecha="10/04 03:55 pm" onClick={()=>{console.log("hola")}}/>
                                <Marker lat={-12.140500} lng={-77.015126} text="Acoso" fecha="10/04 04:55 pm"/>
                                <Marker lat={-12.138800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
                                <Marker lat={-12.148800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
                                <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
                                <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
                                
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
                                <b>Conoce este caso? </b>
                                <p>Solicite acceso para proveer evidencia y validar el incidente.</p>
                                <button className="btn btn-dark mb-3 rounded-pill">Solicitar</button>
                            </div>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px",marginTop:"20px"}}> No hay aportes de otros usuarios..</p>
                            <h5 id="item-3-2">Comentarios de municipalidad</h5>
                            <p style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px"}}> No se ha valido..</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}