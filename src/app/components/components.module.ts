import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    IncrementadorComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
