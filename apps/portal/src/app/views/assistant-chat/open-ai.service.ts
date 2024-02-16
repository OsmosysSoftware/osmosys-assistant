import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThreadMessage } from '../../../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getThreadMessages(threadId: string): Observable<ThreadMessage[]> {
    const url = `${this.apiUrl}/openai/thread/${threadId}`;
    return this.http.get<ThreadMessage[]>(url);
  }

  sendMessage(
    assistantId: string,
    userQuery: string,
    threadId?: string,
  ): Observable<ThreadMessage[]> {
    const url = `${this.apiUrl}/openai/message`;
    const body = {
      assistantId,
      userQuery,
      ...(threadId && { threadId }),
    };
    return this.http.post<ThreadMessage[]>(url, body);
  }
}
