import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../../../models/auth-request';

@Injectable({ providedIn: 'root'})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth/login`;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<TokenResponse> {
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('grant_type', 'password');

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http.post<TokenResponse>(this.apiUrl, body.toString(), { headers }).pipe(
            tap((respuesta) => {
                localStorage.setItem('access_token', respuesta.access_token)
            })
        );
    }

    logout(): void {
        localStorage.removeItem('access_token')
    }
}
