import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashBoxesComponent } from './components/cash-boxes/cash-boxes.component';
import { CitiesComponent } from './components/cities/cities.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CountriesComponent } from './components/countries/countries.component';
import { NotFoundPagesComponent } from './components/not-found-pages/not-found-pages.component';
import { PendingActivationsComponent } from './components/pending-activations/pending-activations.component';
import { PlansComponent } from './components/plans/plans.component';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { ServicesComponent } from './components/services/services.component';
import { VlansComponent } from './components/vlans/vlans.component';
import { UsersComponent } from './components/users/users.component';
import { OntModelsComponent } from './components/ont-models/ont-models.component';
import { OntComponent } from './components/ont/ont.component';
import { CashBoxesTwoComponent } from './components/cash-boxes-two/cash-boxes-two.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HistorialComponent } from './components/historial/historial.component';

import { SaveCitiesComponent } from './components/actions/saves/save-cities/save-cities.component';
import { TablesEmptyComponent } from './components/tables-empty/tables-empty.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // LISTADO GENERAL
  { path: 'activaciones-pendientes', component: PendingActivationsComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'servicios', component: ServicesComponent },
  { path: 'planes', component: PlansComponent },
  { path: 'caja-nivel1', component: CashBoxesComponent },
  { path: 'caja-nivel2', component: CashBoxesTwoComponent},
  { path: 'vlans' , component: VlansComponent },
  { path: 'paises', component: CountriesComponent },
  { path: 'provincias' , component: ProvincesComponent },
  { path: 'ciudades' , component: CitiesComponent },
  { path: 'usuarios' , component: UsersComponent },
  { path: 'Modelo-Ont', component: OntModelsComponent },
  { path: 'Ont', component: OntComponent },
  { path: 'historial-servicios', component:HistorialComponent },

  // LOGIN
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegisterComponent },
  
  { path: 'tabla-vacia', component: TablesEmptyComponent },
  
  // RUTAS DE ACCTIONES CREAR Y EDITAR
  { path: 'ciudades/guardar', component: SaveCitiesComponent},
  
  // RUTA DE AYUDA
  { path: '**', component: NotFoundPagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
