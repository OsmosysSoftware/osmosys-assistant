import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-assistant-chat',
  templateUrl: './assistant-chat.component.html',
  styleUrl: './assistant-chat.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AssistantChatComponent {
  isSidebar = false; // For mobile

  isMobile = window.innerWidth <= 768;

  isSidebarCollapsed = this.isMobile;

  selectedAssistant!: MenuItem | undefined;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  onAssistantSelected(assistant: MenuItem) {
    this.selectedAssistant = assistant;
  }
}
