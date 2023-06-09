import adminImpl from "./adminImpl";
import getIncidentesManager from "./getIncidentesManager";

export default class adminManager extends getIncidentesManager{
    factoryMethod(){
        return new adminImpl();
    }
}