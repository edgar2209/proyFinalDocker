import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel2 } from 'src/app/models/modelsProductos';
import { ProductModel } from 'src/app/models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  misdatos2: ProductModel2[] = [];
  // se declara esta variable global para poder usarla desde la vista y mandarla como parametro a la vista de product. 
  category: string = '';

  constructor(private router: ActivatedRoute, private productSvc: ProductsService, private route: Router) {
    this.router.params.subscribe(params => {
      this.category = params['category'];
      // console.log('PARAM: ', category);
      this.productSvc.getCategory(this.category).subscribe((data: ProductModel2[]) =>{
        this.misdatos2 = data;
      })
    })
  }

  ngOnInit() {
  }

  metodoCat(event: number){
    console.log();
    this.route.navigate(["/home"]);
  }

}
