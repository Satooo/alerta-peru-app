import React from "react";
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

export const Marker = props => {
    return (
      <OverlayTrigger trigger="hover" placement="right" overlay={(!props.miMark)?(
        <Popover id="popoverMap">
        <p><b>Nombre incidente</b> </p>
        <p style={{color:"gray"}}><i>Publicado por Andrés Sato</i></p>
        <p>{props.fecha}</p>
      </Popover>):(<p></p>)
      }>
    
    <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px",marginTop:"-60px"}}>
        <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
            <img src={require("../../../icons/location.png")} style={{width:"15px",filter:"invert(100%)",marginRight:"2px",display:(props.miMark)?"inline block":"none"}}/><b>{props.text}</b>
        </span>
        <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
            {props.fecha}<button id="markerButton" style={{display:(props.miMark)?"none":"block"}}>Ver más</button>
        </span>
        <div style={{width:"0",height:"0",borderLeft:"0px solid transparent",borderRight:"15px solid transparent",borderTop:(props.miMark)?"10px solid #1976d2":"10px solid #f44336"}}></div>
    </div>
     
    </OverlayTrigger>
    )
  }