import React from "react"

export function SideMenu(showSideBar,setShowSideBar,incidentes,sortedIncident,incidentMinimized){
    console.log(sortedIncident)
    console.log(sortedIncident.length)
    let empty=true
    let maxAmount=0
    if(Object.keys(incidentes).length>0){
        return(
            <div className="d-flex flex-row align-items-center justify-content-center" id="sideMenu-div" style={{right:(showSideBar)?"0":"-330px"}} >
                <div id="sideMenu-div-div1"> 
                    <button style={{border:"none",backgroundColor:"transparent",color:"white"}} onClick={()=>{
                        setShowSideBar(!showSideBar)
                        }}>
                        {(showSideBar)?">":"<"}
                    </button>
                </div>
                <div id="sideMenu-div-div2" className="d-flex flex-column justify-content-center">
                    <b id="sideMenu-div-div2-p" style={{}}>
                        Incidentes recientes
                        <a href="/lista-incidentes"><img src={require("../../../icons/next.png")} style={{width:"20px",height:"20px",marginLeft:"10px"}}/></a>
                    </b>
                    {(sortedIncident.length==0)?<p style={{width:"100%",textAlign:"center"}}>No hay incidentes recientes</p>:Array( sortedIncident.length).fill(0).map((_,index)=>{
                            let i = sortedIncident[index].key  
                            if(incidentes[i].validacion_status=="true" && incidentes[i].descripcionCompleta!="" && maxAmount<2){
                                empty=false
                                maxAmount++
                                return incidentMinimized(incidentes[i].titulo,incidentes[i].fecha,incidentes[i].descripcion,incidentes[i].incidente_id)
                            }  
                        }
                    )}
                </div>
            </div>
        )
    }
    
  }