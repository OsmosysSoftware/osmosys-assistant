import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { PrimeNgModule } from './primeng.module';
import { AssistantChatComponent } from './views/assistant-chat/assistant-chat.component';
import { AssistantListComponent } from './views/assistant-chat/assistant-list/assistant-list.component';
import { ChatWindowComponent } from './views/assistant-chat/chat-window/chat-window.component';
import { AuthInterceptor } from './common/interceptors/http-interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssistantChatComponent,
    AssistantListComponent,
    ChatWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PrimeNgModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
