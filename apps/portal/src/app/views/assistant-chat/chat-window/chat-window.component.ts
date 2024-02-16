import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { OpenAIService } from '../open-ai.service';
import { ThreadMessage } from '../../../../common/interfaces';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() assistant: MenuItem | undefined;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  conversation: ThreadMessage[] = [];

  userQuery = '';

  submitted = false;

  loading = false;

  messageloading = false;

  constructor(
    private openAIService: OpenAIService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.fetchThreadMessages();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line dot-notation
    if (changes['assistant'] && changes['assistant'].currentValue) {
      this.conversation = [];
      this.fetchThreadMessages();
    }
  }

  fetchThreadMessages() {
    if (this.assistant) {
      this.loading = true;
      const threads = localStorage.getItem('threads') || '{}';
      // eslint-disable-next-line dot-notation
      const threadId = JSON.parse(threads)[this.assistant['assistantId']];

      if (threadId) {
        this.openAIService.getThreadMessages(threadId).subscribe({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          next: (resp: any) => {
            this.loading = false;
            this.conversation = resp.data.reverse();
            this.scrollToBottom();
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
      } else {
        this.conversation = [];
        this.loading = false;
      }
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }

  submitQuery() {
    if (this.assistant) {
      this.messageloading = true;
      const queryClone = this.userQuery;
      this.userQuery = 'Fetching Results. Please wait.';
      const threadString = localStorage.getItem('threads') || '{}';
      const threads = JSON.parse(threadString);
      // eslint-disable-next-line dot-notation, prefer-destructuring
      const assistantId = this.assistant['assistantId'];
      const threadId = threads[assistantId];
      this.openAIService.sendMessage(assistantId, this.userQuery, threadId).subscribe({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: (resp: any) => {
          if (resp.status === 'fail') {
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error',
              detail: resp.data[0] || 'Unknown Error',
            });
            this.userQuery = queryClone;
          } else {
            const data = resp.data as ThreadMessage[];

            if (data[0] && data[0].assistant_id) {
              threads[data[0].assistant_id] = data[0].thread_id;
            }

            localStorage.setItem('threads', JSON.stringify(threads));
            this.conversation = data.reverse();
            this.userQuery = '';
            this.scrollToBottom();
          }

          this.messageloading = false;
        },
        error: (error) => {
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.data || error?.message || 'Unknown Error',
          });
          this.messageloading = false;
        },
      });
    }
  }
}
