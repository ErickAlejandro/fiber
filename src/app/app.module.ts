import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PendingActivationsComponent } from './components/pending-activations/pending-activations.component';
import { NotFoundPagesComponent } from './components/not-found-pages/not-found-pages.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ServicesComponent } from './components/services/services.component';
import { PlansComponent } from './components/plans/plans.component';
import { CashBoxesComponent } from './components/cash-boxes/cash-boxes.component';
import { VlansComponent } from './components/vlans/vlans.component';
import { CountriesComponent } from './components/countries/countries.component';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { CitiesComponent } from './components/cities/cities.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CashBoxesTwoComponent } from './components/cash-boxes-two/cash-boxes-two.component';
import { CuadrillasComponent } from './components/cuadrillas/cuadrillas.component';
import { UsersComponent } from './components/users/users.component';
import { OntModelsComponent } from './components/ont-models/ont-models.component';
import { OntComponent } from './components/ont/ont.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { CitiesState } from './store/cities/cities.state';
import { PaisState } from './store/countries/countries.state';
import { ProvincesState } from './store/provinces/provinces.state'
import { OntState } from './store/ont/ont.state';
import { VlansState } from './store/vlan/vlan.state';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { CashBoxState } from './store/cash-box-one/cash-box-one.state'; 
import { CashBoxesState } from './store/cash-box-two/cash-box-two.state';
import { OntModelsState } from './store/ont-model/ontModel.state';
import { UsersState } from './store/users/users.state';
import { ClientState } from './store/clients/clients.state';
import { ServicesState } from './store/services/services.state';
import { PlanState } from './store/plans/plans.state';
import { LoginState } from './store/login/login.state';
import { HistorialComponent } from './components/historial/historial.component';

import { MatTableModule } from '@angular/material/table';
import { FilterHistorialPipe } from './pipes/filter-historial.pipe';
import { SaveCitiesComponent } from './components/actions/saves/save-cities/save-cities.component';
import { SaveProvincesComponent } from './components/actions/saves/save-provinces/save-provinces.component';
import { FilterProvincePipe } from './pipes/province/filter-province.pipe';
import { FilterCountryPipe } from './pipes/country/filter-country.pipe';
import { FilterRolPipe } from './pipes/rol/filter-rol.pipe';
import { FilterCityPipe } from './pipes/city/filter-city.pipe';
import { FilterVlansPipe } from './pipes/vlan/filter-vlans.pipe';
import { FilterCashBoxOnePipe } from './pipes/cashBoxOne/filter-cash-box-one.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PendingActivationsComponent,
    NotFoundPagesComponent,
    ClientsComponent,
    ServicesComponent,
    PlansComponent,
    CashBoxesComponent,
    VlansComponent,
    CountriesComponent,
    ProvincesComponent,
    CitiesComponent,
    CashBoxesTwoComponent,
    CuadrillasComponent,
    UsersComponent,
    OntModelsComponent,
    OntComponent,
    LoginComponent,
    RegisterComponent,
    CreateServiceComponent,
    HistorialComponent,
    FilterHistorialPipe,
    SaveCitiesComponent,
    SaveProvincesComponent,
    FilterProvincePipe,
    FilterCountryPipe,
    FilterRolPipe,
    FilterCityPipe,
    FilterVlansPipe,
    FilterCashBoxOnePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSliderModule,
    ClipboardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxsModule.forRoot([
      CitiesState,
      ProvincesState,
      PaisState,
      OntState,
      OntModelsState,
      VlansState,
      CashBoxesState,
      CashBoxState,
      UsersState,
      ClientState,
      ServicesState,
      PlanState,
      LoginState
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
