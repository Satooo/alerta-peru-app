import React from "react"
import GoogleMapReact from 'google-map-react';

export default function Login(){
    const defaultProps = {
        center: {
          lat: -12.142500,
          lng: -77.006126
        },
        zoom: 16
      };
    
      const OPTIONS = {
        minZoom: 16,
        maxZoom: 16,
        styles: [{ stylers: [{ 'saturation': 0 }, {'lightness':10}] }],
        disableDefaultUI: true
      }

      const Marker = props => {
        return <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px",marginTop:"-60px"}}>
            <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
                <img src={require("../../icons/location.png")} style={{width:"15px",filter:"invert(100%)",marginRight:"2px",display:(props.miMark)?"inline block":"none"}}/><b>{props.text}</b>
            </span>
            <span style={{backgroundColor:(props.miMark)?"#1976d2":"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
                {props.fecha}
            </span>
            <div style={{width:"0",height:"0",borderLeft:"20px solid transparent;",borderRight:"30px solid transparent",borderTop:(props.miMark)?"20px solid #1976d2":"20px solid #f44336"}}></div>
        </div>
      }

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{height:"100vh",width:"100%",minWidth:"1200px",minHeight:"800px",backgroundColor:"#eeeeee",overflow:"scroll",zIndex:"0"}} id="loginBackground">
            <div style={{height:"100vh",width:"100%",zIndex:"1",position:"absolute"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    options={OPTIONS}
                                
                >
                    <Marker lat={-12.138500} lng={-77.016126} text="Robo" fecha="10/04 03:55 pm"/>
                    <Marker lat={-12.140500} lng={-77.015126} text="Acoso" fecha="10/04 04:55 pm"/>
                    <Marker lat={-12.138800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
                    <Marker lat={-12.148800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
                    <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
                    <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
                </GoogleMapReact>
            </div>
            <div style={{width:"100%",height:"100vh",backgroundColor:"transparent",zIndex:"2",position:"absolute"}} className="d-flex justify-content-center align-items-center" >
                    <div className="card" style={{width: "30rem",borderRadius:"20px",border:"none",overflow:"hidden",filter:"drop-shadow(2px 0px 20px gray)"}} id="loginCard">
                        <span style={{marginBottom:"-100px",zIndex:"1",color:"white",marginLeft:"30px",marginTop:"50px",display:"flex",alignItems:"center"}}>
                            <img src={require("../../icons/alerta-peru-logo.png")} style={{width:"40px",marginRight:"10px",filter:"brightness(0%) invert(100%) "}}/>
                            <span style={{fontSize:"30px"}}>Alerta<b>Perú</b></span>
                        </span>
                        <img src={require("../../images/loginBackground.jpg")} class="card-img-top" alt="..." style={{height:"300px",zIndex:"0"}}/>
                        <div className="card-body">
                                <h5 className="card-title">
                                
                                </h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Bienvenido</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <input type="text" className="form-control mb-3" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}}/>
                                <input type="text" className="form-control mb-3" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1" style={{backgroundColor:"#eeeeee",borderRadius:"20px"}}/>
                                <button href="#" class="btn bg-transparent">Sign up</button>
                                <a href="/"><button href="#" class="btn btn-primary" style={{borderRadius:"20px"}}>Log in</button></a>
                        </div>
                    </div>
                </div>
            
            
            
        </div>
        
    );
}