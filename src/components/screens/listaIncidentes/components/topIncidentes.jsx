import React from "react";

export function TopIncidentesListView(incidentes){
    console.log(incidentes)
    let showing=0;
    return(
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner" style={{borderRadius:"20px"}}>
                {   (incidentes.length>0)?
                    Array(incidentes.length).fill(0).map((_,index)=>{
                        if(incidentes[index].validacion_status=="true" && showing==0){
                            showing++
                            return <div class="carousel-item active">
                            <img src={require("../../../images/loginBackground.jpg")} class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                                <h5>{incidentes[index].titulo}</h5>
                                <p><span class="badge rounded-pill bg-light text-dark" style={{marginRight:"20px"}}>{incidentes[0].tipo}</span><i>{`${new Date(incidentes[index].fecha).toLocaleDateString()} ${new Date(incidentes[index].fecha).toLocaleTimeString()}`}</i></p>
                                <div className="row w-100">
                                    <div className="col-lg-3">
                                        <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            <img src={require("../../../images/fotolinkedin.png")} style={{width:"50px",borderRadius:"100px",marginRight:"10px",filter:"brightness(0) invert(1)"}}/>
                                            <div className="d-flex flex-column w-100">
                                                <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                                <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{incidentes[index].user}</b>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <p style={{textAlign:"justify"}}> {incidentes[index].descripcion}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        }else if (incidentes[index].validacion_status=="true" && showing<3){
                            showing++
                            return <div class="carousel-item ">
                                <img src={require("../../../images/loginBackground.jpg")} class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block" style={{color:"white"}}>
                                    <h5>{incidentes[index].titulo}</h5>
                                    <p><span class="badge rounded-pill bg-light text-dark" style={{marginRight:"20px"}}>{incidentes[0].tipo}</span><i>{`${new Date(incidentes[index].fecha).toLocaleDateString()} ${new Date(incidentes[index].fecha).toLocaleTimeString()}`}</i></p>
                                    <div className="row w-100">
                                        <div className="col-lg-3">
                                            <div style={{backgroundColor:"#263238",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                                <img src={require("../../../images/fotolinkedin.png")} style={{width:"50px",borderRadius:"100px",marginRight:"10px"}}/>
                                                <div className="d-flex flex-column w-100">
                                                    <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                                                    <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{incidentes[index].user}</b>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <p style={{textAlign:"justify"}}> {incidentes[index].descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        }
                    }):<p>No hay incidentes actualmente</p>
                }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
    )
}