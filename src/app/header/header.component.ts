import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  usuarioInput: string = '';  // Campo del formulario (correo)
  contra: string = '';  // Campo del formulario (contraseña)
  usuario: any = null;  // Información del usuario logueado
  mostrarLogin: boolean = false;  // Modal de login

  constructor(private carritoService: CarritoService, private http: HttpClient) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.usuario = JSON.parse(usuarioGuardado);
      }
    }
  }
  
  // Obtener el total de productos en el carrito
  obtenerTotalProductos() {
    return this.carritoService.obtenerTotalProductos();
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
          localStorage.setItem('usuario', JSON.stringify(this.usuario));  // Persistir sesión
          this.mostrarLogin = false;  // Cerrar modal
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
    localStorage.removeItem('usuario');  // Eliminar sesión
  }

  // Verificar si el usuario es "Admin"
  esAdministrador(): boolean {
    return this.usuario && this.usuario.nombre === 'Admin';
  }

}
