export class usuario{
    constructor(user,pass,id,nombres,apellidos,celular,fechaNacimiento,userId,esAdmin){
        this.user=user;
        this.pass=pass;
        this.id=id;
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.celular=celular;
        this.fechaNacimiento=fechaNacimiento;
        this.user_id=userId;
        this.esAdmin=esAdmin;
    }
    get getName(){
        return this.user
    }
}