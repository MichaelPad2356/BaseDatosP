
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];  // Array para almacenar los productos
  filtroActivo: string | number = 'all';  // Filtro inicial

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerProductos();  // Cargar productos al iniciar el componente
  }

  // Obtener productos desde la API
  obtenerProductos(): void {
    const apiUrl = 'http://localhost:3000/api/productos';

    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        if (response.success) {
          this.productos = response.productos;
          console.log('Productos cargados:', this.productos);
        } else {
          console.error('No se pudieron obtener los productos');
        }
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }

  // Método para cambiar el filtro activo
  filtrarVinos(tipo: string | number) {
    this.filtroActivo = tipo;
  }

  // Mostrar productos según el filtro activo
  mostrarVino(producto: any): boolean {
    return this.filtroActivo === 'all' || producto.ID_Categoria === this.filtroActivo;
  }
}
