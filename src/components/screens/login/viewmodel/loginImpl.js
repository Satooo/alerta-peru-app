import loginInterface from "./loginInterface";
import { usuario } from "../../../entities/usuario";

export default class loginImpl extends loginInterface{
    register=async(user)=>{
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
    loginUser=async(user,pass,setLoginSuccess)=>{
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
    modificarUser=async(user)=>{
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
    getUser=async(loggedUser,setUser,setStartDate )=>{
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
}