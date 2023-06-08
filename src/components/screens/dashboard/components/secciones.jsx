import React from "react";

export function Secciones(setSeccion){
    return(
        <ul class="nav nav-pills me-3 mt-3 nav-justified" id="pills-tab" role="tablist" style={{backgroundColor:"#e0e0e0",borderRadius:"20px"}}>
        <li class="nav-item" role="presentation">
            <button class="nav-link active rounded-pill" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={
                ()=>{
                    setSeccion("atendidos")
                }
            }>Atendidos</button>
        </li>
        <li class="nav-item"  role="presentation">
            <button class="nav-link rounded-pill" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={
                ()=>{
                    setSeccion("pendientes")
                }
            }>Pendientes</button>
        </li>
        </ul>
    )
  }