import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data-form.component.html',
})

export class DataFormComponent {
  dataForm: FormGroup;
  formData = signal({ id: '', name: '', surname: '', email: '', phone: '' });
  jsonData = signal<string | null>(null);
  showJson = signal(false);

  constructor(private fb: FormBuilder) {
    this.dataForm = this.fb.group({
      id: [''],
      name: [''],
      surname: [''],
      email: [''],
      phone: ['']
    });

    this.dataForm.valueChanges.subscribe(value => {
      this.formData.set(value);
      this.jsonData.set(JSON.stringify(this.formData(), null, 2));
      this.updateShowJson();
    });
  }

  updateShowJson() {
    const data = this.formData();
    this.showJson.set(data.id.trim() !== '' || data.name.trim() !== '' || data.surname.trim() !== '' || data.email.trim() !== '' || data.phone.trim() !== '');
  }

  createDownloadLink(): string | null {
    const jsonData = this.jsonData();
    if (!jsonData) return null;
    const blob = new Blob([jsonData], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }
}