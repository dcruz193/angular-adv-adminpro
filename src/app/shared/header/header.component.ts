import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  constructor( private router: Router, 
                private usuarioService: UsuarioService  ) { 
      this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  buscar( termino: string ){

    if ( termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`)
    
  }

}
