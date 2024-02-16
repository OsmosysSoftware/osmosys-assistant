import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { Environment } from '../../../../common/interfaces';

@Component({
  selector: 'app-assistant-list',
  templateUrl: './assistant-list.component.html',
  styleUrls: ['./assistant-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssistantListComponent implements OnInit {
  @Output() assistantSelected = new EventEmitter<MenuItem>();

  assistants: MenuItem[] = [];

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.assistants = (environment as Environment).assistants.map((assistant: any) => ({
      label: assistant.label,
      icon: assistant.icon,
      command: () => {
        this.selectAssistant({
          label: assistant.label,
          assistantId: assistant.id,
        });
      },
    }));
  }

  selectAssistant(assistant: MenuItem) {
    this.assistantSelected.emit(assistant);
  }
}
