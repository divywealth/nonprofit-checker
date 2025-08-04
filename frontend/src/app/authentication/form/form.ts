import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  @Input() formGroup!: FormGroup;
  @Input() buttonText: string = '';
  @Output() submitForm = new EventEmitter()
  showPassword = false;
  @Input() isSpinner = false

  togglePassword() {
    console.log('hi');
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.submitForm.emit()
  }
}
