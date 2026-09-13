import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Categoria } from "../../../models/categoria";

@Injectable({ providedIn: 'root'})
export class CategoriaService {
    private apiUrl = `${environment.apiUrl}/categorias`;
    constructor(private http: HttpClient) {}

    listarCategorias(nombre?: string): Observable<Categoria[]> {
        const url = nombre ? `${this.apiUrl}/?nombre=${nombre}` : `${this.apiUrl}/`;
        return this.http.get<Categoria[]>(url);
    }

    crearCategoria(nombre: string): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.apiUrl}/`, { nombre })
    }

    actualizarCategoria(categoria_id: number, nombre: string): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.apiUrl}/${categoria_id}`, { nombre })
    }

    eliminarCategoria(categoria_id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${ categoria_id }`)
    }

    subirImagenCategoria(categoria_id: number, imagen: File): Observable<Categoria> {
        const formData = new FormData();
        formData.append('imagen', imagen);
        return this.http.post<Categoria>(`${this.apiUrl}/${categoria_id}/imagen`, formData);
    }
}
