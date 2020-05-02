import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductModel2 } from '../models/modelsProductos';
import { Observable, throwError } from 'rxjs';
import { filter } from 'minimatch';
import { catchError, tap, map } from 'rxjs/operators';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

//const URL_PRODUCTS = 'assets/data/productos.json';
const URL_PRODUCTS = 'https://angular-products-grillo.firebaseio.com/productos.json';
const URL_PRODUCTS2 = 'http://api.midominio.com/products/';
const PAIS = 'https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { 

  }

  getAll(){
    return this.http.get(URL_PRODUCTS);
  }

  getPaises(){
    return this.http.get(PAIS);
  }

  getCategoryNode(category: string){
    return this.http.get(URL_PRODUCTS2+category);
    //$http.get(url, { withCredentials: true });
  }

  getCriterioNode(criterio: string){
    return this.http.get(URL_PRODUCTS2+"description/"+criterio);
  }

  getCodigoNode(codigo: string){
    return this.http.get(URL_PRODUCTS2+"product/"+codigo);
  }
    
  getCategory(category: string){
    return new Observable(observer => {
      this.getCategoryNode(category).subscribe((data: ProductModel2[]) => {
        //console.log("Hola");
        //ECMASCRIPT 6 si es un return de una linea no se pone la palabra return se regresa asi.
        //const filter = data.filter(item => item.categoria == category || item.categoria.indexOf(category) >= 0);
        //Con el metodo next el observable regresa el filter al component.
        observer.next(data);
        
      });
    })
    
  }

  getByCode(code: string){
    return new Observable(observer => {
      this.getCodigoNode(code).subscribe((data: ProductModel2[]) => {
        //const filter2 = data.filter(item => item.codigo == code);
        // Se regresa la posicion 0 del arreglo para que solo regrese el json plano y no todo 
        // el arreglo ya que en la vista solo seteamos cada clave valor en un <div class='row'>,
        // otherwise to bind with Interpolation it would be like this {{product[0].codigo}}.
        observer.next(data[0]);
      })
    })
  }

  getProductsByWord(description: string){
    return new Observable(observer => {
      this.getCriterioNode(description).subscribe((data: ProductModel2[]) => {
        // El indexOf si encuentra la palabra completa regresa 1 y si encuentra una coincidencia 
        // divide la palabra en donde encuentra la coincidencia es la primera posicion y el resto
        // de la palabra es la siguiente posicion, ejemplo The Tita regresa 0 y nic seria la posicion 1.
        // let index = "The Titanic";
        // index.indexOf(description);
        // debugger;
        //const filterDescription = data.filter(item => item.descripcion == description || item.descripcion.indexOf(description) >= 0);
        //const filterDescription = data.filter(item => item.descripcion.toLowerCase().includes(description.toLowerCase()));
        // Aqui si se regresa todo el arreglo por que en la vista si barre un arreglo con el ngFor.
        observer.next(data);
      });
    });
  }

  // getProductsByWord(description: string): Observable<ProductModel2[]> {

  //   debugger;
  //   return this.http.get<ProductModel2[]>(URL_PRODUCTS)
  //   .pipe(
  //     tap(
  //       data => data.filter(item => item.descripcion.includes(description))
  //     ),
  //     catchError(this.handleError)
  //   );
  // }


  // private handleError(err: HttpErrorResponse) {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   //console.error(errorMessage);
  //   return throwError(errorMessage);
  // }

  // getPais(){
  //   return new Observable(observer => {
  //     this.getPaises().subscribe((data: ProductModel2[]) => {
  //       observer.next(data);
  //     })
  //   })
  // }

}
