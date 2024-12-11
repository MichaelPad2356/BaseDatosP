
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {

  productos: any[] = [];  // Array para almacenar los productos obtenidos desde la API

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerProductos();  // Llamamos a obtener los productos al iniciar el componente
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
}