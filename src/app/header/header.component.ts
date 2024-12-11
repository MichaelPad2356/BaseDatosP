import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  constructor(private carritoService: CarritoService) {}

  // Obtener el total de productos en el carrito
  obtenerTotalProductos() {
    return this.carritoService.obtenerTotalProductos();
  }
}
