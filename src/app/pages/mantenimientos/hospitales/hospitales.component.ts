import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales: any[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;


  constructor( private hospitalService: HospitalService, 
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe( img => this.cargarHospitales() );
  }

  buscar( termino: string){

    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino)
        .subscribe( resultados=> {
          
          this.hospitales = resultados;
          
        })
    
  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      
    })
  }

  guardarCambios( hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe( res => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
        
      });
    
  }
  eliminarHospital( hospital: Hospital){

    this.hospitalService.borrarHospital(hospital._id)
      .subscribe( res => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
        
      });
    
  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire({
        title: 'Crear hospital',
        text: 'Nombre del hospital',
        inputPlaceholder: 'Nombre del hospital',
        input: 'text',
        showCancelButton: true,

    });

    if ( value.trim().length > 0 ) {
      this.hospitalService.crearHospital( value ).subscribe( (res: any) => {
        this.hospitales.push( res.hospital );
        
      })
    }
    
  }

  abrirModal( hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

}
