import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { PrimeNgModule } from './primeng.module';
import { AssistantChatComponent } from './views/assistant-chat/assistant-chat.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AssistantChatComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, PrimeNgModule, HttpClientModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
