import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuariosServices: UsuarioService, private router: Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
      return this.usuariosServices.validarToken()
            .pipe(
              tap( estaAutenticado => {
                if ( !estaAutenticado ) {
                  this.router.navigateByUrl('/login');
                }
              })
            )
  }
  
}
