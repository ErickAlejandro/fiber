export class Vlan{
    id_vlan: number
    numerovlan_vlan: number
    nombre_vlan: string
    numeroolt_vlan:number
    tarjetaolt_vlan:number
    puertoolt_vlan:number
    ipinicio_vlan: number
    ipfin_vlan: number
    mascara_vlan: number
    gateway_vlan: number
    id_ciudad: number
    nombre_ciudad: string
    estado_vlan: string
    buckle2:string
    ip_rangodireccionesip:string

    constructor(){
        this.id_vlan = 0
        this.numerovlan_vlan = 0
        this.nombre_vlan = ''
        this.numeroolt_vlan = 0
        this.tarjetaolt_vlan = 0
        this.puertoolt_vlan = 0
        this.ipinicio_vlan = 0
        this.ipfin_vlan = 0
        this.mascara_vlan = 0
        this.gateway_vlan = 0
        this.id_ciudad = 0
        this.nombre_ciudad = ''
        this.estado_vlan = ''
        this.buckle2 = ''
        this.ip_rangodireccionesip = ''
    }
}