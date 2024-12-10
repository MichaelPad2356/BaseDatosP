import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {

  productos = [
    { nombre: 'Bistec', imagen: '../assets/images/bistec.jpg', cantidad: 20, precio: 150, fechaIngreso: '2023-05-15', descripcion: 'Corte de carne de res de primera calidad.' },
    { nombre: 'Chamorro', imagen: '../assets/images/chamorro.png', cantidad: 15, precio: 120, fechaIngreso: '2023-05-20', descripcion: 'Chamorro fresco ideal para guisados.' },
    { nombre: 'Arrachera', imagen: '../assets/images/arrachera.jpg', cantidad: 10, precio: 200, fechaIngreso: '2023-05-22', descripcion: 'Deliciosa arrachera marinada.' },
    { nombre: 'Chuleta', imagen: '../assets/images/chuleta.jpg', cantidad: 25, precio: 130, fechaIngreso: '2023-05-18', descripcion: 'Chuletas de cerdo jugosas.' },
    { nombre: 'Molida', imagen: '../assets/images/molida.jpg', cantidad: 30, precio: 100, fechaIngreso: '2023-05-25', descripcion: 'Carne molida de res.' },
    { nombre: 'Costilla', imagen: '../assets/images/costilla.jpg', cantidad: 18, precio: 180, fechaIngreso: '2023-05-17', descripcion: 'Costilla de cerdo para asar.' },
    { nombre: 'Trocito', imagen: '../assets/images/trocito.jpg', cantidad: 12, precio: 90, fechaIngreso: '2023-05-16', descripcion: 'Trozo de carne de res.' },
    { nombre: 'Pollo entero', imagen: '../assets/images/pollo.jpg', cantidad: 40, precio: 160, fechaIngreso: '2023-05-19', descripcion: 'Pollo entero fresco.' },
    { nombre: 'Pierna y muslo', imagen: '../assets/images/pierna.png', cantidad: 35, precio: 140, fechaIngreso: '2023-05-21', descripcion: 'Pierna y muslo de pollo.' },
    { nombre: 'Pechuga', imagen: '../assets/images/pechuga.jpg', cantidad: 28, precio: 150, fechaIngreso: '2023-05-23', descripcion: 'Pechuga de pollo.' },
    { nombre: 'Bistec de pollo Ala', imagen: '../assets/images/bistec_pollo.jpg', cantidad: 22, precio: 170, fechaIngreso: '2023-05-24', descripcion: 'Bistec de pollo Ala.' },
  ];

  constructor(private router: Router) {}

  onEdit(producto: any) {
    this.router.navigate(['/edit-product'], {
      queryParams: {
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precio: producto.precio,
        fechaIngreso: producto.fechaIngreso,
        descripcion: producto.descripcion,
        imagen: producto.imagen
      }
    });
  }

  ngOnInit(): void {
  }

}