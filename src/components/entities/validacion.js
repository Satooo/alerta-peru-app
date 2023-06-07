import { incidente } from "./incidente"
export class incidenteValidado extends incidente{
    constructor(
        incidente_id,
        user,
        titulo,
        descripcion,
        tipo,
        lugar,
        fecha,
        lat,
        lng,
        descripcionCompleta,
        evidencia1,
        evidencia2,
        evidencia3,
        user_id,
        validacion_status,
        validacion,
        comentariosAdmin,
        mensajeValidacion,
        faltaEvidencia
        ){
        super(
            incidente_id,
            user,
            titulo,
            descripcion,
            tipo,
            lugar,
            fecha,
            lat,
            lng,
            descripcionCompleta,
            evidencia1,
            evidencia2,
            evidencia3,
            user_id,
            validacion_status
        )
        this.validacion=validacion
        this.comentariosAdmin=comentariosAdmin
        this.mensajeValidacion=mensajeValidacion 
        this.faltaEvidencia=faltaEvidencia
    }
}
