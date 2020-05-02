import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel2 } from 'src/app/models/modelsProductos';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent implements OnInit {

  // variables de entrada para pasarse variables entre componentes.
  @Input() products: ProductModel2[];
  @Input() category: string = '';
  @Input() criterio: string = '';
  @Output() onClickRedirect: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  redirect(precio: number){
    this.onClickRedirect.emit(precio);
  }

}
