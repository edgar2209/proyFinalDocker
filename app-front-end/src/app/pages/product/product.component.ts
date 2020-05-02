import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel2 } from 'src/app/models/modelsProductos';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  product: ProductModel2;
  category: string = '';
  criterio: string = '';

  constructor(private router: ActivatedRoute, private productSvc: ProductsService) { 
    this.router.params.subscribe(params =>{
      const code = params['code'];
      this.category = params['category'];
      this.criterio = params['criterio'];

      this.productSvc.getByCode(code).subscribe((data: ProductModel2) => {
        this.product = data;
      })
    })
  }

  ngOnInit() {
  }

}
