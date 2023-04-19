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
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default function Base(){
    // TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    apiKey: "AIzaSyAd7c-Cu2SS3Hci6qGIfFl8qydbP61BOpY",
    authDomain: "alertaperuapp-403c9.firebaseapp.com",
    projectId: "alertaperuapp-403c9",
    storageBucket: "alertaperuapp-403c9.appspot.com",
    messagingSenderId: "956646036975",
    appId: "1:956646036975:web:2a1c0d948cea5a9c1c921a",
    measurementId: "G-4NNFHGK28F",
    databaseURL:"https://alertaperuapp-403c9-default-rtdb.firebaseio.com/"
  };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app,"gs://alertaperuapp-403c9.appspot.com");
    const analytics = getAnalytics(app);
    //const auth = getAuth(app)
    const db = getDatabase(app);

    /* auth.onAuthStateChanged(auth,user=>{
        if(user==null){
            console.log('logged in!');
        }else{
            console.log("No user!")
        }
    })  */
    const [user,setUser]=useState("")
    useEffect(()=>{
        console.log(user)
    },[user])
    
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage db={db} />}/>
            <Route path="/login" element={<Login db={db} />}/>
            <Route path="/lista-incidentes" element={<ListaIncidentes db={db}/>}/>
            <Route path="/perfil" element={<Perfil db={db}/>}/>
            <Route path="/dashboard" element={<Dashboard db={db}/>}/>
            <Route path="/incidente" element={<IncidenteScreen db={db} storage={storage}/>}/>
            <Route path="/agregar" element={<AgregarIncidente db={db} storage={storage}/>}/>
            <Route path="/incidente-admin" element={<IncidenteScreenAdmin db={db} storage={storage}/>}/>
        </Routes>
        </BrowserRouter>
    )
}