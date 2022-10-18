export class Clients{
    id_clientepersona: string
    cedula_clientepersona: number
    nombre_clientepersona: string
    apellido_clientepersona: string
    correo_clientepersona: string
    telefono1_clientepersona: string
    telefono2_clientepersona: string
    id_ciudad: number
    estado_clientepersona: string

    constructor(){
        this.id_clientepersona = ''
        this.cedula_clientepersona = 0
        this.nombre_clientepersona = ''
        this.apellido_clientepersona = ''
        this.correo_clientepersona = ''
        this. telefono1_clientepersona = ''
        this. telefono2_clientepersona = ''
        this.id_ciudad = 0
        this.estado_clientepersona = ''
    }
}