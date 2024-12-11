import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  vinos = [
    { nombre: 'Vino Tinto Sauvignon', imagen: '../assets/images/vino_tinto_inv.webp', cantidad: 20, precio: 500, fechaIngreso: '2023-05-15', descripcion: 'Vino tinto con notas de frutos rojos y un toque de roble.', tipo: 'Tinto' },
    { nombre: 'Vino Blanco Chardonnay', imagen: '../assets/images/vino_blanco_inv.jpg', cantidad: 15, precio: 450, fechaIngreso: '2023-05-20', descripcion: 'Vino blanco seco con aromas frutales y frescos.', tipo: 'Blanco' },
    { nombre: 'Vino Rosado Zinfandel', imagen: '../assets/images/vino_rosado_inv.webp', cantidad: 10, precio: 380, fechaIngreso: '2023-05-22', descripcion: 'Vino rosado suave con sabores a fresa y melón.', tipo: 'Rosado' },
    { nombre: 'Vino Espumoso Brut', imagen: '../assets/images/vino_espumoso_inv.webp', cantidad: 25, precio: 600, fechaIngreso: '2023-05-18', descripcion: 'Vino espumoso refrescante con burbujas finas y elegantes.', tipo: 'Espumoso' },
    { nombre: 'Vino Tinto Merlot', imagen: '../assets/images/vino_tinto_merlot.webp', cantidad: 30, precio: 520, fechaIngreso: '2023-05-25', descripcion: 'Vino tinto suave con notas de ciruela y especias.', tipo: 'Tinto' },
    { nombre: 'Vino Blanco Sauvignon', imagen: '../assets/images/vino_blanco_sauvignon.jpg', cantidad: 18, precio: 470, fechaIngreso: '2023-05-17', descripcion: 'Vino blanco fresco con sabores cítricos y herbales.', tipo: 'Blanco' },
    { nombre: 'Vino Rosado Provence', imagen: '../assets/images/vino_rosado_provence.jpg', cantidad: 12, precio: 430, fechaIngreso: '2023-05-16', descripcion: 'Vino rosado de la región de Provenza, ligero y afrutado.', tipo: 'Rosado' },
    { nombre: 'Vino Espumoso Prosecco', imagen: '../assets/images/vino_espumoso_prosecco.jpg', cantidad: 40, precio: 550, fechaIngreso: '2023-05-19', descripcion: 'Vino espumoso italiano con burbujas vivas y un toque dulce.', tipo: 'Espumoso' },
    { nombre: 'Vino Tinto Malbec', imagen: '../assets/images/vino_tinto_malbec.jpg', cantidad: 35, precio: 530, fechaIngreso: '2023-05-21', descripcion: 'Vino tinto argentino con sabores intensos de frutos oscuros.', tipo: 'Tinto' },
    { nombre: 'Vino Blanco Riesling', imagen: '../assets/images/vino_blanco_riesling.jpg', cantidad: 28, precio: 480, fechaIngreso: '2023-05-23', descripcion: 'Vino blanco aromático con notas de manzana y miel.', tipo: 'Blanco' },
    { nombre: 'Vino Rosado Tempranillo', imagen: '../assets/images/vino_rosado_tempranillo.jpg', cantidad: 22, precio: 460, fechaIngreso: '2023-05-24', descripcion: 'Vino rosado español con notas florales y frutales.', tipo: 'Rosado' },
  ];

 filtroActivo: string = 'all';

 constructor(private carritoService: CarritoService) {}

  // Método para añadir al carrito
  agregarAlCarrito(vino: any) {
    this.carritoService.agregarAlCarrito(vino);
  }

 // Método para filtrar vinos
 filtrarVinos(tipo: string) {
   this.filtroActivo = tipo;
 }

 // Método para determinar si un vino debe mostrarse
 mostrarVino(vino: any): boolean {
   return this.filtroActivo === 'all' || vino.tipo === this.filtroActivo;
 }

}