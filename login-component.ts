import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  errorMessage = '';

  loginForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])

  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid details.';
      return;
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    const success = this.authService.login(email, password);

    if (success) {

      this.errorMessage = '';

      this.router.navigate(['/profile']);

    } else {

      this.errorMessage = 'Invalid email or password.';

    }
  }
}
