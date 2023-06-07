import { getDatabase, ref, child, set, get, onValue } from "firebase/database";
import { getDbData } from "../../../backend/db";
import { usuario } from "../../../entities/usuario";

const database = getDbData();

export function getLogin2(user,password,setLoginSuccess){
    const dbRef = ref(database);
    get(child(dbRef, `users/`+user)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val().password);
        let userVal = snapshot.val()
        if(password==snapshot.val().password){
            console.log("success")
            setLoginSuccess(true);
            window.location.pathname="/"
        }else{
            console.log("fail")
            setLoginSuccess(false)
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
export function getPerfil2(loggedUser,setUser,setStartDate){
    const dbRef = ref(database);
        get(child(dbRef, `users/${loggedUser}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val())
            let userVal = snapshot.val()
            let newUser = new usuario(
                userVal.username,
                userVal.password,
                userVal.id,
                userVal.nombres,
                userVal.apellidos,
                userVal.celular,
                userVal.fechaNacimiento
            )
            let [day, month, year] = (snapshot.val().fechaNacimiento).split('/')
            const dateObj = new Date(+year, +month - 1, +day)
            console.log(dateObj)
            setStartDate(dateObj)
            setUser(newUser)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
}

export function writeUserData2(usuario) {
      
    set(ref(database, 'users/' + usuario.user), {
      username: usuario.user,
      password : usuario.pass,
      id: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      fechaNacimiento: usuario.fechaNacimiento,
      celular: usuario.celular
    });
  }
  //startDate.toLocaleDateString()

  export const register=async(user)=>{
    try{
        const resp = await fetch(`http://localhost:5555/usuarios`, {   
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }catch({ name, message }){
        console.log(name+" "+message)
    }
} 

export const loginUser = async(user,pass,setLoginSuccess)=>{
  try{
    const resp = await fetch(`http://localhost:5555/usuarios`)
    const data = await resp.json()
    console.log(data)
    for(let i=0;i<=data.length;i++){
      if(data[i].user ==user && data[i].pass==pass){
        sessionStorage.setItem("user_id",data[i].user_id);
        setLoginSuccess(true)
        window.location.pathname="/"
        console.log("correcto")
        
      }
    }
  }catch({name,message}){
    console.log(name+" "+message)
  }

}

export const modificarUser = async(user)=>{
  try{
    const resp = await fetch(`http://localhost:5555/usuarios_modificar`, {   
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
  }catch({ name, message }){
      console.log(name+" "+message)
  }
}

export const getUser = async(loggedUser,setUser,setStartDate )=>{
  try{
    const resp = await fetch(`http://localhost:5555/usuarios`)
    const data = await resp.json()
    console.log(data)
    let userId = sessionStorage.getItem("user_id")
    for(let i=0;i<=data.length;i++){
      if(data[i].user_id ===userId){
            let userVal = data[i]
            let newUser = new usuario(
                userVal.user,
                userVal.pass,
                userVal.id,
                userVal.nombres,
                userVal.apellidos,
                userVal.celular,
                userVal.fechaNacimiento,
                userVal.user_id
            )
            let [day, month, year] = (userVal.fechaNacimiento).split('/')
            const dateObj = new Date(+year, +month - 1, +day)
            console.log(dateObj)
            setStartDate(dateObj)
            setUser(newUser)
      }
    }
  }catch({name,message}){
    console.log(name+" "+message)
  }
}