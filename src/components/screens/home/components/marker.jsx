import React from "react";
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

export const Marker = props => {
    return (
      <OverlayTrigger trigger="hover" placement="right" overlay={(!props.miMark)?(
        <Popover id="popoverMap">
          <p style={{display:(props.varios==true)?"flex":"none"}}><b>Varios crimenes</b> </p>
        <p style={{display:(props.varios==null)?"flex":"none", backgroundColor:"#e53935",padding:"10px",borderRadius:'20px',color:"white"}}><b>{props.titulo}</b> </p>
        <p style={{color:"gray",display:(props.varios==null)?"flex":"none"}}><i>Publicado por {props.user}</i></p>
        <p style={{display:(props.varios==null)?"flex":"none",marginTop:"-20px",color:"gray"}}>{props.fecha}</p>
        <span>
          <b>Descripción: </b>
          <p>{props.descripcion}</p>
        </span>
      </Popover>):(<p></p>)
      }>
    
    <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px",marginTop:"-60px"}}>
        <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
            <img src={require("../../../icons/location.png")} style={{width:"15px",filter:"invert(100%)",marginRight:"2px",display:(props.miMark)?"inline block":"none"}}/><b>{(props.varios==null)?props.text:"Varios crimenes"}</b>
        </span>
        <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
            {props.fecha}
            <a href="/incidente"  style={{textDecoration:"none"}} onClick={()=>{
              sessionStorage.setItem("incidente_id",props.id)
            }}><button id="markerButton" style={{display:(props.miMark)?"none":"block"}}>Ver más</button></a>
        </span>
        <div style={{width:"0",height:"0",borderLeft:"0px solid transparent",borderRight:"15px solid transparent",borderTop:(props.miMark)?"10px solid #1976d2":"10px solid #f44336"}}></div>
    </div>
     
    </OverlayTrigger>
    )
  }