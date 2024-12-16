import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  productos: any[] = [];  // Array para almacenar los productos obtenidos desde la API
  stockCategoria: any[] = [];  // Array para almacenar los datos de stock por categoría
  productosMasVendidos: any[] = [];  // Array para almacenar los productos más vendidos
  pedidos: any[] = []; // Array para almacenar los datos de los pedidos
  mostrarModal: boolean = false; // Estado para controlar si el modal está visible o no
  categoriasMasVendidas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerProductos();  // Llamamos a obtener los productos al iniciar el componente
    this.obtenerStockPorCategoria();  // Llamamos a obtener el reporte de stock por categoría
    this.obtenerProductosMasVendidos();  // Llamamos al método para obtener los productos más vendidos
    this.obtenerCategoriasMasVendidas();
  }

  // Método para obtener los productos desde la API
  obtenerProductos(): void {
    const apiUrl = 'http://localhost:3000/api/productos';  // URL del endpoint

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.productos = response.productos;  // Almacena los productos en el array
        } else {
          console.error('No se pudieron obtener los productos');
        }
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }

  // Método para obtener el reporte de stock por categoría desde la API
  obtenerStockPorCategoria(): void {
    const apiUrl = 'http://localhost:3000/api/reportes/stock-categoria';  // URL del endpoint de la vista

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.stockCategoria = response.stock;  // Almacena los datos de stock por categoría
        } else {
          console.error('No se pudo obtener el stock por categoría');
        }
      },
      error: (err) => {
        console.error('Error al obtener stock por categoría', err);
      }
    });
  }

  // Método para obtener los productos más vendidos desde la API
  obtenerProductosMasVendidos(): void {
    const apiUrl = 'http://localhost:3000/api/productos-mas-vendidos';  // URL del endpoint de la vista

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.productosMasVendidos = response.productos;  // Almacena los productos más vendidos
        } else {
          console.error('No se pudieron obtener los productos más vendidos');
        }
      },
      error: (err) => {
        console.error('Error al obtener productos más vendidos', err);
      }
    });
  }

  // Método para abrir el modal
  abrirModal(): void {
    this.mostrarModal = true;
    this.obtenerPedidos(); // Cargar los pedidos cuando se abre el modal
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
  }

    // Método para obtener los pedidos desde el servidor
    obtenerPedidos(): void {
      const apiUrl = 'http://localhost:3000/api/pedidos'; // Cambia la URL si es necesario
    
      this.http.get<any>(apiUrl).subscribe({
        next: (response) => {
          if (response.success) {
            this.pedidos = response.pedidos; // Asegúrate de usar el nombre correcto del campo
            console.log(this.pedidos); // Verifica en la consola que los datos se carguen correctamente
          } else {
            console.error('No se pudieron obtener los pedidos:', response.message);
          }
        },
        error: (err) => {
          console.error('Error al obtener pedidos:', err);
        }
      });
    }

    // Método para obtener categorías con ventas mayores a 5000
obtenerCategoriasMasVendidas(): void {
  const apiUrl = 'http://localhost:3000/api/categorias-mas-vendidas';

  this.http.get<any>(apiUrl).subscribe({
    next: (response) => {
      if (response.success) {
        console.log('Categorías con ventas mayores a 5000:', response.categorias);
        this.categoriasMasVendidas = response.categorias;  // Almacena los resultados
      } else {
        console.error('No se pudieron obtener las categorías más vendidas');
      }
    },
    error: (err) => {
      console.error('Error al obtener las categorías más vendidas:', err);
    }
  });
}

}
