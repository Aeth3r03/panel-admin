import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-option-card',
  styleUrl: './option-card.css',
  templateUrl: './option-card.html',
})
export class OptionCard {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) descripcion!: string;
  @Input({ required: true }) ruta!: string;
}
