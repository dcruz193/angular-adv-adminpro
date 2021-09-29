import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone  ) { 
    
    this.usuario = new Usuario('','');
    
    this.googleInit();
  }

  googleInit() {
    return new Promise( (resolve: any) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '829567710653-nhtsdb16e64iqjsq1u3gn3j9mdpdrnd7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      });

    });
  };

  get token(): string {
    return localStorage.getItem('token') || '';    
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  logout(){

    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () =>{

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');

      })
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res: any) => {
        
        const { email, google, nombre, role, img = '', uid } = res.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError( error => of(false))
    );

  }

  actualizarUsuario( data: Usuario ){

    data = {
      ...data,
      role: this.usuario.role,
      imageUrl: ''
    };

    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data,  {
      headers: {
        'x-token': this.token
      }
    });

  }

  crearUsuario( formData: RegisterForm ){

   return this.http.post(`${ base_url }/usuarios`, formData)
              .pipe(
                tap( (res: any ) => {
                  localStorage.setItem('token', res.token)
                  
                })
              )
    
  }

  login( formData: LoginForm ){

   return this.http.post(`${ base_url }/login`, formData)
                  .pipe(
                    tap( (res: any ) => {
                      localStorage.setItem('token', res.token)
                      
                    })
                  )
    
  }

  loginGoogle( token: string ){

   return this.http.post(`${ base_url }/login/google`, { token })
                  .pipe(
                    tap( (res: any ) => {
                      localStorage.setItem('token', res.token)
                      
                    })
                  )
    
  }


}
