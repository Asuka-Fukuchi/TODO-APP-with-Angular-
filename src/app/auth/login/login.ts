import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginData } from '../login-data'
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-login',
  imports: [MaterialModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class LoginComponent {
  submitted = false;
  showSpinner = false;
  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  })

  get email() { return this.loginForm.get("email")!; }
  get password() { return this.loginForm.get("password")!; }

  private authService = inject(AuthService);

  ngOnInit(): void {
  }

  login() {
    this.showSpinner = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.value["email"]!;
    let password = this.loginForm.value["password"]!;
    let data: LoginData = { email: email, password: password }

    this.authService.SignIn(data.email, data.password)
      .subscribe({
        next: (res) => {
          console.log('Login Success:', res);
          this.showSpinner = false;
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Login Failed:', err);
          this.showSpinner = false;

          switch (err.code) {
            case 'auth/user-not-found':
              this.errorMessage = 'No account found with this email address.';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Incorrect password. Please try again.';
              break;
            case 'auth/invalid-email':
              this.errorMessage = 'Invalid email format.';
              break;
            case 'auth/network-request-failed':
              this.errorMessage = 'Network error. Please check your connection.';
              break;
            default:
              this.errorMessage = 'Login failed. Please try again.';
          }
        }
      });
  }
}
