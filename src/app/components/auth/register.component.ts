import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterDTO, UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: RegisterDTO = { name: '', email: '', password: '' };
  message = '';
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    if (!this.user.name.trim() || !this.user.email.trim() || !this.user.password.trim()) {
      this.message = 'All fields are required';
      return;
    }

    if (this.user.name.trim().length < 3) {
      this.message = 'Name must be at least 3 characters';
      return;
    }

    if (this.user.password.length < 6) {
      this.message = 'Password must be at least 6 characters';
      return;
    }

    this.message = '';
    this.loading = true;

    this.userService.register({
      ...this.user,
      name: this.user.name.trim(),
      email: this.user.email.trim()
    }).subscribe({
      next: (res: string) => {
        this.loading = false;
        this.message = res;
        this.router.navigateByUrl('/login');
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('Registration failed', err);

        if (err.status === 0) {
          this.message = 'Server not reachable';
          return;
        }

        const serverMessage =
          typeof err.error === 'string'
            ? err.error
            : err.error?.message || err.message;

        this.message = serverMessage || `Registration failed (HTTP ${err.status})`;
      }
    });
  }
}
