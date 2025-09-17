import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginData } from '../login-data'
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-register',
  imports: [MaterialModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class RegisterComponent implements OnInit {
  submitted = false;
  showSpinner = false;

  registrationForm = new FormGroup({
    fullname: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  })

  get fullname() { return this.registrationForm.get("fullname")!; }
  get email() { return this.registrationForm.get("email")!; }
  get password() { return this.registrationForm.get("password")!; }

  private authService = inject(AuthService);

  ngOnInit(): void {

  }

  register() {
    this.showSpinner = true;
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    let email = this.registrationForm.value["email"] ?? '';
    let password = this.registrationForm.value["password"] ?? '';
    let data: LoginData = { email: email, password: password }

    this.authService.SignUp(data.email, data.password)
      .subscribe({
        next: (res) => {
          console.log('Registration Success:', res);
          this.showSpinner = false;

        },
        error: (err) => {
          console.error('Registration Failed:', err);
          this.showSpinner = false;
        }
      });
  }
}
