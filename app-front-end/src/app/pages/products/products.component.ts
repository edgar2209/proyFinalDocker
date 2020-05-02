import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/models/models';
import { ProductModel2 } from 'src/app/models/modelsProductos';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit, OnDestroy {

  // misdatos: ProductModel[] = []
  misdatos2: ProductModel2[] = []

  constructor(private productsService: ProductsService) { 
    // this.productsService.getAll().subscribe((data:ProductModel2[]) => {
    //     this.misdatos2 = data;
    // })

    this.productsService.getCategory('Planes').subscribe((data:ProductModel2[]) => {
      this.misdatos2 = data;
    });

    //El subscribe se trabaja asincronamente en otro hilo primero va entrar al segundo console por la forma de hilos secuencial
    // this.http.get('assets/data/productos.json').subscribe((data:ProductModel2[]) =>{
    //   this.misdatos2 = data;
    //   console.log('MIS DATOS LEIDOS DENTRO DEL GET | SUBSCRIBE', this.misdatos2);
    // });

    // console.log('MIS DATOS LEIDOS AFUERA DEL GET | SUBSCRIBE', this.misdatos);
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

}
