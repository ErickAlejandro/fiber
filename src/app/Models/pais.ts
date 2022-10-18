export class Pais{
    id_pais: number
    nombre_pais: string
    estado_pais: string

    id!: number
    nombre!: string
    estado!: string

    constructor(){
        this.id_pais = 0
        this.nombre_pais = ''
        this.estado_pais = ''

    }
}