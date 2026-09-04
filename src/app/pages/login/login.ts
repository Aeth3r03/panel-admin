import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { NotificacionService } from '../../core/services/notificacion/notificacion.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  formulario = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public notificacionService: NotificacionService,
  ) {}

  submit() {
    if(this.formulario.valid) {

      const username = this.formulario.value.username ?? '';
      const password = this.formulario.value.password ?? '';

      this.authService.login(username, password).subscribe({
        next: () => {
          this.notificacionService.limpiar();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err?.status === 401) {
            this.notificacionService.limpiar();
            this.notificacionService.mostrar('Usuario o contraseña incorrectos');
          } else {
            this.notificacionService.limpiar();
            this.notificacionService.mostrar('Error de conexion, intenta de nuevo')
          }
        }
      })
    }
  }
}
