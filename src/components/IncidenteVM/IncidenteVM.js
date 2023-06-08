import { getDatabase, ref, child, set, get, onValue } from "firebase/database";
import { getDbData } from "../backend/db";
import { incidente } from "../entities/incidente";
import {incidenteValidado} from "../entities/validacion";

const database = getDbData();

export const getIncidentesDb= async(setIncidente)=>{
  const resp = await fetch(`http://localhost:5555/incidente`)
  const data= await resp.json()
  console.log("incidentes")
  console.log(data)
  let incidentesList = new Array(data.length).fill(0).map((_,index)=>{
    let validacion = (data[index].validacion!=null)? data[index].validacion.validacion : "false"

    let inc = new incidente(
      data[index].incidente_id,
      data[index].user,
      data[index].titulo,
      data[index].descripcion,
      data[index].tipo,
      data[index].lugar,
      data[index].fecha,
      data[index].lat,
      data[index].lng,
      data[index].descripcionCompleta,
      data[index].evidencia1,
      data[index].evidencia2,
      data[index].evidencia3,
      data[index].user_id,
      validacion
    )
    return inc
  })
  setIncidente(incidentesList)
}

export const getIncidenteDb= async(setIncidente,incidenteId)=>{
  const resp = await fetch(`http://localhost:5555/incidente`)
  const data= await resp.json()
  console.log("incidentes")
  console.log(data)
  console.log(incidenteId)
  for(let index=0;index<data.length;index++){
    if(data[index].incidente_id==incidenteId){
      console.log("encontre")
      let validacion = (data[index].validacion!=null)? data[index].validacion.validacion : "false"

      let obj = new incidente(
        data[index].incidente_id,
        data[index].user,
        data[index].titulo,
        data[index].descripcion,
        data[index].tipo,
        data[index].lugar,
        data[index].fecha,
        data[index].lat,
        data[index].lng,
        data[index].descripcionCompleta,
        data[index].evidencia1,
        data[index].evidencia2,
        data[index].evidencia3,
        data[index].user_id,
        validacion
      )
      setIncidente(obj)
    }
  }
  
}

export const getIncidentesAdminDb= async(setIncidente)=>{
  const resp = await fetch(`http://localhost:5555/incidente`)
  const data= await resp.json()
  console.log("incidentes")
  console.log(data)
  let incidentesList = new Array(data.length).fill(0).map((_,index)=>{

    let validacion = (data[index].validacion!=null) ? data[index].validacion.validacion : "false";
    let comentariosAdmin = (data[index].validacion!=null) ? data[index].validacion.comentariosAdmin : "";
    let mensajeValidacion = (data[index].validacion!=null) ? data[index].validacion.mensajeValidacion : "";
    let faltaEvidencia = (data[index].validacion!=null)? data[index].validacion.faltaEvidencia : "false"

    let inc = new incidenteValidado(
      data[index].incidente_id,
      data[index].user,
      data[index].titulo,
      data[index].descripcion,
      data[index].tipo,
      data[index].lugar,
      data[index].fecha,
      data[index].lat,
      data[index].lng,
      data[index].descripcionCompleta,
      data[index].evidencia1,
      data[index].evidencia2,
      data[index].evidencia3,
      data[index].user_id,
      validacion,
      validacion,
      comentariosAdmin,
      mensajeValidacion,
      faltaEvidencia
    )
    return inc
  })
  setIncidente(incidentesList)
  
}

export const getIncidenteAdminDb= async(setIncidente,incidenteId)=>{
  const resp = await fetch(`http://localhost:5555/incidente`)
  const data= await resp.json()
  console.log("incidentes")
  console.log(data)
  console.log(incidenteId)
  for(let index=0;index<data.length;index++){
    if(data[index].incidente_id==incidenteId){
      console.log("encontre")

      let validacion = (data[index].validacion!=null) ? data[index].validacion.validacion : "false";
    let comentariosAdmin = (data[index].validacion!=null) ? data[index].validacion.comentariosAdmin : "";
    let mensajeValidacion = (data[index].validacion!=null) ? data[index].validacion.mensajeValidacion : "";
    let faltaEvidencia = (data[index].validacion!=null)? data[index].validacion.faltaEvidencia : "false"

    let obj = new incidenteValidado(
      data[index].incidente_id,
      data[index].user,
      data[index].titulo,
      data[index].descripcion,
      data[index].tipo,
      data[index].lugar,
      data[index].fecha,
      data[index].lat,
      data[index].lng,
      data[index].descripcionCompleta,
      data[index].evidencia1,
      data[index].evidencia2,
      data[index].evidencia3,
      data[index].user_id,
      validacion,
      validacion,
      comentariosAdmin,
      mensajeValidacion,
      faltaEvidencia
    )
      setIncidente(obj)
    }
  }
  
}

export const setIncidentesDb = async(incidente)=>{
  try{
    console.log(incidente)
    const resp = await fetch(`http://localhost:5555/incidente`, {   
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(incidente),
    });
    const data = await resp.json()
    console.log(data.id)
    if(data.id.length>0){
      sessionStorage.setItem("incidente_id",data.id)
    }
  }catch({name,message}){
    console.log(name+" "+message)
  }
  
}


export const setIncidentesCompletoDb = async(incidente)=>{
  try{
    console.log(incidente)
    const resp = await fetch(`http://localhost:5555/incidente_modificar`, {   
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(incidente),
    });
  }catch({name,message}){
    console.log(name+" "+message)
  }
  
}

export const validarDb=async(incidente)=>{
  try{
    console.log(incidente)
    
    if(incidente.validacion_id!=null || incidente.validacion_id!="" || incidente.validacion_id.length>0){
      const resp = await fetch(`http://localhost:5555/validacion`, {   
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(incidente),
      });
    }else{
      const resp = await fetch(`http://localhost:5555/validacion_modificar`, {   
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(incidente),
    });
    }
    
  }catch({name,message}){
    console.log(name+" "+message)
  }
}

export const deleteIncidente=async(id)=>{
  try{
    const resp = await fetch(`http://localhost:5555/incidente_borrar`, {   
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  }catch({name,message}){
    console.log(name+message)
  }
}


