import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Button from "react-bootstrap/Button"

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";


import { incidentCardListView } from "./components/incidentCard";

import { TopIncidentesListView } from "./components/topIncidentes";
import validadoFiltro from "./components/validadoFiltro";
import userManager from "../../IncidenteVM/userManager";

export default function ListaIncidentes(props){
    const db = props.db
    const incidenteGetter = new userManager().factoryMethod();

    let user = sessionStorage.getItem("loggedUser");
    sessionStorage.setItem("incidente","");

    const [seccion,setSeccion]=useState("validado")

    const [incidentes,setIncidentes]=useState({});

    useEffect(()=>{
        incidenteGetter.getIncidentes(setIncidentes)
    },[])

      
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
            let incidentesDisplay=Array(incidentes.length)
            if(seccion=="validado"){
                incidentesDisplay = Array(incidentesKeys.length).fill(0).map((_,index)=>{
                    let i = sorted[index].key
                    console.log(i)
                    console.log(incidentes[i])
                    console.log(incidentes[i].descripcion)
                    if(incidentes[i].descripcionCompleta.length>0){
                        isNotEmpty=true
                        console.log(incidentes[i].descripcionCompleta)
                        if(incidentes[i].validacion_status=="true"){
                            return (
                                incidentCardListView(incidentes[i].titulo,incidentes[i].descripcion,incidentes[i].tipo,incidentes[i].user,incidentes[i].fecha,incidentes[i].descripcionCompleta,incidentes[i].validacion_status,incidentes[i].incidente_id)
                            )
                        }
                        
                    }
                    
                })
            }else{
                incidentesDisplay = Array(incidentesKeys.length).fill(0).map((_,index)=>{
                    let i = sorted[index].key
                    console.log(i)
                    console.log(incidentes[i])
                    console.log(incidentes[i].descripcion)
                    if(incidentes[i].descripcionCompleta.length>0){
                        isNotEmpty=true
                        console.log(incidentes[i].descripcionCompleta)
                        if(incidentes[i].validacion_status!="true"){
                            return (
                                incidentCardListView(incidentes[i].titulo,incidentes[i].descripcion,incidentes[i].tipo,incidentes[i].user,incidentes[i].fecha,incidentes[i].descripcionCompleta,incidentes[i].validacion_status,incidentes[i].incidente_id)
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
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" style={{borderRadius:"20px",paddingTop:"20px"}}>
                {TopIncidentesListView(incidentes)}
                {validadoFiltro(setSeccion)}
                {showIncidentes()}
            </div>
        </div>
    )
}