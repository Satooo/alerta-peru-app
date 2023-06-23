import "./styles/Homepage.css"
import React from "react";
import { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import DateTimePicker from 'react-datetime-picker';
import ImageUploading from 'react-images-uploading';
import { createPopper } from '@popperjs/core';
import HeaderTopMenu from "../common/HeaderTopMap";
import { FilterFecha,FilterTipo,FilterFrecuencia } from "./components/filters";
import { incidentCard } from "./components/incidentCard";
import { SideMenu } from "./components/sideMenu";
import { BottomMenu } from "./components/bottomMenu";
import {AgregarIncidente} from "./components/agregarIncidente"
import { direccionInfo } from "./components/direccionInfo";
import { Marker } from "./components/marker";
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import { incidente } from "../../entities/incidente";
import userManager from "../../IncidenteVM/userManager";
import generalImpl from "../../IncidenteVM/generalImpl";

export default function HomePage(props){

  const incidentesGetter = new userManager().factoryMethod();
  const incidentesSetter = new generalImpl();

    let user = sessionStorage.getItem("loggedUser");

    const [incidentes,setIncidentes]=useState({});
    const [sortedIncident,setSortedIncident]=useState([])
    const [sortedIncident2,setSortedIncident2]=useState([])

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

    const maxNumber = 4;

    const [incidentes2,setIncidentes2]=useState([]);

    const [newIncidente,setNewIncidente]=useState(new incidente)

    useEffect(()=>{
      //getIncidentes2(setIncidentes2)
      //getIncidentesDb(setIncidentes2)
      incidentesGetter.getIncidentes(setIncidentes2)
      console.log(sessionStorage.getItem("user_id"))
    },[])

    useEffect(()=>{
      console.log(incidentes2)
    },[incidentes2])

    
    useEffect(()=>{
      //getIncidentes3(setIncidentes)
    },[])

    useEffect(()=>{
      console.log(incidentes2)
      const sorted= []
            Object.keys(incidentes2).forEach((incidente)=>{
                sorted.push({
                    key: incidente,
                    value: new Date(incidentes2[incidente].fecha)
                })
            })
            sorted.sort((a, b) => b.value - a.value)
            console.log(sorted)
            setSortedIncident2(sorted)
    },[incidentes2])

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
    setNewIncidente(
      new incidente(
        "",
        user,
        titulo,
        descripcionIncidente,
        tipoIncidente,
        address,
        (value!==null) ? value.toString() : Date().toString(),
        currentLat,
        currentLng,
        "",
        "",
        "",
        "",
        sessionStorage.getItem("user_id")
      )
    )
    console.log(newIncidente)
    //sessionStorage.setItem("incidente_id","")
  },[titulo,descripcionIncidente,currentLat,currentLng,address,value,tipoIncidente])

  useEffect(()=>{
    console.log(newIncidente)
  },[newIncidente])
  
  return (
    // Important! Always set the container height explicitly
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" id="homepage-div">
       <div id="homepage-div-div1">
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
          {Array(incidentes2.length).fill(0).map((_,i)=>{
            if(incidentes2[i].validacion_status=="true"){
              return <Marker lat={incidentes2[i].lat} lng={incidentes2[i].lng} text={incidentes2[i].tipo} fecha={new Date(incidentes2[i].fecha).toLocaleDateString() } titulo={incidentes2[i].titulo} user={incidentes2[i].user} id={incidentes2[i].incidente_id} hora={new Date(incidentes2[i].fecha).toLocaleTimeString() }/>
            }
          })}
          <Marker lat={currentLat} lng={currentLng} text="Mi posición" miMark={true}/>
          
        </GoogleMapReact>
          <div id="homepage-div-div2">
            <HeaderTopMenu setUser={props.setUser}/>
            {BottomMenu(setFilter,address,user)}
            {SideMenu(showSideBar,setShowSideBar,incidentes2,sortedIncident2,incidentCard)}
          </div>
      </div>

        {FilterTipo(setFilter)}
        {FilterFecha(address,value,onChangeDate,setFilter)}
        {FilterFrecuencia(setFilter)}
        {AgregarIncidente(setTitulo,setTipoIncidente,setDescripcionIncidente,value,onChangeDate,newIncidente,incidentesSetter.setIncidentes,user)}
        {direccionInfo(address)}
      
    </div>
    
  );

  
}