import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class NotificacionService {
    private mensajeSignal = signal<string | null>(null);

    get mensaje() {
        return this.mensajeSignal
    }

    mostrar(texto: string) {
        this.mensajeSignal.set(texto)
    }

    limpiar() {
        this.mensajeSignal.set(null)
    }
}
