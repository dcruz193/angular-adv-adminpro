import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  
  menuItems: any[];
  
  constructor( private sidebarService: SidebarService,
               private usuarioServices: UsuarioService ) { 
    this.menuItems = sidebarService.menu;

  }

  logout(){
    this.usuarioServices.logout();
  }

  ngOnInit(): void {
  }

}
