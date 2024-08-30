import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .register({ name: this.name, email: this.email, password: this.password })
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          alert('Registration failed');
        }
      );
  }
}
