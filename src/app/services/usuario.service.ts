import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usarios.interface';

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

  get role(): any{
    return this.usuario.role;
  }

  get headers(){

    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout(){

    localStorage.removeItem('token');

    localStorage.removeItem('menu');
    
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

        this.guardarLocalStorage(res.token, res.menu);
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

    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data, this.headers);

  }

  crearUsuario( formData: RegisterForm ){

   return this.http.post(`${ base_url }/usuarios`, formData)
              .pipe(
                tap( (res: any ) => {
                  this.guardarLocalStorage(res.token, res.menu);
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
                      this.guardarLocalStorage(res.token, res.menu);
                      
                      
                    })
                  )
    
  }

  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  cargarUsuarios( desde: number ){
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers)
          .pipe(
            map( res => {
              
              const usuarios = res.usuarios.map(
                user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
              );
                
              return {
                total: res.total,
                usuarios
              };
              
            })
          )
  }

  eliminarUsuario( usuario: Usuario){

    const url = `${ base_url }/usuarios/${usuario.uid}`;
    return this.http.delete( url, this.headers);
    
  }

  guardarUsuario( usuario: Usuario ){

    return this.http.put(`${ base_url }/usuarios/${usuario.uid}`, usuario, this.headers);

  }


}
