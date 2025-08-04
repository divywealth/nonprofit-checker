import { Component } from '@angular/core';
import { Form } from '../form/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user.interface';
import { ApiResponse } from '../../../interfaces/auth-response';

@Component({
  selector: 'app-register',
  imports: [Form, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;
  isSpinner = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  async handleRegister() {
    const data = this.registerForm.value;
    this.isSpinner = true;
    try {
      const response: ApiResponse<User> = await this.authService.signUp(data);
      this.isSpinner = false;
      this.toastr.success(response?.message || 'Login successful!', 'Success')
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.isSpinner = false;
      const errMsg = error?.response?.data?.message || 'Registration failed';
      this.toastr.error(errMsg, 'Error')
    }

  }
}
