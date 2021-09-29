import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilGroup: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;


  constructor( private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) { 

    this.usuario = usuarioService.usuario;

    this.perfilGroup = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required],
      email: [ this.usuario.email , [Validators.required, Validators.email] ]
    });

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

  }

  actualizarPerfil(  ){
    console.log( this.perfilGroup.value );
    this.usuarioService.actualizarUsuario( this.perfilGroup.value )
            .subscribe( () => {
              const { nombre, email } = this.perfilGroup.value;
              this.usuario.nombre = nombre;
              this.usuario.email = email;

              Swal.fire('Guardado','Los cambios fueron guardados', 'success');
              
            }, (err) => {
              Swal.fire('Error', err.error.msg, 'error');

            });
    
  }

  cambiarImagen( file: any ){

    this.imagenSubir =  file.target.files[0];

    if ( !file ) { 
      return this.imgTemp = null ;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL( this.imagenSubir );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      
    }

    return this.imgTemp;
    
  }

  subirImagen(){
    console.log('Imagen',this.imagenSubir);
    
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuarioService.uid )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado','Imagen actualizada', 'success');

        
      }, (error => {
        console.log(error);
        
        Swal.fire('Error', 'No se cargo la imagen', 'error');
      }));
  }

}
