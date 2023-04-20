import React from "react"
export function description(setDescripcionComp){
    return(
        <div class="input-group mt-3">
            <span class="input-group-text"><b>Descripción del incidente</b></span>
            <textarea class="form-control" aria-label="With textarea" onChange={(e)=>{setDescripcionComp(e.target.value)}}>..</textarea>
          </div>
    )
}