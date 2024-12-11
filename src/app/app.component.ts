import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { ProductosComponent } from './productos/productos.component';
import { HeaderComponent } from "./header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InventarioComponent, RouterModule, ProductosComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VINOS DEL VALLE';
  
}
