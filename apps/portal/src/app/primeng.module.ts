import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

const modules = [
  ButtonModule,
  ToastModule,
  ReactiveFormsModule,
  PasswordModule,
  InputTextModule,
  BrowserAnimationsModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class PrimeNgModule {}
