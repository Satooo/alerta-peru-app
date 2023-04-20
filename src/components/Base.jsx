import React, { useEffect, useState } from "react"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import HomePage from "./screens/home/HomePage"
import Login from "./screens/login/Login"
import ListaIncidentes from "./screens/listaIncidentes/ListaIncidentes"
import Perfil from "./screens/perfil/Perfil"
import Dashboard from "./screens/dashboard/Dashboard"
import IncidenteScreen from "./screens/incidenteScreen/IncidenteScreen"
import AgregarIncidente from "./screens/agregarIncidente/agregarIncidente"
import IncidenteScreenAdmin from "./screens/incidenteScreen/IncidenteScreenAdmin"

export default function Base(){
    
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/lista-incidentes" element={<ListaIncidentes />}/>
            <Route path="/perfil" element={<Perfil />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/incidente" element={<IncidenteScreen />}/>
            <Route path="/agregar" element={<AgregarIncidente />}/>
            <Route path="/incidente-admin" element={<IncidenteScreenAdmin />}/>
        </Routes>
        </BrowserRouter>
    )
}