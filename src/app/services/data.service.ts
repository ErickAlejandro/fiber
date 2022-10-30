import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cities } from '../Models/cities';
import { CashBoxes } from '../Models/cash-boxes';
import { Vlan } from '../Models/vlan';
import { Clients } from '../Models/clients';
import { Planes } from '../Models/planes';
import { Users } from '../Models/users';
import { OntModels } from '../Models/ontModels';
import { Ont } from '../Models/ont';
import { Pronvinces } from '../Models/provinces';
import { Pais } from '../Models/pais';
import { CashBoxesTwo } from '../Models/cash-boxes-two';
import { Observable } from 'rxjs';
import { Services } from '../Models/services';
import { Login } from '../Models/login';
import { Historial } from '../Models/historial';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;

  urlPrimary = 'https://app.masfiberhome.com/api/v2prueba/';

  constructor(private http: HttpClient) {
   }

    // CIUDADES
   getData(aditionalUrl: string): any{
    return this.http.get<Cities[]>(this.urlPrimary + aditionalUrl)
   }

   createCity(city:Cities, aditionalUrl:string){
    return this.http.post<Cities>(this.urlPrimary + aditionalUrl, city)
   }

   getCityByName(city:string, aditionalUrl:string){
    return this.http.get<Cities[]>(this.urlPrimary+aditionalUrl+city)
   }
   
   modifiedCity(city:Cities, aditionalUrl:string){
    return this.http.put<Cities>(this.urlPrimary + aditionalUrl, city)
   }

   deletedCity(aditionalUrl:string, city:any){
    return this.http.delete(this.urlPrimary + aditionalUrl+city)
   }

   //CASH BOXESLVL1

   getDataCash(aditionalUrl:string): any{
    return this.http.get<CashBoxes[]>(this.urlPrimary + aditionalUrl)
   }

   createCashBox(aditionalUrl:string, cash:CashBoxes){
    return this.http.post<CashBoxes>(this.urlPrimary + aditionalUrl, cash)
   }

   getCashBoxByName(city:string, aditionalUrl:string, secondUrl:string){
    return this.http.get<CashBoxes[]>(this.urlPrimary+aditionalUrl+city+secondUrl)
   }

   editCashBoxLvlOne(aditionalUrl: string, cashBox: CashBoxes){
    return this.http.put<CashBoxes>(this.urlPrimary + aditionalUrl, cashBox)
   }


  //  CASH BOXES LVL2
  getDataCashBoxesTwo(aditionalUrl: string){
    return this.http.get<CashBoxesTwo[]>(this.urlPrimary + aditionalUrl)
  }
  
  createCashBoxTwo(aditionalUrl: string, cash: CashBoxesTwo){
    return this.http.post<CashBoxes>(this.urlPrimary + aditionalUrl, cash)
  }

  getCashBoxByNameTwo(aditionalUrl: string, secondUrl: string, cash: string){
    return this.http.get<CashBoxesTwo[]>(this.urlPrimary + aditionalUrl + cash + secondUrl)
  }

  editCashBoxLvlTwo(aditionalUrl: string, cashBoxTwo: CashBoxesTwo){
    return this.http.put<CashBoxesTwo>(this.urlPrimary + aditionalUrl, cashBoxTwo)
  }

   // VLANS
  getDataVlans(aditionalUrl:string): any{
    return this.http.get<Vlan[]>(this.urlPrimary + aditionalUrl)
  }

  getVlanByName(vlan:string, aditionalUrl:string, secondUrl:string){
    return this.http.get<Vlan[]>(this.urlPrimary + aditionalUrl + vlan + secondUrl)
  }

  createVlans(aditionalUrl:string, vlan:Vlan){
    return this.http.post<Vlan>(this.urlPrimary + aditionalUrl, vlan)
  }

  editVlans(aditionalUrl: string, vlan:Vlan){
    return this.http.put<Vlan>(this.urlPrimary + aditionalUrl, vlan)
  }

  // CLIENTES CLIENTES
  getDataClients(aditionalUrl:string): any{
    return this.http.get<Clients[]>(this.urlPrimary + aditionalUrl)
  }

  getClientsByName(client:string, aditionalUrl:string,secondUrl:string){
    return this.http.get<Clients[]>(this.urlPrimary + aditionalUrl + client + secondUrl)
  }
  
  getCreateClients(aditionalUrl:string, client:Clients){
    return this.http.post<Clients>(this.urlPrimary + aditionalUrl, client)
  }

  editClients(client:Clients, aditionalUrl:string){
    return this.http.put<Clients>(this.urlPrimary + aditionalUrl, client)
  }

  // PLANES
  getDataPlanes(aditionalUrl: string){
    return this.http.get<Planes[]>(this.urlPrimary + aditionalUrl)
  }

  getPlansByName(plans:String, aditionalUrl: string, secondUrl: string){
    return this.http.get<Planes[]>(this.urlPrimary + aditionalUrl + plans + secondUrl)
  }

  createPlans(aditionalUrl: string, plans:Planes){
    return this.http.post<Planes>(this.urlPrimary + aditionalUrl, plans)
  }

  editPlans(plans:Planes, aditionalUrl: string){
    return this.http.put<Planes>(this.urlPrimary + aditionalUrl, plans)
  }

    // USUARIOS

  getDataUsers(aditionalUrl: string){
    return this.http.get<Users[]>(this.urlPrimary + aditionalUrl)
  }

  getUserByName(aditionalUrl: string, secondUrl: string, user:string){
    return this.http.get<Users[]>(this.urlPrimary + aditionalUrl + user + secondUrl)
  }

  getEditUsers(aditionalUrl: string, users: Users){
    return this.http.put<Cities>(this.urlPrimary + aditionalUrl, users)
  }

  createUsers(aditionalUrl: string, user: Users){
    return this.http.post<Users>(this.urlPrimary + aditionalUrl, user)
  }

  // SERIVIVIOS
  getDataService(aditionalUrl: string){
    return this.http.get<Services[]>(this.urlPrimary + aditionalUrl)
  }

  getServiceByName(aditionalUrl: string, secondUrl: string, service: string){
    return this.http.get<Services[]>(this.urlPrimary + aditionalUrl + service + secondUrl)
  }

  createService(aditionalUrl: string, service: Services){
    return this.http.post<Services>(this.urlPrimary + aditionalUrl, service)
  }
  

  // MODELOS ONT
  getDataModelOnt(aditionalUrl: string, city: string){
    return this.http.get<OntModels[]>(this.urlPrimary + aditionalUrl + city)
  }

  getOntModelByName(aditionalUrl: string, secondUrl: string, ontModel: string){
    return this.http.get<OntModels[]>(this.urlPrimary + aditionalUrl + ontModel + secondUrl)
  }

  editOntModel(aditionalUrl: string, ontModel: OntModels){
    return this.http.put<OntModels>(this.urlPrimary + aditionalUrl, ontModel)
  }

  createOntModel(aditionalUrl: string, ontModel: OntModels){
    return this.http.post<OntModels>(this.urlPrimary + aditionalUrl, ontModel)
  }

  // ONT
  getDataOnt(aditionalUrl: string){
    return this.http.get<Ont[]>(this.urlPrimary + aditionalUrl)
  }

  getOntByName(aditionalUrl: string, secondUrl:string, ont: string){
    return this.http.get<Ont[]>(this.urlPrimary + aditionalUrl + ont + secondUrl)
  }

  editOnt(aditionalUrl: string, ont:Ont){
    return this.http.put<Ont>(this.urlPrimary + aditionalUrl, ont)
  }

  createOnt(aditionalUrl: string, ont: Ont){
    return this.http.post<Ont>(this.urlPrimary + aditionalUrl, ont)
  }

  // PROVINCIAS
  getDataProvinces(aditionalUrl: string){
    return this.http.get<Pronvinces[]>(this.urlPrimary + aditionalUrl)
  }

  getProvinceByName(aditionalUrl: string, province: string){
    return this.http.get<Pronvinces[]>(this.urlPrimary + aditionalUrl + province)
  }

  createProvince(aditionalUrl: string, provinces: Pronvinces){
    return this.http.post<Pronvinces>(this.urlPrimary + aditionalUrl, provinces)
  }

  getEditProvinces(aditionalUrl: string, provinces: Pronvinces){
    return this.http.put<Pronvinces>(this.urlPrimary + aditionalUrl, provinces)
  }

  // PAIS
  getDataPais(aditionalUrl: string){
    return this.http.get<Pais[]>(this.urlPrimary + aditionalUrl)
  }

  createCountries(aditionalUrl: string, pais: Pais){
    return this.http.post<Pais>(this.urlPrimary + aditionalUrl, pais)
  }
  
  getCountriesByName(aditionalUrl: string, country: string){
    return this.http.get<Pais[]>(this.urlPrimary + aditionalUrl + country)
  }

  editCountries(aditionalUrl: string, pais: Pais){
    return this.http.put<Pais>(this.urlPrimary + aditionalUrl, pais)
  }
  
  // CREACION DEL LOGIN

  getDataLogin(aditionalUrl: string, user: string) {
    return this.http.get<Login[]>(this.urlPrimary + aditionalUrl + user)
  }

  getDataUserForlLogin(aditionalUrl: string){
    return this.http.get<Login[]>(this.urlPrimary + aditionalUrl)
  }

  // ACTIVACIONES PENDIENTES

  getDataPendingActivationsTecnico(){

  }

  // HISTORIAL
  getDataHistorial(aditionalUrl: string){
    return this.http.get<Historial[]>(this.urlPrimary + aditionalUrl)
  }

}