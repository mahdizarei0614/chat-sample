import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { ChatThreadsListToolbarComponent } from '../chat-threads-list-toolbar/chat-threads-list-toolbar.component';
import { ChatThreadsListComponent } from '../chat-threads-list/chat-threads-list.component';
import { ChatThreadComponent } from '../chat-thread/chat-thread.component';
import { ChatContentToolbarComponent } from '../chat-content-toolbar/chat-content-toolbar.component';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { UtilChatTimeBadgePipe } from '../util-chat-time-badge.pipe';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { isBrowser } from '../../../app.component';
import random from '@skybluedev/random.js';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    ChatThreadsListToolbarComponent,
    ChatThreadsListComponent,
    ChatThreadComponent,
    ChatContentToolbarComponent,
    ChatContentComponent,
    UtilChatTimeBadgePipe,
    ChatMessageComponent,
    FormsModule,
  ],
  animations: [
    trigger('inContentAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(50%, 50%)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'scale(100%, 100%)' }),
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(100%, 100%)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(50%, 50%)' }),
        ),
      ]),
    ]),
    trigger('inOutReplyingMessage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(50%)' }),
        ),
      ]),
    ]),
  ],
})
export class ChatComponent {
  @ViewChild('chatContentElement', { read: ElementRef })
  chatContentElement!: ElementRef;
  user = {
    name: 'Mahdi Zarei',
  };
  threads: WritableSignal<Thread[]> = signal(
    Array(20)
      .fill(null)
      .map(() => ({
        id: random.number.get({ min: 1, max: 10000 }),
        title: random.string.get(2).replaceAll(',', '').replaceAll('.', ''),
        avatar: random.image.get(100),
        status: random.number.get({ max: 3 }),
        lastActivity: random.date.get(),
        unreadCount: random.boolean.get() ? random.number.get({ max: 20 }) : 0,
        pinned: random.boolean.get(),
        muted: random.boolean.get(),
        lastMessage: {
          id: random.number.get(),
          owner: {
            id: 1234,
            avatar: random.image.get(100),
            name: this.user.name,
          },
          text: random.string.get({ max: 200 }),
          createdAt: random.date.get(),
          deliveredAt: new Date(),
          readAt: new Date(),
        },
      })),
  );
  selectedThread: WritableSignal<Thread | undefined> = signal(undefined);
  messages: WritableSignal<Message[] | undefined> = signal(undefined);
  replyingMessage: WritableSignal<Message | undefined> = signal(undefined);
  messageText = '';

  constructor() {
    if (isBrowser()) {
      setInterval(() => {
        console.log(random.string.get(10));
      }, 200);
    }
  }

  scrollToBottom(force = false, instant = false): void {
    const container = this.chatContentElement?.nativeElement;
    if (
      container &&
      container.scroll &&
      (force || container.scrollTopMax - container.scrollTop < 300)
    ) {
      setTimeout(() =>
        container.scrollTo({
          top: container.scrollHeight,
          behavior: instant ? 'instant' : 'smooth',
        }),
      );
    }
  }

  async checkInput(event: unknown): Promise<void> {
    this.messageText = (
      event as { target: { innerText: string } }
    ).target.innerText;
  }

  sendMessage(): void {
    if (this.messageText?.trim().length) {
      this.messages?.set([
        ...(this.messages() as Message[]),
        {
          id: random.number.get(),
          owner: {
            id: 1234,
            avatar: random.image.get(100),
            name: this.user.name,
          },
          text: this.messageText,
          createdAt: new Date(),
          deliveredAt: new Date(),
          readAt: new Date(),
        },
      ]);
      setTimeout(() => {
        this.messageText = '';
        if (isBrowser()) {
          const inputMessage = document.getElementById('chat-textarea');
          if (inputMessage) {
            inputMessage.focus();
            inputMessage.innerText = '';
          }
          this.scrollToBottom(true);
          setTimeout(() => {
            this.messages?.set([
              ...(this.messages() as Message[]),
              {
                id: random.number.get(),
                owner: {
                  id: 4321,
                  avatar: random.image.get(100),
                  name: this.selectedThread()?.title ?? '',
                },
                text: random.string.get({ max: 200 }),
                createdAt: new Date(),
                deliveredAt: new Date(),
                readAt: new Date(),
              },
            ]);
            this.scrollToBottom(true);
          }, 2000);
        }
      });
    }
  }

  addAttachment(): void {}

  selectThread(thread: Thread): void {
    this.selectedThread.set(thread);
    this.messages.set(
      Array(40)
        .fill(null)
        .map(() => {
          const ownerUser = random.boolean.get();
          const messageType = Math.random();
          const hasText = random.boolean.get();
          const imgOriginalWidth = random.number.get({
            min: 200,
            max: 400,
          });
          const imgOriginalHeight = random.number.get({
            min: 200,
            max: 400,
          });
          return {
            id: random.number.get(),
            owner: {
              id: ownerUser ? 1234 : 4321,
              avatar: random.image.get(100),
              name: ownerUser ? this.user.name : thread.title,
            },
            text:
              (messageType > 0.5 && hasText) || messageType <= 0.5
                ? random.string.get(
                    messageType > 0.5 ? { max: 30 } : { max: 200 },
                  )
                : undefined,
            file:
              messageType > 0.85
                ? {
                    name: 'a file',
                    ext: ['png', 'jpg', 'pdf', 'docs', 'csv'][
                      Math.floor(Math.random() * 5)
                    ],
                    size:
                      Math.round(Math.random() * 100) +
                      ' ' +
                      ['byte', 'kb', 'mb'][Math.floor(Math.random() * 3)],
                  }
                : undefined,
            image:
              messageType <= 0.85 && messageType > 0.5
                ? {
                    name: 'a photo',
                    url: random.image.get({
                      width: random.number.get({ max: 2000 }),
                      height: random.number.get({ max: 2000 }),
                    }),
                    originalWidth: imgOriginalWidth,
                    originalHeight: imgOriginalHeight,
                  }
                : undefined,
            createdAt: random.date.get(new Date('2024-03-03'), new Date()),
            deliveredAt: new Date(),
            readAt: new Date(),
          };
        })
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    );
    setTimeout(() => this.scrollToBottom(true, true));
  }
}

export type Thread = {
  id: number;
  title: string;
  avatar: string;
  status: ThreadStatus;
  lastActivity: Date;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
  lastMessage: Message;
};

export type Message = {
  id: number;
  owner: User;
  text?: string;
  file?: MessageFile;
  image?: MessageImage;
  createdAt: Date;
  deliveredAt: Date;
  readAt: Date;
};

export enum ThreadStatus {
  LastSeen,
  Offline,
  Online,
  Busy,
}

export type User = {
  id: number;
  avatar: string;
  name: string;
};

export type MessageFile = {
  name: string;
  ext: string;
  size: string;
};

export type MessageImage = {
  name: string;
  url: string;
  originalWidth: number;
  originalHeight: number;
};
