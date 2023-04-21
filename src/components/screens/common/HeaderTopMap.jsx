import React from "react"
export default function HeaderTopMenu(props){
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div style={{position:"absolute",top:"0",zIndex:2,width:"80%",textAlign:"center",backgroundColor:"white",padding:"20px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px",filter:"drop-shadow(1px 0px 5px gray)"}}>
            <nav className="navbar navbar-expand-lg bg-transparent-body-tertiary">
                <div className="container-fluid" >
                    <img src={require("../../icons/alerta-peru-logo.png")} style={{width:"30px",marginRight:"10px"}}/>
                    <a className="navbar-brand" href="#">Alerta<b>Perú</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/lista-incidentes">Incidentes</a>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Casos
                        </a>
                        <ul className="dropdown-menu slideDown p-2">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            Usuario 
                            <button type="button" className="btn btn-primary position-relative" style={{backgroundColor:"transparent",border:"transparent"}}>
                            <img src={require("../../images/fotolinkedin.png")} style={{width:"30px",borderRadius:"100px",marginLeft:"10px"}}/>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                <span className="visually-hidden">unread messages</span>
                            </span>
                            </button>
                        </a>
                        <ul className="dropdown-menu slideDown p-2">
                            <li><a className="dropdown-item" href="/perfil"><button type="button" className="btn btn-light position-relative" style={{backgroundColor:"transparent",border:"none"}}>
                                Notificaciones
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        99+
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </button></a>
                            </li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="/perfil">Ver Perfil</a></li>
                            {
                                (sessionStorage.getItem("loggedUser")=="")?<p></p>:
                                <li><a className="dropdown-item" href="/dashboard">Modo admin</a></li>
                            }
                            <li><hr className="dropdown-divider"/></li>
                            {
                                (sessionStorage.getItem("loggedUser")=="")?<p></p>:
                                <li><a class="dropdown-item" href="/login" onClick={()=>{
                                    sessionStorage.setItem("loggedUser", "");
                                }}>Log off</a></li>
                            }
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search" style={{borderRadius:"20px"}}/>
                        <button className="btn btn-outline-primary" type="submit" style={{borderRadius:"20px"}}>Buscar</button>
                    </form>
                    </div>
                </div>
                </nav>
            </div>
        </div>
    )
}