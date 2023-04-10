import React from "react";
import GoogleMapReact from 'google-map-react';


export default function HomePage(){
  const defaultProps = {
    center: {
      lat: -12.142500,
      lng: -77.006126
    },
    zoom: 16
  };

  const topMenu=()=>{
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div style={{position:"absolute",top:"0",zIndex:2,width:"80%",textAlign:"center",backgroundColor:"white",padding:"20px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px",filter:"drop-shadow(1px 0px 5px gray)"}}>
            <nav class="navbar navbar-expand-lg bg-transparent-body-tertiary">
                <div class="container-fluid" >
                    <a class="navbar-brand" href="#">Alerta<b>Perú</b></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    </div>
                </div>
                </nav>
            </div>
        </div>
    )
  }
  const incidentMinimized=()=>{
    return(
        <div className="mt-3 mb-3 d-flex flex-row w-100">
                <div>
                    <img src={require("../../images/robbery.jpg")} style={{height:"100px",width:"100px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                    <p className="mr-2 mt-2">
                        <i>10/03/2023 13:05</i>
                    </p>
                </div>
                <div className="w-75 mr-2">
                    <b>Robo agravado</b>
                    <p style={{textAlign:"justify"}}>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className="w-100 d-flex flex-row justify-content-end"><button className="btn btn-primary">Ver más</button></div>
                </div>
            </div>
    )
  }
  const sideMenu = ()=>{
    return(
        <div className="d-flex flex-column justify-content-center" style={{position:"absolute",zIndex:"2",backgroundColor:"white",right:"0",top:"150px",filter:"drop-shadow(2px 1px 5px gray)",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",padding:"20px",maxWidth:"500px"}}>
            <b style={{width:"100%",textAlign:"center",marginBottom:"20px"}}>
                Incidentes recientes
                <img src={require("../../icons/next.png")} style={{width:"20px",height:"20px",marginLeft:"10px"}}/>
            </b>
            {incidentMinimized()}
            {incidentMinimized()}
        </div>
    )
  }
  const bottomMenu=()=>{
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-ro justify-content-between" style={{position:"absolute",bottom:"0",zIndex:2,width:"80%",textAlign:"center",backgroundColor:"white",padding:"20px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px",filter:"drop-shadow(1px 0px 5px gray)"}}>
                <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img src={require("../../icons/location.png")} style={{width:"20px",marginRight:"10px"}}/> 
                    <span style={{backgroundColor:"#eeeeee",padding:"10px",borderRadius:"20px",textAlign:"start",width:"100%"}}> Santiago de Surco</span>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <div style={{backgroundColor:"white",marginTop:"-50px",padding:"20px",borderRadius:"100px"}}>
                    <button className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:"#ffebee",borderRadius:"100px",height:"50px",width:"50px",color:"#c62828",fontSize:"20px",border:"none"}}><b>+</b></button>
                    </div>
                    Añadir incidente
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img src={require("../../icons/filter.png")} style={{width:"20px",marginRight:"10px"}}/>
                    <div className="d-flex flex-row justify-content-between" style={{backgroundColor:"#eeeeee",borderRadius:"20px",width:"100%"}}>
                        <button style={{padding:"15px",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",border:"none",textAlign:"center",width:"100%",borderRight:"1px solid lightgray"}}> Robo </button>
                        <button style={{border:"none",padding:"15px",textAlign:"center",width:"100%",borderRight:"1px solid lightgray"}}>Pérdida</button>
                        <button style={{border:"none",padding:"15px",textAlign:"center",width:"100%",borderRight:"1px solid lightgray"}}>Acoso</button>
                        <button style={{padding:"10px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px",border:"none",textAlign:"center",width:"100%"}}>...</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }

   const Marker = props => {
    return <div className="SuperAwesomePin d-flex flex-column" style={{minWidth:"100px"}}>
        <span style={{backgroundColor:"#f44336",padding:"10px",color:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
            <b>{props.text}</b>
        </span>
        <span style={{backgroundColor:"#f44336",padding:"0px 0px 10px 10px",color:"white",borderBottomRightRadius:"10px"}}>
            {props.fecha}
        </span>
        <div style={{width:"0",height:"0",borderLeft:"20px solid transparent;",borderRight:"30px solid transparent",borderTop:"50px solid #f44336"}}></div>
    </div>
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
        {topMenu()}
        {bottomMenu()}
        {sideMenu()}
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDj9I51Cd1WrcAGKgGmi7m9y7GztW0mtcI" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onClick={(e)=>console.log(e.lat)}
      >
        <Marker lat={-12.142500} lng={-77.006126} text="Robo" fecha="10/04 03:55 pm"/>
        <Marker lat={-12.140500} lng={-77.015126} text="Acoso" fecha="10/04 04:55 pm"/>
        <Marker lat={-12.138800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
        <Marker lat={-12.148800} lng={-77.000526} text="Pérdido" fecha="10/04 04:25 pm"/>
        <Marker lat={-12.138800} lng={-77.020126} text="Pérdido" fecha="10/04 04:25 pm"/>
      </GoogleMapReact>
    </div>
  );

  
}