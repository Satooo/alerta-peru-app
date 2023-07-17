import React from "react"
import { incidenteCard } from "./incidenteCard"
export function participacion(incidentes,user_id,deleteConfirmation,setDeleteConfirmation){
    let numPublicaciones=0;
    if(sessionStorage.getItem("loggedUser")!="" && sessionStorage.getItem("loggedUser")!=null){
   return <div>
                <p className="mt-5" style={{backgroundColor:"#e3f2fd",padding:"10px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",width:"300px",marginBottom:"0px",color:"black",textAlign:"center"}}><b>Incidentes con tu participación</b></p>
                <div style={{borderTop:"1px solid #1976d2",marginTop:"0px"}}>
                    {Array(incidentes.length).fill(0).map((_,index)=>{
                        if(incidentes.length>0){
                            if(incidentes[index].user_id==user_id){
                                numPublicaciones++;
                                return (
                                    incidenteCard(incidentes[index].titulo,incidentes[index].descripcion, incidentes[index].fecha,incidentes[index].tipo,incidentes[index].validacion_status, incidentes[index].descripcionCompleta,incidentes[index].user,incidentes[index].incidente_id,deleteConfirmation,setDeleteConfirmation)
                                )
                            }
                        }
                    })}
                    {(numPublicaciones==0)? <p className=" w-100 mt-5 mb-5">No ha participado en incidentes actualmente.. </p>:""}
                </div>
            </div>
    }
}