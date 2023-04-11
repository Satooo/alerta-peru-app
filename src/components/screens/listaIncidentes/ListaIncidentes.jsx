import React from "react";

export default function ListaIncidentes(){
    const TopMenu=props=>{
        return (
            <div className="d-flex flex-row justify-content-center align-items-center w-100 bg-light mb-4" >
                <nav class="navbar navbar-expand-lg bg-transparent-body-tertiary" style={{width:"80%",padding:"25px"}}>
                    <div class="container-fluid" >
                        <img src={require("../../icons/alerta-peru-logo.png")} style={{width:"30px",marginRight:"10px"}}/>
                        <a class="navbar-brand" href="#">Alerta<b>Perú</b></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu slideDown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                Usuario <img src={require("../../images/fotolinkedin.png")} style={{width:"30px",borderRadius:"100px",marginLeft:"10px"}}/>
                            </a>
                            <ul class="dropdown-menu slideDown">
                                <li><a class="dropdown-item" href="/perfil">Ver Perfil</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="/login">Log off</a></li>
                            </ul>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search" style={{borderRadius:"20px"}}/>
                            <button class="btn btn-outline-primary" type="submit" style={{borderRadius:"20px"}}>Buscar</button>
                        </form>
                        </div>
                    </div>
                    </nav>
                </div>
        )
      }

      const incidentMinimized=()=>{
        return(
            <div className="mt-3 mb-3 d-flex flex-row w-80" style={{borderRadius:"20px"}} id="incidentCard">
                    <div>
                        <img src={require("../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                    </div>
                    <div className="w-100" style={{padding:"20px"}}>
                        <h3>Robo agravado</h3>
                        <p className="mt-3"><span class="badge text-bg-dark">Robo</span><i className="m-2">10/03/2023 13:05</i></p>
                        <p style={{textAlign:"justify"}}>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <div className="w-100 d-flex flex-row justify-content-end">
                          <a href="/lista-incidentes"><button className="btn btn-primary">Ver más</button></a>
                        </div>
                    </div>
                </div>
        )
      }
    return (
        <div className="container-fluid d-flex flex-column no-padding" style={{height:"auto",width:"100%",minWidth:"1200px",minHeight:"100vh",backgroundColor:"#eeeeee"}}>
            {TopMenu()}
            <div className="container bg-light d-flex flex-column align-items-center justify-content-center" style={{borderRadius:"20px",paddingTop:"20px"}}>
                {Array(20).fill(0).map((_,index)=>{
                    return (
                        incidentMinimized()
                    )
                })}
            </div>
        </div>
    )
}