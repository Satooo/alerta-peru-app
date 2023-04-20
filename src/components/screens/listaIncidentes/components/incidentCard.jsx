import React from "react"
export const incidentCardListView=(titulo,descripcion,tipo,user,fecha)=>{
    const fechaDisplay = `${new Date(fecha).toLocaleDateString()} ${new Date(fecha).toLocaleTimeString()}`
    return(
        <div className="mt-3 mb-3 d-flex flex-row w-100" style={{borderRadius:"20px"}} id="incidentCard">
                <div>
                    <img src={require("../../../images/robbery.jpg")} style={{height:"300px",width:"300px",borderRadius:"20px",objectFit:"cover",marginBottom:"1px"}}/>
                </div>
                <div style={{padding:"20px",width:"100%"}}>
                    <h3 className="w-100">{titulo}</h3>
                    <p className="mt-3"><span class="badge text-bg-dark">{tipo}</span><i className="m-2">{fechaDisplay}</i></p>
                    <div className="d-flex flex-column mb-3">
                            <span style={{width:"100%",padding:"5px",fontSize:"12px",textAlign:"start"}}>Publicado por</span>
                            <div>
                                <img src={require("../../../images/fotolinkedin.png")} style={{width:"20px",borderRadius:"100px"}}/>
                                <b style={{width:"100%",padding:"5px",marginTop:"-5px",textAlign:"start"}}>{user}</b>
                            </div>
                        </div>
                    <p style={{textAlign:"justify"}}>{descripcion}</p>
                    <div className="w-100 d-flex flex-row justify-content-end">
                      <a href="/incidente"><button className="btn btn-primary rounded-pill" onClick={()=>{
                        sessionStorage.setItem("incidente",titulo)
                      }}>Ver más</button></a>
                    </div>
                </div>
            </div>
    )
  }