import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgresComponent } from './progres/progres.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
          { path: 'progress', component: ProgresComponent, data: { titulo: 'Progres'} },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica1'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'} },
          { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} },
          { path : 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
          { path : 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
          { path : 'perfil', component: PerfilComponent, data: { titulo: 'Perfil del usuario'} },

          //Mantenimientos
          { path : 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimineto de hospitales'} },
          { path : 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos'} },
          { path : 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medico'} },
          //Rutas admin
          { path : 'usuarios', canActivate:  [AdminGuard],  component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'} },


]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( childRoutes )],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
