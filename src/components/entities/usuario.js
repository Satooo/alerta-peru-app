export class usuario{
    constructor(user,pass,id,nombres,apellidos,celular,fechaNacimiento,userId){
        this.user=user;
        this.pass=pass;
        this.id=id;
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.celular=celular;
        this.fechaNacimiento=fechaNacimiento;
        this.user_id=userId
    }
    get getName(){
        return this.user
    }
}