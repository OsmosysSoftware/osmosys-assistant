import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const modules = [
  ButtonModule,
  ToastModule,
  ReactiveFormsModule,
  PasswordModule,
  InputTextModule,
  SidebarModule,
  MenuModule,
  InputTextareaModule,
  ProgressSpinnerModule,
  BrowserAnimationsModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class PrimeNgModule {}
