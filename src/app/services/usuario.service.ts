import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone  ) { 
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

  logout(){

    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () =>{

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');

      })
    });
  }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map( res => true),
      catchError( error => of(false))
    );

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
