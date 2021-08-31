import { NgModule } from '@angular/core';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';

import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
