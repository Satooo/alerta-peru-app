import React from "react";
import DateTimePicker from 'react-datetime-picker';


export function datosPreloaded(value,onChangeDate,titulo,newIncidente){
    return <div className="w-100">
        <div>
          <b>Lugar de incidente: </b>
          <button id="datosPreloaded-button" data-bs-dismiss="modal">{newIncidente.lugar}</button>
          </div>
          <div class="input-group mt-3">
            <span class="input-group-text"><b>Titulo de incidente</b></span>
            <input type="text" class="form-control" aria-label="Titulodeincidente" aria-describedby="basic-addon1" placeholder={(titulo!="")?titulo:""}></input>
          </div>
          <div class="input-group mt-3">
            <span class="input-group-text"><b>Descripción breve</b></span>
            <textarea class="form-control" aria-label="With textarea" placeholder={(newIncidente.descripcion!="")?newIncidente.descripcion:""}></textarea>
          </div>
          <div className="mt-3 w-100 d-flex flex-row justify-content-between" >
            <b>Tiempo del incidente</b>
            <p>{value}</p>
          </div>
    </div>
}