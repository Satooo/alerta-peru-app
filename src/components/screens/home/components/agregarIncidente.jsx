import React from "react";
import DateTimePicker from 'react-datetime-picker';
import { incidente } from "../../../entities/incidente";

export function AgregarIncidente(setTitulo,setTipoIncidente,setDescripcionIncidente,value,onChangeDate,newIncidente,writeIncidente,user) {
  console.log(newIncidente.user)
    return(
      <div className="modal fade" id="AgregarIncidente" tabindex="-1" aria-labelledby="AgregarIncidenteAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar incidencia</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <b style={{marginRight:"10px"}}>Tipo de incidente</b>
              <div className="btn-group dropend mb-3">
              <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#eeeeee",color:"black"}}>
                {(newIncidente.tipo=="")?"Seleccionar tipo":newIncidente.tipo}
              </button>
                <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Robo")}}>Robo</a></li>
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Crimen")}}>Crimen</a></li>
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Acoso")}}>Acoso</a></li>
                <li><a className="dropdown-item" onClick={()=>{setTipoIncidente("Pérdida")}}>Pérdida</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item">Otro</a></li>
                </ul>
              </div>
              <div>
              <b>Lugar de incidente: </b>
              <button style={{backgroundColor:"#f5f5f5",padding:"10px",borderRadius:"20px",marginTop:"10px",textAlign:"left",border:"none"}} data-bs-dismiss="modal">{newIncidente.lugar}</button>
              </div>
              <div className="input-group mt-3">
                <span className="input-group-text"><b>Titulo de incidente</b></span>
                <input type="text" className="form-control" placeholder="... " aria-label="Titulodeincidente" aria-describedby="basic-addon1" onChange={(e)=>{setTitulo(e.target.value)}}></input>
              </div>
              <div className="input-group mt-3">
                <span className="input-group-text"><b>Descripción breve</b></span>
                <textarea className="form-control" aria-label="With textarea" onChange={(e)=>{setDescripcionIncidente(e.target.value)}}></textarea>
              </div>
              <div className="mt-3 mb-3 w-100 d-flex flex-row justify-content-between" >
                <b>Tiempo del incidente</b>
                <DateTimePicker onChange={onChangeDate} value={value} />
              </div>
              


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
                setTipoIncidente("")
                onChangeDate(new Date())
                setTitulo("")
                setDescripcionIncidente("")
                }}>Cancelar</button>
              <a href={(user=="")?"/":"/agregar"}><button type="button" disabled={(user=="")?true:false} className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                if(newIncidente.tipo!="" && newIncidente.fecha!="" && newIncidente.titulo!="" && newIncidente.descripcion!="" && newIncidente.user!="" ){
                  console.log(newIncidente)
                  if(user!=""){
                    writeIncidente(newIncidente)
                    sessionStorage.setItem("incidente",newIncidente.titulo)
                  }
                }
              }}>Continuar</button></a>
            </div>
          </div>
        </div>
      </div>
    )
  }