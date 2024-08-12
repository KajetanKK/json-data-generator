import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from './data-form/data-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataFormComponent],
  template: '<app-data-form></app-data-form>',
})
export class AppComponent {}