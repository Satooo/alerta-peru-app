import React from "react";
import DateTimePicker from 'react-datetime-picker';


export function FilterTipo(setFilter) {
    return(
      <div className="modal fade" id="TipoModal" tabIndex="-1" aria-labelledby="TipoModalAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Tipo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                  {
                    Array(10).fill(0).map((_,index)=>{
                      return (
                      <div className="col-lg-4 d-flex flex-row justify-content-center">
                        <button className="btn mt-2" style={{backgroundColor:"#f5f5f5",borderRadius:"20px"}}>Robo</button>
                      </div>
                      )
                    })
                  }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                setFilter("fecha")
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export function FilterFecha(address,value,onChangeDate,setFilter) {
    console.log(address)
    return(
      <div className="modal fade" id="FechaModal" tabindex="-1" aria-labelledby="FechaModalAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Fecha</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
              <b>Incidentes cerca a: </b>
              <p style={{backgroundColor:"#f5f5f5",padding:"10px",borderRadius:"20px",marginTop:"10px"}}>{address}</p>
              </div>
              <div className="mt-3 mb-3 w-100 d-flex flex-row justify-content-between" >
                <b>Tiempo del incidente</b>
                <DateTimePicker onChange={onChangeDate} value={value} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                setFilter("fecha")
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export function FilterFrecuencia(setFilter){
    return(
      <div className="modal fade" id="FrecuenciaModal" tabindex="-1" aria-labelledby="FrecuenciaModalAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Frecuencia</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <b>Lugar con mayor frecuencia de:</b>
              <div className="row mt-3">
                  {
                    Array(10).fill(0).map((_,index)=>{
                      return (
                        <div className="col-lg-4 d-flex flex-row justify-content-center">
                        <button className="btn mt-2" style={{backgroundColor:"#f5f5f5",borderRadius:"20px"}}>Robo</button>
                    </div>
                      )
                    })
                  }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                setFilter("fecha")
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }