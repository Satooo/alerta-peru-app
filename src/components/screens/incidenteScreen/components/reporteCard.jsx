import React, { useState,useEffect } from "react";

export  default function reporteCard(fecha,id,user,mensajeValidacion,comentariosAdmin,faltaEvidencia){
    return (
        <div className="card p-3 rounded mb-3" >
        <div>
            <img src={require("../../../icons/logo_ministerio.png")} style={{width:"40%",paddingBottom:"20px"}}/>
        </div>
        <p style={{fontSize:"12px"}}><i>
            "DECENIO DE LA IGUALDAD DE OPORTUNIDADES PARA MUJERES Y HOMBRES"
        </i></p>
        <p style={{fontSize:"12px"}}><i>
            "AÑO DEL BICENTENARIO DEL PERÚ: 200 AÑOS DE INDEPENDENCIA"
        </i></p>
        <div>{new Date(fecha).toDateString()}</div>
        <div className="mb-3"><b>Informe N{String(id).split("-")[0]}</b></div>
        <div className="row mb-3">
            <div className="col-lg-4">A: </div>
            <div className="col-lg-8">
                <p>JOSE MANUEL ANTONIO ELICE NAVARRO</p>
                <p>MINISTERIO DEL INTERIOR</p>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-4">
                DE:
            </div>
            <div className="col-lg-8">
            <p>{user}</p>
                <p>MUNICIPALIDAD DE LIMA</p>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-4">
                ASUNTO:
            </div>
            <div className="col-lg-8">
                <p>{mensajeValidacion}</p>
                <p>{(faltaEvidencia=="true")? "Recalcar que hace falta una investigación más profunda para atender el problema del ciudadano" : ""}</p>
            </div>
        </div>
        <div className="card p-3 rounded" style={{backgroundColor:"aliceblue"}}>
            <p><b>Comentario de municipalidad</b></p>
            <p>{comentariosAdmin}</p>
        </div>
    </div>
    )
}