import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  paises: any[] = [];

  constructor(private productsService: ProductsService) { 
     this.productsService.getPaises().subscribe((data: any[]) => {
        this.paises = data;
        console.log(data);
    })
  }

  ngOnInit() {
  }

}
