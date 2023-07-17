import "./styles/dashboard.css"
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
import HeaderAdminMap from "../common/HeaderAdminMap";
import HeaderAdmin from "../common/HeaderAdmin";

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";


import { incidentCardAdmin } from "./components/incidentCard";

import { TopIncidentes } from "./components/topIncidentes";

import { Secciones } from "./components/secciones";

import { solicitarEvidencia } from "./components/solicitarEvidencia";

import { filterSection } from "./components/filterSection";
import adminManager from "../../IncidenteVM/adminManager";

export default function Dashboard(props){
    const db = props.db
    const incidentesGetter = new adminManager().factoryMethod();

    const [seccion,setSeccion]=useState("atendidos")
    const [filter,setFilter]=useState("")

    sessionStorage.setItem("incidente","");
    let user = sessionStorage.getItem("loggedUser");

    const [incidentes,setIncidentes]=useState({});

    useEffect(()=>{
        //getIncidentesAdmin2(setIncidentes)
        //getIncidentesAdminDb(setIncidentes)
        incidentesGetter.getIncidentes(setIncidentes)
    },[])

    useEffect(()=>{
        console.log(incidentes)
    },[incidentes])

    
    function showIncidentes(){
        if(Object.keys(incidentes).length>0){
            const sorted= []
            Object.keys(incidentes).forEach((incidente)=>{
                sorted.push({
                    key: incidente,
                    value: new Date(incidentes[incidente].fecha)
                })
            })
            sorted.sort((a, b) => b.value - a.value)
            console.log(sorted)
            let isNotEmpty=false
            let incidentesKeys=Object.keys(incidentes)
            let incidentesDisplay= Array(incidentesKeys.length)
            if(seccion=="atendidos"){
                incidentesDisplay = Array(incidentesKeys.length).fill(0).map((_,index)=>{
                    let i = sorted[index].key
                    console.log(incidentes[i].descripcion)
                    if(incidentes[i].descripcionCompleta.length>0){
                        isNotEmpty=true
                        if(incidentes[i].validacion_status=="true"){
                            return (
                                incidentCardAdmin(incidentes[i].titulo,incidentes[i].descripcion,incidentes[i].tipo,incidentes[i].user,incidentes[i].fecha,incidentes[i].validacion,incidentes[i].incidente_id)
                            )
                        }
                    }
                    
                })
            }else{
                incidentesDisplay = Array(incidentesKeys.length).fill(0).map((_,index)=>{
                    let i = sorted[index].key
                    console.log(incidentes[i].descripcion)
                    if(incidentes[i].descripcionCompleta.length>0){
                        isNotEmpty=true
                        if(incidentes[i].validacion_status!="true"){
                            return (
                                incidentCardAdmin(incidentes[i].titulo,incidentes[i].descripcion,incidentes[i].tipo,incidentes[i].user,incidentes[i].fecha,incidentes[i].validacion,incidentes[i].incidente_id)
                            )
                        }
                    }
                    
                })
            }
            
            if(isNotEmpty){
                return incidentesDisplay
            }else{
                return <p>
                    No hay incidentes actualmente
                </p>
            }
            
        }
        
    }
    
    return (
        <div className="container-fluid d-flex flex-column no-padding" id="dashboard-div">
            <HeaderAdmin/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" id="dashboard-div-div">
                {TopIncidentes(incidentes)}
                {Secciones(setSeccion)}
                {showIncidentes()}
            </div>
            {solicitarEvidencia()}
        </div>
    )

}