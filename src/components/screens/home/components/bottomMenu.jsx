import React from "react"
export function BottomMenu(setFilter,address,user,filter){
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-row justify-content-between" style={{position:"absolute",bottom:"0",zIndex:2,width:"80%",textAlign:"center",backgroundColor:"white",padding:"20px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",filter:"drop-shadow(1px 0px 5px gray)"}} id="bottomMenu">
                <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img src={require("../../../icons/location.png")} style={{width:"20px",marginRight:"20px"}}/> 
                    <button type="button" className="btn" style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px",textAlign:"start",width:"100%",height:"70px",overflow:"scroll"}} data-bs-toggle="modal" data-bs-target="#direccionInfo">
                      {address}
                    </button>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <div style={{backgroundColor:"white",marginTop:"-50px",padding:"20px",borderRadius:"100px"}}>
                    <button className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:"#ffcdd2",borderRadius:"100px",height:"70px",width:"70px",color:"#c62828",fontSize:"20px",border:"none",fontSize:"30px"}} id="addIncidente" data-bs-toggle="modal" data-bs-target="#AgregarIncidente" disabled={(user=="")?true:false}><b>+</b></button>
                    </div>
                    <span className="d-flex flex-row align-items-center"><img src={require("../../../icons/alert.png")}  style={{width:"20px",marginRight:"10px"}}/> <b>Añadir incidente</b></span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img src={require("../../../icons/filter.png")} style={{width:"20px",marginRight:"20px"}}/>
                    <div className="d-flex flex-row justify-content-between" style={{backgroundColor:"#eeeeee",borderRadius:"20px",width:"100%"}}>
                        <button style={{padding:"15px",borderRadius:"20px",border:"none",textAlign:"center",width:"100%"}} id="filter" data-bs-toggle="modal" data-bs-target="#TipoModal" > {(filter!="")?`Filtro activo: ${filter.toUpperCase()}`:"Seleccionar filtro"} </button>
                        {/* <button style={{border:"none",padding:"15px",textAlign:"center",width:"100%",borderRight:"1px solid lightgray"}} id="filter" data-bs-toggle="modal" data-bs-target="#FechaModal" onClick={()=>{setFilter("fecha")}}>Fecha</button>
                        <button style={{padding:"10px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px",border:"none",textAlign:"center",width:"100%",border:"none"}} id="filter" data-bs-toggle="modal" data-bs-target="#FrecuenciaModal" onClick={()=>{
                          setFilter("frecuencia")
                          }}>Frecuencia</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
  }