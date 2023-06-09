import validacionInterface from "./validacionInterface";

export default class validacionImpl extends validacionInterface{
    validar=async(incidente)=>{
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
}