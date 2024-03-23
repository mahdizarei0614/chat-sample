import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Thread } from '../chat/chat.component';

@Component({
  selector: 'chat-content-toolbar',
  templateUrl: './chat-content-toolbar.component.html',
  styleUrl: './chat-content-toolbar.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  host: {
    class:
      'flex gap-4 justify-start items-center px-4 w-full py-2 h-16 flex bg-default-7 backdrop-blur-lg z-10',
  },
})
export class ChatContentToolbarComponent {
  @Input() thread?: Thread;
  @Output() back = new EventEmitter<void>();
}
