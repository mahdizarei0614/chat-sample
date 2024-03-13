import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
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
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatContentElement', { read: ElementRef })
  chatContentElement!: ElementRef;
  private _cdr = inject(ChangeDetectorRef);
  user = {
    name: 'Mahdi Zarei',
  };
  randomNameArr =
    'Mahdi Mohammad Ali Bahareh Amir Hossein Aria Zahra Mehrdad'.split(' ');
  randomFamilyArr =
    'Zarei Ghanbari Mosayeban Kazemi Tahmasb Radmand Razavi'.split(' ');
  randomTextArr = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
    'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ' +
    'esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
    'culpa qui officia deserunt mollit anim id est laborum.'
  ).split(' ');
  threads: WritableSignal<Thread[]> = signal(
    Array(20)
      .fill(null)
      .map(() => ({
        id: Math.random() * 1000,
        title:
          this.randomNameArr[
            Math.floor(this.randomNameArr.length * Math.random())
          ] +
          ' ' +
          this.randomFamilyArr[
            Math.floor(this.randomFamilyArr.length * Math.random())
          ],
        avatar:
          'https://picsum.photos/100?workAround=' +
          Math.floor(Math.random() * 100),
        status: Math.floor(Math.random() * 4),
        lastActivity: this.randomDate(new Date('2024-03-03'), new Date()),
        unreadCount: Math.round(Math.random())
          ? 1 + Math.floor(Math.random() * 20)
          : 0,
        pinned: !!Math.round(Math.random()),
        muted: !!Math.round(Math.random()),
        lastMessage: {
          id: Math.random() * 1000,
          owner: {
            id: 1234,
            avatar:
              'https://picsum.photos/100?workAround=' +
              Math.floor(Math.random() * 100),
            name: this.user.name,
          },
          text: this.shuffle(
            this.randomTextArr.slice(
              0,
              1 + Math.floor(this.randomTextArr.length * Math.random()),
            ),
          ).join(' '),
          createdAt: new Date(),
          deliveredAt: new Date(),
          readAt: new Date(),
        },
      })),
  );
  selectedThread: WritableSignal<Thread | undefined> = signal(undefined);
  messages: WritableSignal<Message[] | undefined> = signal(undefined);
  replyingMessage: WritableSignal<Message | undefined> = signal(undefined);
  messageText = '';

  ngOnInit() {
    if (isBrowser()) {
      document.body.classList.add('chat-mode');
    }
  }

  ngOnDestroy() {
    if (isBrowser()) {
      document.body.classList.remove('chat-mode');
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
          id: Math.random() * 1000,
          owner: {
            id: 1234,
            avatar:
              'https://picsum.photos/100?workAround=' +
              Math.floor(Math.random() * 100),
            name: this.user.name,
          },
          text: this.messageText,
          createdAt: new Date(),
          deliveredAt: new Date(),
          readAt: new Date(),
        },
      ]);
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
              id: Math.random() * 1000,
              owner: {
                id: 4321,
                avatar:
                  'https://picsum.photos/100?workAround=' +
                  Math.floor(Math.random() * 100),
                name: this.selectedThread()?.title ?? '',
              },
              text: this.shuffle(
                this.randomTextArr.slice(
                  0,
                  1 + Math.floor(this.randomTextArr.length * Math.random()),
                ),
              ).join(' '),
              createdAt: new Date(),
              deliveredAt: new Date(),
              readAt: new Date(),
            },
          ]);
          this.scrollToBottom(true);
        }, 2000);
      }
    }
  }

  addAttachment(): void {}

  selectThread(thread: Thread): void {
    this.selectedThread.set(thread);
    this.messages.set(
      Array(40)
        .fill(null)
        .map(() => {
          const ownerUser = Math.round(Math.random());
          const messageType = Math.random();
          const hasText = Math.round(Math.random());
          const imgOriginalWidth = Math.floor(Math.random() * 200) + 200;
          const imgOriginalHeight = Math.floor(Math.random() * 200) + 200;
          return {
            id: Math.random() * 1000,
            owner: {
              id: ownerUser ? 1234 : 4321,
              avatar:
                'https://picsum.photos/100?workAround=' +
                Math.floor(Math.random() * 100),
              name: ownerUser ? this.user.name : thread.title,
            },
            text:
              (messageType > 0.5 && hasText) || messageType <= 0.5
                ? this.shuffle(
                    this.randomTextArr.slice(
                      0,
                      1 +
                        Math.floor(
                          (messageType > 0.5 ? 30 : this.randomTextArr.length) *
                            Math.random(),
                        ),
                    ),
                  ).join(' ')
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
                    url: `https://picsum.photos/${Math.floor(Math.random() * 2000)}/${Math.floor(
                      Math.random() * 2000,
                    )}?workAround=${Math.floor(Math.random() * 100)}`,
                    originalWidth: imgOriginalWidth,
                    originalHeight: imgOriginalHeight,
                  }
                : undefined,
            createdAt: this.randomDate(new Date('2024-03-03'), new Date()),
            deliveredAt: new Date(),
            readAt: new Date(),
          };
        })
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    );
    setTimeout(() => this.scrollToBottom(true, true));
  }

  randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let randomIndex = 1;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
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
