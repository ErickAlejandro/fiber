export class Cities{
    id_ciudad: number
    nombre_ciudad: string
    id_provincia: number
    nombre_provincia: string
    estado_ciudad: string

    constructor(){
        this.id_ciudad = 0
        this.nombre_ciudad = ''
        this.id_provincia = 0
        this.nombre_provincia = ''
        this.estado_ciudad = ''
    }
}