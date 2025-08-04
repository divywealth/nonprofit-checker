import { Component } from '@angular/core';
import { Form } from '../form/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication';
import { ApiResponse } from '../../../interfaces/auth-response';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  imports: [Form, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
  isSpinner = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  async handleLogin() {
    const data = this.loginForm.value;
    this.isSpinner = true;
    try {
      const response: User = await this.authService.signIn(data)
      this.isSpinner = false
      this.toastr.success('Sign in successful', 'Success')
      const token = response.access_token as string
      const user = response.user;
      localStorage.setItem('token', token)
      this.router.navigate(['/']);
    } catch (error: any) {
      this.isSpinner = false;
      const errMsg = error?.response?.data?.message || 'Login failed';
      this.toastr.error(errMsg, 'Error')
    }
  }
}
