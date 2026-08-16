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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  message = '';

  registerForm = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

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

  register(): void {

    if (this.registerForm.invalid) {
      this.message = 'Please fill all fields correctly.';
      return;
    }

    const name = this.registerForm.value.name!;
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;

    this.authService.register(
      name,
      email,
      password
    );

    this.router.navigate(['/profile']);
  }
}
