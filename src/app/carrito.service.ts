import { Injectable } from '@angular/core';

interface Producto {
  nombre: string;
  imagen: string;
  cantidad: number;
  precio: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: Producto[] = [];

  constructor() {}

  // Añadir un producto al carrito
  agregarAlCarrito(producto: Producto) {
    const productoExistente = this.carrito.find(p => p.nombre === producto.nombre);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  // Obtener los productos en el carrito
  obtenerCarrito() {
    return [...this.carrito];
  }

  // Obtener el total de productos en el carrito
  obtenerTotalProductos() {
    return this.carrito.reduce((total, producto) => total + producto.cantidad, 0);
  }

    // Calcular el total a pagar
    obtenerTotalPagar() {
      return this.carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }
  
    // Método para eliminar un producto del carrito
    eliminarProducto(producto: Producto) {
      const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
      if (index !== -1) {
        if (this.carrito[index].cantidad > 1) {
          this.carrito[index].cantidad--;
        } else {
          this.carrito.splice(index, 1);
        }
      }
    }
  
    // Limpiar el carrito
    limpiarCarrito() {
      this.carrito = [];
    }

  
}
