import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { NotificacionService } from "../services/notificacion/notificacion.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const notificacion = inject(NotificacionService);
    const token = localStorage.getItem('access_token');

    const reqClonada = token 
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`} })
        : req;

    return next(reqClonada).pipe(
        catchError((error) => {
            if (error.status === 401 && !req.urlWithParams.includes('/auth/login')) {
                localStorage.removeItem('access_token');
                notificacion.mostrar('Sesión expirada, inicia sesión nuevamente');
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};