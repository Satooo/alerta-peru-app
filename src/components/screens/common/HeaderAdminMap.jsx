import React from "react"
export default function HeaderAdminMap(){
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div style={{position:"absolute",top:"0",zIndex:2,width:"80%",textAlign:"center",backgroundColor:"white",padding:"20px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px",filter:"drop-shadow(1px 0px 5px gray)"}}>
            <nav class="navbar navbar-expand-lg bg-transparent-body-tertiary">
                <div class="container-fluid" >
                    <img src={require("../../icons/alerta-peru-logo.png")} style={{width:"30px",marginRight:"10px"}}/>
                    <a class="navbar-brand" href="#">Alerta<b>Perú</b></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/lista-incidentes">Incidentes</a>
                        </li>
                        
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            Usuario 
                            <button type="button" class="btn btn-primary position-relative" style={{backgroundColor:"transparent",border:"transparent"}}>
                            <img src={require("../../images/fotolinkedin.png")} style={{width:"30px",borderRadius:"100px",marginLeft:"10px"}}/>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                            </button>
                        </a>
                        <ul class="dropdown-menu slideDown p-2">
                            <li><a class="dropdown-item" href="/perfil"><button type="button" class="btn btn-light position-relative" style={{backgroundColor:"transparent",border:"none"}}>
                                Notificaciones
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        99+
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                </button></a>
                            </li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="/perfil">Ver Perfil</a></li>
                            <li><a class="dropdown-item" href="/">Modo user</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            {
                                (sessionStorage.getItem("loggedUser")=="")?<p></p>:
                                <li><a class="dropdown-item" href="/login" onClick={()=>{
                                    sessionStorage.setItem("loggedUser", "");
                                }}>Log off</a></li>
                            }
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
        </div>
    )
}