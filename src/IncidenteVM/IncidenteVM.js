import { getDatabase, ref, child, set, get, onValue } from "firebase/database";
import { getDbData } from "../components/backend/db";
import { incidente } from "../components/entities/incidente";
import {incidenteValidado} from "../components/entities/validacion";

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

export function getIncidentes2(setXd){
    const dbRef = ref(database);
    console.log("miraaaa")
    get(child(dbRef, `posts/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let keys = Object.keys(snapshot.val());
        let obj = snapshot.val();
        let incidentesList = new Array(keys.length).fill(0).map((_,index)=>{
            let inc = new incidente(
                obj[keys[index]].user,
                obj[keys[index]].titulo,
                obj[keys[index]].descripcion,
                obj[keys[index]].tipo,
                obj[keys[index]].lugar,
                obj[keys[index]].fecha,
                obj[keys[index]].lat,
                obj[keys[index]].lng,
                obj[keys[index]].descripcionCompleta,
                obj[keys[index]].evidencia1,
                obj[keys[index]].evidencia2,
                obj[keys[index]].evidencia3,
            )
            console.log(inc)
            return inc
        })
        if(incidentesList.length==0){
            console.log("vacio")
        }else{
            console.log(incidentesList)
        }
        setXd(incidentesList)
       
      } else {
        console.log("No data available");
        return "No data"
      }
    }).catch((error) => {
      console.error(error);
    });
}

export function getIncidentesAdmin2(setXd){
  const dbRef = ref(database);
  console.log("miraaaa")
  get(child(dbRef, `posts/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      let keys = Object.keys(snapshot.val());
      let obj = snapshot.val();
      let incidentesList = new Array(keys.length).fill(0).map((_,index)=>{
          let inc = new incidenteValidado(
              obj[keys[index]].user,
              obj[keys[index]].titulo,
              obj[keys[index]].descripcion,
              obj[keys[index]].tipo,
              obj[keys[index]].lugar,
              obj[keys[index]].fecha,
              obj[keys[index]].lat,
              obj[keys[index]].lng,
              obj[keys[index]].descripcionCompleta,
              obj[keys[index]].evidencia1,
              obj[keys[index]].evidencia2,
              obj[keys[index]].evidencia3,
              obj[keys[index]].validacion,
              obj[keys[index]].comentariosAdmin,
              obj[keys[index]].mensajeValidacion,
              obj[keys[index]].faltaEvidencia,
          )
          console.log(inc)
          return inc
      })
      if(incidentesList.length==0){
          console.log("vacio")
      }else{
          console.log(incidentesList)
      }
      setXd(incidentesList)
     
    } else {
      console.log("No data available");
      return "No data"
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function getIncidente2(setXd,titulo){
  const dbRef = ref(database);
  console.log("miraaaa")
  get(child(dbRef, `posts/${titulo}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      let incidenteVal = snapshot.val();
      let incidenteObj = new incidente(
        incidenteVal.user,
        incidenteVal.titulo,
        incidenteVal.descripcion,
        incidenteVal.tipo,
        incidenteVal.lugar,
        incidenteVal.fecha,
        incidenteVal.lat,
        incidenteVal.lng,
        incidenteVal.descripcionCompleta,
        incidenteVal.evidencia1,
        incidenteVal.evidencia2,
        incidenteVal.evidencia3,
      )
      
      setXd(incidenteObj)
     
    } else {
      console.log("No data available");
      return "No data"
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function getIncidenteAdmin2(setXd,titulo){
  const dbRef = ref(database);
  console.log("miraaaa")
  get(child(dbRef, `posts/${titulo}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      let incidenteVal = snapshot.val();

      let validacion=""
      let comentariosAdmin=""
      let mensajeValidacion=""
      let faltaEvidencia=""

      if(incidenteVal.validacion!="" || incidenteVal.validacion!=undefined){
        validacion=incidenteVal.validacion
      }
      if(incidenteVal.comentariosAdmin!="" || incidenteVal.comentariosAdmin!=undefined){
        comentariosAdmin=incidenteVal.comentariosAdmin
      }
      if(incidenteVal.mensajeValidacion!="" || incidenteVal.mensajeValidacion!=undefined){
        validacion=incidenteVal.mensajeValidacion
      }
      if(incidenteVal.faltaEvidencia!="" || incidenteVal.faltaEvidencia!=undefined){
        validacion=incidenteVal.faltaEvidencia
      }

      let validacionObj = new incidenteValidado(
        incidenteVal.user,
        incidenteVal.titulo,
        incidenteVal.descripcion,
        incidenteVal.tipo,
        incidenteVal.lugar,
        incidenteVal.fecha,
        incidenteVal.lat,
        incidenteVal.lng,
        incidenteVal.descripcionCompleta,
        incidenteVal.evidencia1,
        incidenteVal.evidencia2,
        incidenteVal.evidencia3,
        incidenteVal.validacion,
        incidenteVal.comentariosAdmin,
        incidenteVal.mensajeValidacion,
        incidenteVal.faltaEvidencia
      )

      setXd(validacionObj)
     
    } else {
      console.log("No data available");
      return "No data"
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function getData2(){
    const dbRef = ref(database);
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

export function writeIncidente2(newIncidente){
    set(ref(database, 'posts/' + newIncidente.titulo), {
        user: newIncidente.user,
        titulo: newIncidente.titulo,
        descripcion : newIncidente.descripcion,
        tipo:newIncidente.tipo,
        lugar: newIncidente.lugar,
        fecha: newIncidente.fecha,
        lat:newIncidente.lat,
        lng:newIncidente.lng,
        descripcionCompleta:"",
        evidencia1:"",
        evidencia2:"",
        evidencia3:""
      });
}

export function writeIncidenteCompleto2(newIncidente,descripcionCompleta,evidencia1,evidencia2,evidencia3){
  set(ref(database, 'posts/' + newIncidente.titulo), {
      user: newIncidente.user,
      titulo: newIncidente.titulo,
      descripcion : newIncidente.descripcion,
      tipo:newIncidente.tipo,
      lugar: newIncidente.lugar,
      fecha: newIncidente.fecha,
      lat:newIncidente.lat,
      lng:newIncidente.lng,
      descripcionCompleta:descripcionCompleta,
      evidencia1:evidencia1,
      evidencia2:evidencia2,
      evidencia3:evidencia3
    });
}

export function validarIncidente(newIncidente){
  set(ref(database, 'posts/' + newIncidente.titulo), {
      user: newIncidente.user,
      titulo: newIncidente.titulo,
      descripcion : newIncidente.descripcion,
      tipo:newIncidente.tipo,
      lugar: newIncidente.lugar,
      fecha: newIncidente.fecha,
      lat:newIncidente.lat,
      lng:newIncidente.lng,
      descripcionCompleta:newIncidente.descripcionCompleta,
      evidencia1:newIncidente.evidencia1,
      evidencia2:newIncidente.evidencia2,
      evidencia3:newIncidente.evidencia3,
      validacion:newIncidente.validacion,
      comentariosAdmin: newIncidente.comentariosAdmin,
      mensajeValidacion: newIncidente.mensajeValidacion,
      faltaEvidencia: newIncidente.faltaEvidencia
    });
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


