import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InventarioComponent,RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuarioInput: string = '';  // Nombre de usuario (correo o nombre de usuario)
  contra: string = '';  // Contraseña
  usuario: any = null;  // Información del usuario logueado
  mostrarLogin: boolean = false;  // Controla la visibilidad del modal

  constructor(private http: HttpClient) {
    
  }

  // Método para login
  login() {
    if (!this.usuarioInput || !this.contra) {
      alert("Por favor, ingresa usuario y contraseña.");
      return;
    }
  
    const loginData = { usuario: this.usuarioInput, contraseña: this.contra };
  
    this.http.post('http://localhost:3000/api/login', loginData).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.usuario = response.usuario;  // Almacena la información del usuario
          localStorage.setItem('usuario', JSON.stringify(this.usuario));  // Guarda en localStorage
          this.mostrarLogin = false;  // Cierra el modal
          alert("¡Login exitoso!");
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      },
      error: (err) => {
        console.error("Error en login", err);
        alert("Error al iniciar sesión.");
      }
    });
  }
  

  // Método para logout
  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');  // Elimina la sesión guardada en localStorage
  }
}