import { Component } from '@angular/core';
import { CarritoService } from '../carrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  mostrarCarrito = false;

  constructor(public carritoService: CarritoService) {}

  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  limpiarCarrito() {
    this.carritoService.limpiarCarrito();
  }
}