import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
      
    })
/*     const promesa = new Promise( (resolve, reject) => {
      if (false) {
        resolve('Resolve Hola Mundo');
      }else{
        reject('Algo Salio mal')
      }
    });

    promesa.then( (message) => {
      console.log(message);
    })
    .catch( error => console.log('Error en mi promesa', error));
    
    console.log('Fin del init'); */
    
  }

  getUsuarios(){

    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( res => res.json() )
        .then( body => resolve( body.data ) );

    });

    return promesa;
  }

}
