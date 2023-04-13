import React from "react"
import { useEffect, useState } from "react";
import Header from "../common/Header"
import ImageUploading from 'react-images-uploading';
import DateTimePicker from 'react-datetime-picker';

import { getDatabase, ref, child, set, get, onValue } from "firebase/database";


export default function AgregarIncidente(props){
    let incidente = sessionStorage.getItem("incidente");
    const db = props.db
    const [address,setAddress]=useState("Ramón Ribeyro 998, Barranco");
    const [value, onChangeDate] = useState(new Date());
    const [images, setImages] = React.useState([]);
    const maxNumber = 4;

    const [lat,setLat]=useState("");
    const [lng,setLng]=useState("");
    const [titulo,setTitulo]=useState("");
    const [descripcion,setDescripcion]=useState("");
    const [tipo,setTipo]=useState("");
    const [fecha,setFecha]=useState("");
    const [autor,setAutor]=useState("");
    const [descripcionComp,setDescripcionComp]=useState("");
    const [lugar,setLugar]=useState("")

    function getIncidenteData(titulo){
      const dbRef = ref(db);
      get(child(dbRef, `posts/`+titulo)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(titulo)
          console.log(snapshot.val());
          setAutor(snapshot.val().user)
          setTitulo(snapshot.val().titulo);
          setDescripcion(snapshot.val().descripcion);
          setFecha(snapshot.val().fecha);
          setTipo(snapshot.val().tipo);
          setLat(snapshot.val().lat);
          setLng(snapshot.val().lng);
          setLugar(snapshot.val().lugar);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    function writeIncidente(titulo, descripcionComp) {
      
      set(ref(db, 'posts/' + titulo), {
        user: autor,
        titulo: titulo,
        descripcion : descripcion,
        tipo:tipo,
        lugar: lugar,
        fecha: fecha,
        lat:lat,
        lng:lng,
        descripcionCompleta: descripcionComp
      });
    }

    useEffect(()=>{
      getIncidenteData(incidente);
      console.log(incidente)
    },[])

    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
      };
    function evidenceUpload(){
        return(
            <div className="w-100 mt-3">
            <b>Evidencia del incidente (opcional)</b>
              <ImageUploading
                  multiple
                  value={images}
                  onChange={onChangeImage}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="btn btn-dark mt-3 mb-3"
                      >
                        Agregar o arrastrar aquí
                      </button>
                      &nbsp;
                      <button onClick={onImageRemoveAll} className="btn btn-light mt-3 mb-3">Eliminar todo</button>
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" width="100" />
                          <div className="image-item__btn-wrapper mt-3">
                          <div class="input-group mt-3 mb-3">
                                <span class="input-group-text"><b>Descripción de evidencia</b></span>
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                            <button onClick={() => onImageUpdate(index)} className="btn btn-dark">Actualizar</button>
                            <button onClick={() => onImageRemove(index)} className="btn btn-light">Quitar</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
            </div>
        )
    }
    function datosPreloaded(){
        return <div className="w-100">
            <div>
              <b>Lugar de incidente: </b>
              <button style={{backgroundColor:"#f5f5f5",padding:"10px",borderRadius:"20px",marginTop:"10px",textAlign:"left",border:"none"}} data-bs-dismiss="modal">{address}</button>
              </div>
              <div class="input-group mt-3">
                <span class="input-group-text"><b>Titulo de incidente</b></span>
                <input type="text" class="form-control" aria-label="Titulodeincidente" aria-describedby="basic-addon1" placeholder={(titulo!="")?titulo:""}></input>
              </div>
              <div class="input-group mt-3">
                <span class="input-group-text"><b>Descripción breve</b></span>
                <textarea class="form-control" aria-label="With textarea" placeholder={(descripcion!="")?descripcion:""}></textarea>
              </div>
              <div className="mt-3 w-100 d-flex flex-row justify-content-between" >
                <b>Tiempo del incidente</b>
                <DateTimePicker onChange={onChangeDate} value={value} />
              </div>
        </div>
    }
    function description(){
        return(
            <div class="input-group mt-3">
                <span class="input-group-text"><b>Descripción del incidente</b></span>
                <textarea class="form-control" aria-label="With textarea" onChange={(e)=>{setDescripcionComp(e.target.value)}}>..</textarea>
              </div>
        )
    }
    return (
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            <Header/>
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" style={{borderRadius:"20px",padding:"20px"}}>
                <div className="w-100 d-flex justify-content-between">
                    <a href="/"><button className="btn btn-secondary rounded-pill" onClick={()=>{
                      db.ref(`posts/${titulo}`).remove()
                      sessionStorage.setItem("incidente","")
                    }}>Atrás</button></a>
                    <a href="/incidente"><button className="btn btn-primary rounded-pill" onClick={()=>{
                      if(descripcionComp!=""){
                        writeIncidente(titulo,descripcionComp);
                        sessionStorage.setItem("incidente",titulo);
                      }
                    }}>Siguiente</button></a>
                </div>
                {datosPreloaded()}
                {description()}
                {evidenceUpload()}
            </div>
        </div>
    )
}