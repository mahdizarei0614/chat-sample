import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'chat-threads-list',
  templateUrl: './chat-threads-list.component.html',
  styleUrl: './chat-threads-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col overflow-auto',
  },
})
export class ChatThreadsListComponent {}
