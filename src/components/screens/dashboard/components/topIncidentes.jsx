import React from "react";
export const TopIncidentes=(incidentes)=>{
    let crimen=[];
    let robo=[];
    let acoso=[];
    let perdida=[];

    console.log(incidentes)

    let keys = Object.keys(incidentes)

    keys.forEach((value)=>{
        switch(incidentes[value].tipo.toLowerCase()){
            case "crimen":
                crimen.push(incidentes[value])
                break
            case "robo":
                robo.push(incidentes[value])
                break
            case "acoso":
                acoso.push(incidentes[value])
                break
            case "pérdida":
                perdida.push(incidentes[value])
                break
        }
    })
    
    return(
        <div className="w-100">
            <div class="card" >
                <div class="card-header w-100" style={{backgroundColor:"#e53935",color:"white"}}>
                    <b>Resumen</b>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <b>Crimen</b>
                            <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                                <b>Reportados</b>
                                <span>{crimen.length}</span>
                                <b>Último reportado</b>
                                <span>{(crimen.length>0)?crimen[0].titulo:"-"}</span>
                                <span>{(crimen.length>0)?crimen[0].fecha:"-"}</span>
                            </div>
                        </div>
                        
                    </li>
                    <li class="list-group-item">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <b>Robo</b>
                            <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                                <b>Reportados</b>
                                <span>{robo.length}</span>
                                <b>Último reportado</b>
                                <span>{(robo.length>0)?robo[0].titulo:"-"}</span>
                                <span>{(robo.length>0)?robo[0].fecha:"-"}</span>
                            </div>
                        </div>
                        
                    </li>
                    <li class="list-group-item">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <b>Acoso</b>
                            <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                                <b>Reportados</b>
                                <span>{acoso.length}</span>
                                <b>Último reportado</b>
                                <span>{(acoso.length>0)?acoso[0].titulo:"-"}</span>
                                <span>{(acoso.length>0)?acoso[0].fecha:"-"}</span>
                            </div>
                        </div>
                        
                    </li>
                    <li class="list-group-item">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <b>Pérdida</b>
                            <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                                <b>Reportados</b>
                                <span>{perdida.length}</span>
                                <b>Último reportado</b>
                                <span>{(perdida.length>0)?perdida[0].titulo:"-"}</span>
                                <span>{(perdida.length>0)?perdida[0].fecha:"-"}</span>
                            </div>
                        </div>
                        
                    </li>
                </ul>
                </div>
        </div>
    )
}