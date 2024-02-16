import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

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
    this.assistants = [
      {
        label: 'Tech Skill Assistant',
        icon: 'pi pi-fw pi-star-fill',
        command: () => {
          this.selectAssistant({
            label: 'Tech Skill Assistant',
            assistantId: 'asst_6SndT0pLTqkvJTtCcV8Sfaxd',
          });
        },
      },
      {
        label: 'Policy Assistant',
        icon: 'pi pi-fw pi-globe',
        command: () => {
          this.selectAssistant({
            label: 'Policy Assistant',
            assistantId: 'asst_6SndT0pLTqkvJTtCcV8Sfaxd',
          });
        },
      },
    ];
  }

  selectAssistant(assistant: MenuItem) {
    this.assistantSelected.emit(assistant);
  }
}
