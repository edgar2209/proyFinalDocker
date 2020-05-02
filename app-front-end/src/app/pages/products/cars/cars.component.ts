import { Component, OnInit } from '@angular/core';
import { ProductModel2 } from 'src/app/models/modelsProductos';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {

  misdatos2: ProductModel2[] = []

  constructor(private productsService: ProductsService) { 
    // this.productsService.getAll().subscribe((data:ProductModel2[]) => {
    //     this.misdatos2 = data;
    // })

    this.productsService.getCategory('cars').subscribe((data:ProductModel2[]) => {
      this.misdatos2 = data;
    });
  }

  ngOnInit() {
  }

}
