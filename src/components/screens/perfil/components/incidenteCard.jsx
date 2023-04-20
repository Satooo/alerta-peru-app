import React from "react"
export const incidenteCard=()=>{
    return(
        <div className="mt-3 mb-3 d-flex flex-row w-80" style={{borderRadius:"20px"}} id="incidentCard">
                <div>
                    <img src={require("../../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                </div>
                <div className="w-100" style={{padding:"20px"}}>
                    <h3>Robo agravado</h3>
                    <p className="mt-3"><span class="badge text-bg-dark">Robo</span><i className="m-2">10/03/2023 13:05</i></p>
                    <div className="d-flex flex-column mb-3">
                            <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                            <div>
                                <img src={require("../../../images/fotolinkedin.png")} style={{width:"20px",borderRadius:"100px"}}/>
                                <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>Andrés Sato</b>
                            </div>
                        </div>
                    <p style={{textAlign:"justify"}}>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className="w-100 d-flex flex-row justify-content-end">
                      <a href="/incidente"><button className="btn btn-primary rounded-pill" style={{marginRight:"20px"}}>Ver más</button></a>
                      <a href="/"><button className="btn btn-secondary rounded-pill">Aportar evidencia</button></a>
                    </div>
                </div>
            </div>
    )
  }