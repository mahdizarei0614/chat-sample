import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'chat-content',
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full flex flex-col grow shrink overflow-auto',
  },
})
export class ChatContentComponent {}
