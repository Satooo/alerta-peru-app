import getIncidentesManager from "./getIncidentesManager"
import userImpl from "./userImpl"

export default class userManager extends getIncidentesManager{
    factoryMethod(){
        return new userImpl();
    }
}