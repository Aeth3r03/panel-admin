import { Component } from '@angular/core';
import { OptionCard } from '../../shared/option-card/option-card';

@Component({
  imports: [OptionCard],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
