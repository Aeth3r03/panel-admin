import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service';
@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
