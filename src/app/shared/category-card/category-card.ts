import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { environment } from '../../../environments/environment';

@Component({
  imports: [],
  selector: 'app-category-card',
  styleUrl: './category-card.css',
  templateUrl: './category-card.html',
})
export class CategoryCard {
  @Input({ required: true }) categoria!: Categoria;
  @Input({ required: false }) cantidad_productos: number = 5;
  @Output() editar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();
  placeholder = '/imagenes/categoria-placeholder.jpg'

  get urlImagen(): string {
    if (this.categoria.imagen_url) {
      return environment.backendUrl + this.categoria.imagen_url;
    }
    return this.placeholder
  }
}
