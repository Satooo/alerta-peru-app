import "./styles/agregarIncidente.css"
import React from "react"
import { useEffect, useState } from "react";
import Header from "../common/Header"
import ImageUploading from 'react-images-uploading';
import DateTimePicker from 'react-datetime-picker';

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import { getStorage,ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { uploadImage } from "../../imageUploadVM/imageUploadVM";

import { getIncidente2, writeIncidenteCompleto2 , setIncidentesCompletoDb, getIncidenteDb} from "../../../IncidenteVM/IncidenteVM";

import { incidente } from "../../entities/incidente";

import { evidenceUpload } from "./components/evidenceUpload";

import { datosPreloaded } from "./components/datosPreloaded";

import { description } from "./components/description";


export default function AgregarIncidente(props){
    let incidenteTitle = sessionStorage.getItem("incidente");
    let incidenteId=sessionStorage.getItem("incidente_id");
    const [address,setAddress]=useState("Ramón Ribeyro 998, Barranco");
    const [value, onChangeDate] = useState(new Date());
    const [images, setImages] = React.useState([]);
    const [file,setFile]=React.useState(null);
    const [uploadCompletion,setUploadCompletion]=useState(0);
    const maxNumber = 3;

    const [lat,setLat]=useState("");
    const [lng,setLng]=useState("");
    const [titulo,setTitulo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [tipo,setTipo]=useState("");
    const [fecha,setFecha]=useState("");
    const [autor,setAutor]=useState("");
    const [descripcionComp,setDescripcionComp]=useState("");
    const [lugar,setLugar]=useState("")
    const [ev1, setEv1]=useState("")
    const [ev2, setEv2]=useState("")
    const [ev3, setEv3]=useState("")

    const [newIncidente,setNewIncidente]=useState(new incidente)


    useEffect(()=>{
      //getIncidente2(setNewIncidente,incidenteTitle)
      getIncidenteDb(setNewIncidente,incidenteId)
    },[])

    useEffect(()=>{
          setAutor(newIncidente.user)
          setTitulo(newIncidente.titulo);
          setDescripcion(newIncidente.descripcion);
          setFecha(newIncidente.fecha);
          setTipo(newIncidente.tipo);
          setLat(newIncidente.lat);
          setLng(newIncidente.lng);
          setLugar(newIncidente.lugar);
          //newIncidente.incidente_id=sessionStorage.getItem("incidente_id")
          console.log(newIncidente)
    },[newIncidente])



    useEffect(()=>{
      //onChangeDate(new Date(fecha))
    },[fecha])

    useEffect(()=>{
      setNewIncidente(
        new incidente(
          newIncidente.incidente_id,
          newIncidente.user,
          newIncidente.titulo,
          newIncidente.descripcion,
          newIncidente.tipo,
          newIncidente.lugar,
          newIncidente.fecha,
          newIncidente.lat,
          newIncidente.lng,
          descripcionComp,
          ev1,
          ev2,
          ev3,
          newIncidente.user_id
        )
        )
    },[descripcionComp,ev1,ev2,ev3])

    useEffect(()=>{
      console.log(newIncidente)
    },[newIncidente])

    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
      };


    return (
        <div className="container-fluid d-flex flex-column no-padding" id="agregarIncidente-div">
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" id="agregarIncidente-div-div">
                <div className="w-100 d-flex justify-content-between">
                    <a href="/"><button className="btn btn-secondary rounded-pill" onClick={()=>{
                      sessionStorage.setItem("incidente","")
                    }}>Atrás</button></a>
                      <button className="btn btn-primary rounded-pill" onClick={()=>{
                      if(descripcionComp!=""){
                        //writeIncidenteCompleto2(newIncidente,descripcionComp,ev1,ev2,ev3);
                        newIncidente.incidente_id=sessionStorage.getItem("incidente_id");
                        
                        console.log(newIncidente)
                        setIncidentesCompletoDb(newIncidente);
                        sessionStorage.setItem("incidente",titulo);
                        if(images.length>0){
                          images.forEach((image,index)=>{
                            uploadImage(image.file,incidenteId,index,setUploadCompletion)
                          })
                        }else{
                          window.location.pathname="/incidente"
                        }
                      }
                    }}>Siguiente</button>
                </div>
                {datosPreloaded(value,onChangeDate,titulo,newIncidente)}
                {description(setDescripcionComp)}
                {evidenceUpload(images,onChangeImage,maxNumber,setEv1,setEv2,setEv3)}
                <p style={{display:(uploadCompletion>0)?"block":"none"}}>Subiendo {uploadCompletion}%</p>
            </div>
        </div>
    )
}