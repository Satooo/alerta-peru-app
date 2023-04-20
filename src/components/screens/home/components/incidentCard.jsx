import React from "react";

export function incidentCard(titulo,fecha,descripcion){
    let shortDescription = String(descripcion).substring(0,40)+"...";
    let fechaCorta= `${new Date(fecha).toLocaleDateString()} ${new Date(fecha).toLocaleTimeString()}`
    return(
        <div className="mt-3 mb-3 d-flex flex-row" id="incidentMinimized-div">
                <div>
                    <img src={require("../../../images/robbery.jpg")} />
                    <p className="mr-2 mt-2">
                        <i>{fechaCorta}</i>
                    </p>
                </div>
                <div className="w-75 mr-2">
                    <b>{titulo}</b>
                    <p id="incidentMinimized-div-p">{shortDescription}</p>
                    <div className="w-100 d-flex flex-row justify-content-end">
                      <a href="/incidente"><button className="btn btn-primary rounded-pill" onClick={()=>{
                        sessionStorage.setItem("incidente",titulo)
                      }}>Ver más</button></a>
                    </div>
                </div>
            </div>
    )
  }