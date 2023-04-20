import React from "react"
export function filterSection(){
    return(
        <div className="w-100">
            <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#eeeeee"}}>
                <img src={require("../../../icons/filter.png")} style={{width:"20px",marginRight:"20px"}}/>Filter
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
            </div>
        </div>
    )
}