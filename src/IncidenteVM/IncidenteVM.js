import { getDatabase, ref, child, set, get, onValue } from "firebase/database";
import { getDbData } from "../components/backend/db";
import { incidente } from "../components/entities/incidente";

const database = getDbData();

export function getIncidentes2(setXd){
    const dbRef = ref(database);
    console.log("miraaaa")
    get(child(dbRef, `posts/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let keys = Object.keys(snapshot.val());
        let obj = snapshot.val();
        let incidentesList = new Array(keys.length).fill(0).map((_,index)=>{
            let inc = new incidente(
                obj[keys[index]].user,
                obj[keys[index]].titulo,
                obj[keys[index]].descripcion,
                obj[keys[index]].tipo,
                obj[keys[index]].lugar,
                obj[keys[index]].fecha,
                obj[keys[index]].lat,
                obj[keys[index]].lng,
                obj[keys[index]].descripcionCompleta,
                obj[keys[index]].evidencia1,
                obj[keys[index]].evidencia2,
                obj[keys[index]].evidencia3,
            )
            console.log(inc)
            return inc
        })
        if(incidentesList.length==0){
            console.log("vacio")
        }else{
            console.log(incidentesList)
        }
        setXd(incidentesList)
       
      } else {
        console.log("No data available");
        return "No data"
      }
    }).catch((error) => {
      console.error(error);
    });
}
export function getIncidente2(setXd,titulo){
  const dbRef = ref(database);
  console.log("miraaaa")
  get(child(dbRef, `posts/${titulo}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      let incidenteVal = snapshot.val();
      let incidenteObj = new incidente(
        incidenteVal.user,
        incidenteVal.titulo,
        incidenteVal.descripcion,
        incidenteVal.tipo,
        incidenteVal.lugar,
        incidenteVal.fecha,
        incidenteVal.lat,
        incidenteVal.lng,
        incidenteVal.descripcionCompleta,
        incidenteVal.evidencia1,
        incidenteVal.evidencia2,
        incidenteVal.evidencia3,
      )
      
      setXd(incidenteObj)
     
    } else {
      console.log("No data available");
      return "No data"
    }
  }).catch((error) => {
    console.error(error);
  });
}
export function getData2(){
    const dbRef = ref(database);
    get(child(dbRef, `posts/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

export function writeIncidente2(newIncidente){
    set(ref(database, 'posts/' + newIncidente.titulo), {
        user: newIncidente.user,
        titulo: newIncidente.titulo,
        descripcion : newIncidente.descripcion,
        tipo:newIncidente.tipo,
        lugar: newIncidente.lugar,
        fecha: newIncidente.fecha,
        lat:newIncidente.lat,
        lng:newIncidente.lng,
        descripcionCompleta:"",
        evidencia1:"",
        evidencia2:"",
        evidencia3:""
      });
}

export function writeIncidenteCompleto2(newIncidente,descripcionCompleta,evidencia1,evidencia2,evidencia3){
  set(ref(database, 'posts/'+newIncidente.titulo), {
      user: newIncidente.user,
      titulo: newIncidente.titulo,
      descripcion : newIncidente.descripcion,
      tipo:newIncidente.tipo,
      lugar: newIncidente.lugar,
      fecha: newIncidente.fecha,
      lat:newIncidente.lat,
      lng:newIncidente.lng,
      descripcionCompleta:descripcionCompleta,
      evidencia1:evidencia1,
      evidencia2:evidencia2,
      evidencia3:evidencia3
    });
}

export function validar(newIncidente){
  set(ref(database, 'posts/' + newIncidente.titulo), {
      user: newIncidente.user,
      titulo: newIncidente.titulo,
      descripcion : newIncidente.descripcion,
      tipo:newIncidente.tipo,
      lugar: newIncidente.lugar,
      fecha: newIncidente.fecha,
      lat:newIncidente.lat,
      lng:newIncidente.lng,
      descripcionCompleta:"",
      evidencia1:"",
      evidencia2:"",
      evidencia3:"",
    });
}


