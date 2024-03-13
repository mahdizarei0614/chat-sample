import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Thread } from '../chat/chat.component';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrl: './chat-thread.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  host: {
    class:
      'w-full h-[4.5rem] flex gap-2 border-b border-b-gray-200 dark:border-b-default p-2 cursor-pointer ' +
      'bg-teal-50 hover:bg-teal-100 dark:bg-teal-900 hover:dark:bg-teal-950 transition-all',
  },
})
export class ChatThreadComponent {
  @Input() thread!: Thread;
}
