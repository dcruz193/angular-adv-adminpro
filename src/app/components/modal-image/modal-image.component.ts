import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public ocultarModal: boolean = false;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImageService: ModalImagenService,
              public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImageService.cerrarModal();
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
    
    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;
    
    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo, id)
      .then( img => {
        Swal.fire('Guardado','Imagen actualizada', 'success');
        this.modalImageService.nuevaImagen.emit( img );
        this.cerrarModal();
        
      }, (error => {
        console.log(error);
        
        Swal.fire('Error', 'No se cargo la imagen', 'error');
      }));
  }


}
