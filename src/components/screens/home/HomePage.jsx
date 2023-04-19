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

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

export default function HomePage(props){
    const db = props.db

    let user = sessionStorage.getItem("loggedUser");
    sessionStorage.setItem("incidente","");

    const [incidentes,setIncidentes]=useState({});
    const [sortedIncident,setSortedIncident]=useState([])

    const [showSideBar, setShowSideBar]=useState(true)
    const [currentLat,setCurrentLat]=useState("-12.142500")
    const [currentLng,setCurrentLng]=useState("-77.006126")
    const [address,setAddress]=useState("")
    const [filter,setFilter]=useState("")
    const [tipoIncidente,setTipoIncidente]=useState("")
    const [titulo,setTitulo]=useState("");
    const [descripcionIncidente,setDescripcionIncidente]=useState("")
    const [value, onChangeDate] = useState(new Date());

    const [click,setClick]=useState(false)

    const [images, setImages] = React.useState([]);
    const maxNumber = 4;

    function writeIncidente(name, titulo, descripcion, tipo, lugar, fecha,lat,lng) {
      
      set(ref(db, 'posts/' + titulo), {
        user: name,
        titulo: titulo,
        descripcion : descripcion,
        tipo:tipo,
        lugar: lugar,
        fecha: fecha,
        lat:lat,
        lng:lng,
        descripcionCompleta:"",
        evidencia1:"",
        evidencia2:"",
        evidencia3:""
      });
    }

    function getData(userId){
      const dbRef = ref(db);
      get(child(dbRef, `posts/`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    function getIncidentes(){
      const dbRef = ref(db);
      get(child(dbRef, `posts/`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setIncidentes(snapshot.val());
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
      const sorted= []
            Object.keys(incidentes).forEach((incidente)=>{
                sorted.push({
                    key: incidente,
                    value: new Date(incidentes[incidente].fecha)
                })
            })
            sorted.sort((a, b) => b.value - a.value)
            setSortedIncident(sorted)
            console.log(sortedIncident)
    },[incidentes])

    useEffect(()=>{
      console.log(getData("1"))
      console.log(props.user)
    },[])

    useEffect(()=>{
      console.log(value)
    },[value])


    const onChangeImage = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

  const defaultProps = {
    center: {
      lat: -12.142500,
      lng: -77.006126
    },
    zoom: 16
  };

  const OPTIONS = {
    minZoom: 16,
    maxZoom: 20
  }

  Geocode.setApiKey("AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");


  useEffect(()=>{
    Geocode.fromLatLng(currentLat, currentLng).then(
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
  },[currentLat,currentLng])

  useEffect(()=>{
    console.log(currentLat)
  },[currentLat])

  function incidentMinimized(titulo,fecha,descripcion){
    let shortDescription = String(descripcion).substring(0,40)+"...";
    let fechaCorta= `${new Date(fecha).toLocaleDateString()} ${new Date(fecha).toLocaleTimeString()}`
    return(
        <div className="mt-3 mb-3 d-flex flex-row" style={{width:"90%",marginRight:"auto",marginLeft:"auto"}}>
                <div>
                    <img src={require("../../images/robbery.jpg")} style={{height:"100px",width:"100px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                    <p className="mr-2 mt-2">
                        <i>{fechaCorta}</i>
                    </p>
                </div>
                <div className="w-75 mr-2">
                    <b>{titulo}</b>
                    <p style={{textAlign:"justify"}}>{shortDescription}</p>
                    <div className="w-100 d-flex flex-row justify-content-end">
                      <a href="/incidente"><button className="btn btn-primary rounded-pill" onClick={()=>{
                        sessionStorage.setItem("incidente",titulo)
                      }}>Ver más</button></a>
                    </div>
                </div>
            </div>
    )
  }
  const SideMenu = props =>{
    return(
        <div className="d-flex flex-row align-items-center justify-content-center" style={{position:"absolute",zIndex:"2",right:(showSideBar)?"0":"-330px",top:"150px"}} >
            <div style={{backgroundColor:"#1976d2",padding:"10px",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",filter:"drop-shadow(2px 1px 5px gray)"}} > 
                <button style={{border:"none",backgroundColor:"transparent",color:"white"}} onClick={()=>{
                    setShowSideBar(!showSideBar)
                    }}>
                    {(showSideBar)?">":"<"}
                </button>
            </div>
            <div className="d-flex flex-column justify-content-center" style={{backgroundColor:"white",filter:"drop-shadow(2px 1px 5px gray)",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",padding:"20px",minWidth:"400px"}}>
                <b style={{width:"100%",textAlign:"center",marginBottom:"20px"}}>
                    Incidentes recientes
                    <a href="/lista-incidentes"><img src={require("../../icons/next.png")} style={{width:"20px",height:"20px",marginLeft:"10px"}}/></a>
                </b>
                {(sortedIncident.length==0)?<p style={{width:"100%",textAlign:"center"}}>No hay incidentes recientes</p>:Array(2).fill(0).map((_,index)=>{
                  let i = sortedIncident[index].key
                  return incidentMinimized(incidentes[i].titulo,incidentes[i].fecha,incidentes[i].descripcion)
                })}
            </div>
        </div>
    )
  }

  const BottomMenu=props=>{
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-row justify-content-between" style={{position:"absolute",bottom:"0",zIndex:2,width:"80%",textAlign:"center",backgroundColor:"white",padding:"20px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",filter:"drop-shadow(1px 0px 5px gray)"}} id="bottomMenu">
                <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img src={require("../../icons/location.png")} style={{width:"20px",marginRight:"20px"}}/> 
                    <button type="button" className="btn" style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px",textAlign:"start",width:"100%",height:"70px",overflow:"scroll"}} data-bs-toggle="modal" data-bs-target="#direccionInfo">
                      {address}
                    </button>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <div style={{backgroundColor:"white",marginTop:"-50px",padding:"20px",borderRadius:"100px"}}>
                    <button className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:"#ffcdd2",borderRadius:"100px",height:"70px",width:"70px",color:"#c62828",fontSize:"20px",border:"none",fontSize:"30px"}} id="addIncidente" data-bs-toggle="modal" data-bs-target="#AgregarIncidente"><b>+</b></button>
                    </div>
                    <span className="d-flex flex-row align-items-center"><img src={require("../../icons/alert.png")}  style={{width:"20px",marginRight:"10px"}}/> <b>Añadir incidente</b></span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img src={require("../../icons/filter.png")} style={{width:"20px",marginRight:"20px"}}/>
                    <div className="d-flex flex-row justify-content-between" style={{backgroundColor:"#eeeeee",borderRadius:"20px",width:"100%"}}>
                        <button style={{padding:"15px",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",border:"none",textAlign:"center",width:"100%",borderRight:"1px solid lightgray"}} id="filter" data-bs-toggle="modal" data-bs-target="#TipoModal" onClick={()=>{props.setFilter("tipo")}}> Tipo </button>
                        <button style={{border:"none",padding:"15px",textAlign:"center",width:"100%",borderRight:"1px solid lightgray"}} id="filter" data-bs-toggle="modal" data-bs-target="#FechaModal" onClick={()=>{props.setFilter("fecha")}}>Fecha</button>
                        <button style={{padding:"10px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px",border:"none",textAlign:"center",width:"100%",border:"none"}} id="filter" data-bs-toggle="modal" data-bs-target="#FrecuenciaModal" onClick={()=>{
                          props.setFilter("frecuencia")
                          }}>Frecuencia</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }

   const Marker = props => {
    return (
      <OverlayTrigger trigger="hover" placement="right" overlay={(!props.miMark)?(
        <Popover id="popoverMap">
        <p><b>Nombre incidente</b> </p>
        <p style={{color:"gray"}}><i>Publicado por Andrés Sato</i></p>
        <p>{props.fecha}</p>
      </Popover>):(<p></p>)
      }>
    
    <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px",marginTop:"-60px"}}>
        <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
            <img src={require("../../icons/location.png")} style={{width:"15px",filter:"invert(100%)",marginRight:"2px",display:(props.miMark)?"inline block":"none"}}/><b>{props.text}</b>
        </span>
        <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
            {props.fecha}<button id="markerButton" style={{display:(props.miMark)?"none":"block"}}>Ver más</button>
        </span>
        <div style={{width:"0",height:"0",borderLeft:"0px solid transparent",borderRight:"15px solid transparent",borderTop:(props.miMark)?"10px solid #1976d2":"10px solid #f44336"}}></div>
    </div>
     
    </OverlayTrigger>
    )
  }

  function FilterTipo() {
    return(
      <div className="modal fade" id="TipoModal" tabIndex="-1" aria-labelledby="TipoModalAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Tipo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                  {
                    Array(10).fill(0).map((_,index)=>{
                      return (
                      <div className="col-lg-4 d-flex flex-row justify-content-center">
                        <button className="btn mt-2" style={{backgroundColor:"#f5f5f5",borderRadius:"20px"}}>Robo</button>
                      </div>
                      )
                    })
                  }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                setFilter("fecha")
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function FilterFecha() {
    return(
      <div className="modal fade" id="FechaModal" tabindex="-1" aria-labelledby="FechaModalAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Fecha</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
              <b>Incidentes cerca a: </b>
              <p style={{backgroundColor:"#f5f5f5",padding:"10px",borderRadius:"20px",marginTop:"10px"}}>{address}</p>
              </div>
              <div className="mt-3 mb-3 w-100 d-flex flex-row justify-content-between" >
                <b>Tiempo del incidente</b>
                <DateTimePicker onChange={onChangeDate} value={value} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                setFilter("fecha")
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function FilterFrecuencia(){
    return(
      <div className="modal fade" id="FrecuenciaModal" tabindex="-1" aria-labelledby="FrecuenciaModalAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Frecuencia</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <b>Lugar con mayor frecuencia de:</b>
              <div className="row mt-3">
                  {
                    Array(10).fill(0).map((_,index)=>{
                      return (
                        <div className="col-lg-4 d-flex flex-row justify-content-center">
                        <button className="btn mt-2" style={{backgroundColor:"#f5f5f5",borderRadius:"20px"}}>Robo</button>
                    </div>
                      )
                    })
                  }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                setFilter("fecha")
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function direccionInfo() {
    return(
      <div className="modal fade" id="direccionInfo" tabindex="-1" aria-labelledby="direccionInfoAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cambiar dirección</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <p>Si desea cambiar de dirección puede hacer click en la dirección deseada. Esta señalizada por un marcador azúl con el nombre "Mi posición".</p>
                <p style={{padding:"10px",backgroundColor:"#f5f5f5",borderRadius:"20px"}}>La dirección señalizada en el mapa es <b>{address}</b></p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function AgregarIncidente() {
    return(
      <div className="modal fade" id="AgregarIncidente" tabindex="-1" aria-labelledby="AgregarIncidenteAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar incidencia</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <b style={{marginRight:"10px"}}>Tipo de incidente</b>
              <div className="btn-group dropend mb-3">
              <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#eeeeee",color:"black"}}>
                {(tipoIncidente=="")?"Seleccionar tipo":tipoIncidente}
              </button>
                <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Robo")}}>Robo</a></li>
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Crimen")}}>Crimen</a></li>
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Acoso")}}>Acoso</a></li>
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Pérdida")}}>Pérdida</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item">Otro</a></li>
                </ul>
              </div>
              <div>
              <b>Lugar de incidente: </b>
              <button style={{backgroundColor:"#f5f5f5",padding:"10px",borderRadius:"20px",marginTop:"10px",textAlign:"left",border:"none"}} data-bs-dismiss="modal">{address}</button>
              </div>
              <div className="input-group mt-3">
                <span className="input-group-text"><b>Titulo de incidente</b></span>
                <input type="text" className="form-control" placeholder="... " aria-label="Titulodeincidente" aria-describedby="basic-addon1" onChange={(e)=>{setTitulo(e.target.value)}}></input>
              </div>
              <div className="input-group mt-3">
                <span className="input-group-text"><b>Descripción breve</b></span>
                <textarea className="form-control" aria-label="With textarea" onChange={(e)=>{setDescripcionIncidente(e.target.value)}}></textarea>
              </div>
              <div className="mt-3 mb-3 w-100 d-flex flex-row justify-content-between" >
                <b>Tiempo del incidente</b>
                <DateTimePicker onChange={onChangeDate} value={value} />
              </div>
              


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
                setTipoIncidente("")
                onChangeDate(new Date())
                setTitulo("")
                setDescripcionIncidente("")
                onChangeImage([])
                }}>Cancelar</button>
              <a href="/agregar"><button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                if(tipoIncidente!="" && value!="" && titulo!="" && descripcionIncidente!="" ){
                  writeIncidente(user,titulo,descripcionIncidente,tipoIncidente,address,value.toString(),currentLat,currentLng)
                  sessionStorage.setItem("incidente",titulo)
                }
              }}>Continuar</button></a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  
  useEffect(()=>{
    console.log(filter)
  },[filter])

  return (
    // Important! Always set the container height explicitly
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{height:"100vh",width:"100%",minWidth:"1200px",minHeight:"800px",backgroundColor:"#eeeeee",zIndex:"0"}}>
       <div style={{height:"100vh",width:"100%",zIndex:"1",position:"absolute"}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={(e)=>
              {
                if(!click){
                  setCurrentLat(e.lat)
                  setCurrentLng(e.lng)
                }
              }
          }
          options={OPTIONS}
        >
          <Marker lat={-12.138500} lng={-77.016126} text="Robo" fecha="10/04 03:55 pm" onClick={()=>{console.log("hola")}}/>
          <Marker lat={-12.140500} lng={-77.015126} text="Acoso" fecha="10/04 04:55 pm"/>
          <Marker lat={-12.138800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
          <Marker lat={-12.148800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
          <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
          <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
          <Marker lat={currentLat} lng={currentLng} text="Mi posición" miMark={true}/>
          
        </GoogleMapReact>
        <div style={{ height: '100vh', width: '100%',zIndex:"2"}}>
        <HeaderTopMenu setUser={props.setUser}/>
        <BottomMenu setFilter={setFilter}/>
        <SideMenu/>
      </div>
      </div>

        {FilterTipo()}
        {FilterFecha()}
        {FilterFrecuencia()}
        {AgregarIncidente()}
        {direccionInfo()}
      
    </div>
    
  );

  
}