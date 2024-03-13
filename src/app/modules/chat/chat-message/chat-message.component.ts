import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';
import { UtilDateToHhMmPipe } from '../util-date-to-hh-mm.pipe';
import { Message, MessageImage } from '../chat/chat.component';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle, UtilDateToHhMmPipe],
  animations: [
    trigger('inPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0, 0)' }),
        animate(
          '300ms ease-in-out',
          style({ opacity: 1, transform: 'scale(100%, 100%)' }),
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(100%, 100%)' }),
        animate(
          '300ms ease-in-out',
          style({ opacity: 0, transform: 'scale(0, 0)' }),
        ),
      ]),
    ]),
  ],
})
export class ChatMessageComponent {
  @Input() message!: Message;
  @Input() showSender = false;
  @Input() nextIsSame = false;
  @Input() pervIsSame = false;
  @Input() badge = false;
  @Input() nextHasBadge = false;
  @Input() badgeLabel = '';
  @Output() reply = new EventEmitter<Message>();
  userId = 1234;

  imageRatio(
    image: MessageImage,
  ): MessageImage & { displayWidth: number; displayHeight: number } {
    const { originalWidth, originalHeight } = image;
    let displayWidth = 0;
    let displayHeight = 0;
    if (originalWidth > originalHeight) {
      const ratio = originalWidth / 320;
      displayWidth = originalWidth / ratio;
      displayHeight = originalHeight / ratio;
    } else {
      const ratio = originalHeight / 320;
      displayWidth = originalWidth / ratio;
      displayHeight = originalHeight / ratio;
    }
    return { ...image, displayWidth, displayHeight };
  }
}
