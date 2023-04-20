import { getDatabase, ref, child, set, get, onValue } from "firebase/database";
import { getDbData } from "../components/backend/db";
import { usuario } from "../components/entities/usuario";

const database = getDbData();

export function getLogin(user,password){
    const dbRef = ref(database);
    get(child(dbRef, `users/`+user)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val().password);
        if(password==snapshot.val().password){
            console.log("success")
            setLoginSuccess(true)
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

export function writeUserData(name, password) {
      
    set(ref(db, 'users/' + name), {
      username: name,
      password : password,
      id: id,
      nombres: nombres,
      apellidos: apellidos,
      fechaNacimiento: startDate.toLocaleDateString(),
      celular: num
    });
  }