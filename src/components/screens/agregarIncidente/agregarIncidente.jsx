import "./styles/agregarIncidente.css"
import React from "react"
import { useEffect, useState } from "react";
import Header from "../common/Header"
import ImageUploading from 'react-images-uploading';
import DateTimePicker from 'react-datetime-picker';

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import { getStorage,ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { uploadImage, uploadVideo } from "../../imageUploadVM/imageUploadVM";


import { incidente } from "../../entities/incidente";

import { evidenceUpload } from "./components/evidenceUpload";

import { datosPreloaded } from "./components/datosPreloaded";

import { description } from "./components/description";
import userManager from "../../IncidenteVM/userManager";
import generalImpl from "../../IncidenteVM/generalImpl";
import firebaseStorageImpl from "../../imageUploadVM/firebaseStorageImpl";


export default function AgregarIncidente(props){
    let incidenteTitle = sessionStorage.getItem("incidente");
    let incidenteId=sessionStorage.getItem("incidente_id");

    const incidentesGetter = new userManager().factoryMethod();
    const incidentesSetter = new generalImpl();
    const firebaseStorage = new firebaseStorageImpl();

    const [address,setAddress]=useState("Ramón Ribeyro 998, Barranco");
    const [value, onChangeDate] = useState();
    const [images, setImages] = React.useState([]);
    const [uploadVideoCompletion,setUploadVideoCompletion]=useState(0);
    const [video,setVideo]=React.useState();
    const [file,setFile]=React.useState(null);
    const [uploadCompletion,setUploadCompletion]=useState(0);
    const [uploadedImages,setUploadedImages]=useState(0);
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
      //getIncidenteDb(setNewIncidente,incidenteId)
      incidentesGetter.getIncidente(setNewIncidente,incidenteId)
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
      console.log(video)
    },[video])

    useEffect(()=>{
      if(video!=null || video!=undefined){
        if(uploadedImages==images.length && uploadVideoCompletion){
          window.location.pathname="/incidente"
        }
      }else{
        if(uploadedImages==images.length && images.length>0){
          window.location.pathname="/incidente"
        }
      }
      
    },[uploadedImages,uploadVideoCompletion])


    useEffect(()=>{
      onChangeDate(fecha)
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
                        if(video==undefined || video==null && images.length==0 ){
                          window.location.pathname="/incidente"
                        }
                        newIncidente.incidente_id=sessionStorage.getItem("incidente_id");
                        
                        console.log(newIncidente)
                        incidentesSetter.setincidentesCompletado(newIncidente)
                        //setIncidentesCompletoDb(newIncidente);
                        sessionStorage.setItem("incidente",titulo);
                        
                        if(images.length>0){
                          console.log("imagenes")
                          images.forEach((image,index)=>{
                            firebaseStorage.uploadImages(image.file,incidenteId,index,setUploadCompletion,setUploadedImages,uploadedImages)
                            //uploadImage(image.file,incidenteId,index,setUploadCompletion
                          })
                        }
                        if(video!=null || video!=undefined){
                          firebaseStorage.uploadVideo(incidenteId,video,setUploadVideoCompletion)
                        }
                      }
                    }}>Siguiente</button>
                </div>
                {datosPreloaded(value,onChangeDate,titulo,newIncidente)}
                {description(setDescripcionComp)}
                {evidenceUpload(images,onChangeImage,maxNumber,setEv1,setEv2,setEv3,setVideo,video)}
                <p style={{display:(uploadCompletion>0)?"block":"none"}}>Subiendo {uploadCompletion}%</p>
            </div>
        </div>
    )
}