import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginRequestBody } from '../auth.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loading = false;

  private fb: FormBuilder = new FormBuilder();

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      selectedUsername: ['', [Validators.required]],
      selectedPassword: ['', [Validators.required]],
    });
  }

  get selectedUsername() {
    return this.loginForm.get('selectedUsername');
  }

  get selectedPassword() {
    return this.loginForm.get('selectedPassword');
  }

  loginWithUsername() {
    this.loading = true;
    const body: LoginRequestBody = {
      username: this.selectedUsername?.value,
      password: this.selectedPassword?.value,
    };
    this.authService.loginUser(body).subscribe({
      next: (resp) => {
        localStorage.setItem('userData', JSON.stringify(resp.data));
        localStorage.setItem('loggedAt', new Date().toISOString());

        if (this.router.url !== '/assistants') {
          this.router.navigate(['assistants']);
        }

        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.data || error?.message || 'Unknown Error',
        });
        this.loading = false;
      },
    });
  }
}
