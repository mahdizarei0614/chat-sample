import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'chat-threads-list-toolbar',
  templateUrl: './chat-threads-list-toolbar.component.html',
  styleUrl: './chat-threads-list-toolbar.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'relative shrink-0 grow-0 w-full h-16 flex justify-between items-center px-4 ' +
      'bg-default-7 backdrop-blur-lg',
  },
})
export class ChatThreadsListToolbarComponent {}
