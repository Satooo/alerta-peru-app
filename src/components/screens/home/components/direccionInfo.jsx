import React from "react";

export function direccionInfo(address) {
    return(
      <div className="modal fade" id="direccionInfo" tabindex="-1" aria-labelledby="direccionInfoAria" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cambiar dirección</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <p>Si desea cambiar de dirección puede hacer click en la dirección deseada. Esta señalizada por un marcador azúl con el nombre "Mi posición".</p>
                <p style={{padding:"10px",backgroundColor:"#f5f5f5",borderRadius:"20px"}}>La dirección señalizada en el mapa es <b>{address}</b></p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
              }}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }