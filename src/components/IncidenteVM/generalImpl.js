import incidenteInterface from "./incidenteInterface";

export default class generalImpl extends incidenteInterface{
    setIncidentes=async(incidente)=>{
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
              window.location.href="/agregar"
            }
          }catch({name,message}){
            console.log(name+" "+message)
          }
    }
    setincidentesCompletado=async(incidente)=>{
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
    deleteIncidente=async(id)=>{
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
}