import { incidente } from "../entities/incidente";
import {incidenteValidado} from "../entities/validacion";
import incidenteInterface from "./incidenteInterface";


export default class userImpl extends incidenteInterface{

    getIncidentes=async(setIncidente)=>{
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

    getIncidente=async(setIncidente,incidenteId)=>{
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
    
}