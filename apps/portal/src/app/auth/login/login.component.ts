import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  loading = false;

  private fb: FormBuilder = new FormBuilder();

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    // Set body background image on component init
    document.body.style.background =
      "url('../../../assets/images/background.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = 'cover';
    document.body.style.margin = '0';
    this.loginForm = this.fb.group({
      selectedUsername: ['', [Validators.required]],
      selectedPassword: ['', [Validators.required]],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  ngOnDestroy() {
    // Reset body background image on component destroy
    document.body.style.background = 'none';
    document.body.style.margin = '';
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
        localStorage.setItem('userData', JSON.stringify(resp));
        localStorage.setItem('token', resp.token);
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
