import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel2 } from 'src/app/models/modelsProductos';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  productos: ProductModel2[] = [];
  criterio: string = '';

  constructor(private router: ActivatedRoute, private instanceSvc: ProductsService, private route: Router) { 
    this.router.params.subscribe(params => {
      this.criterio = params['criterio'];

      //console.log('El criterio de busqueda es: ', this.criterio);
      if(this.criterio != ''){
        this.instanceSvc.getProductsByWord(this.criterio).subscribe((data: ProductModel2[]) =>{
          //console.log(this.productos);
          this.productos = data;      
        });
      }
      else{
        this.productos = [];
      }
    })
  }

  ngOnInit() {
  }

  metodoSearch(event: number){
    this.route.navigate(["/about"]);
  }

}
