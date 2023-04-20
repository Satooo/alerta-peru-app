import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Button from "react-bootstrap/Button"

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import { getIncidentes2 } from "../../../IncidenteVM/IncidenteVM";

import { incidentCardListView } from "./components/incidentCard";

import { TopIncidentesListView } from "./components/topIncidentes";

export default function ListaIncidentes(props){
    const db = props.db

    let user = sessionStorage.getItem("loggedUser");
    sessionStorage.setItem("incidente","");

    const [incidentes,setIncidentes]=useState({});

    useEffect(()=>{
        getIncidentes2(setIncidentes)
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
            let incidentesDisplay = Array(incidentesKeys.length).fill(0).map((_,index)=>{
                let i = sorted[index].key
                console.log(i)
                console.log(incidentes[i].descripcion)
                if(incidentes[i].descripcionCompleta.length>0){
                    isNotEmpty=true
                    return (
                        incidentCardListView(incidentes[i].titulo,incidentes[i].descripcion,incidentes[i].tipo,incidentes[i].user,incidentes[i].fecha,incidentes[i].descripcionCompleta)
                    )
                }
                
            })
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
                <TopIncidentesListView/>
                {showIncidentes()}
            </div>
        </div>
    )
}