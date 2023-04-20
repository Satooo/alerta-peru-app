import React from "react"
import { incidenteCard } from "./incidenteCard"
export function participacion(){
    if(sessionStorage.getItem("loggedUser")!="" && sessionStorage.getItem("loggedUser")!=null){
   return <div>
                <p className="mt-5" style={{backgroundColor:"#e3f2fd",padding:"10px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",width:"300px",marginBottom:"0px",color:"black",textAlign:"center"}}><b>Incidentes con tu participación</b></p>
                <div style={{borderTop:"1px solid #1976d2",marginTop:"0px"}}>
                    {Array(20).fill(0).map((_,index)=>{
                    return (
                        incidenteCard()
                    )
                    })}
                </div>
            </div>
    }
}