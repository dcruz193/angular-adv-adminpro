import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public tituloSubs$:any = Subscription;

  constructor( private router: Router) {

    this.tituloSubs$ =  this.getArgumentosRuta()
        .subscribe( data => {
                console.log(data);
              }
    );
   
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

   getArgumentosRuta(){
    return this.router.events.
        pipe( 
          filter( event => event instanceof ActivatedRouteSnapshot ),/* 
          filter( (event: ActivationEnd) => event.snapshot.firstChild == null),
          map( (event: ActivationEnd) => event.snapshot.data) */
          );
   }

  ngOnInit(): void {
  }

}
