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
  randomTextArr =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis ut velit ac commodo.
     Ut hendrerit turpis vitae fermentum hendrerit. Pellentesque malesuada risus nec aliquam varius. 
     Pellentesque quis fringilla arcu, sed tempor ipsum. Donec fermentum tempor lectus, efficitur efficitur lorem elementum at. 
     Morbi et euismod quam. Aliquam gravida mauris leo, ac suscipit purus elementum vel. 
     Phasellus mattis lorem in ligula vestibulum finibus. Sed tempor velit tellus, quis auctor nunc molestie nec. 
     Etiam et interdum nisi, nec mattis leo. Donec pharetra aliquet ante ac faucibus. Nullam interdum finibus ex. 
     Fusce commodo feugiat mi, et dignissim erat malesuada a. 
     Nam id nisl augue. Praesent facilisis velit at massa condimentum vehicula. 
     Sed porttitor lorem mollis mauris laoreet, sed interdum ligula placerat. 
     Integer cursus lacus interdum, ullamcorper ex nec, porttitor massa. Etiam et aliquet felis. 
     Sed scelerisque gravida placerat. Maecenas eleifend libero nec tincidunt ultrices. 
     Nunc mattis lectus ligula, ac ornare ipsum finibus sit amet. 
     Nam venenatis vehicula elit vel interdum. Pellentesque ullamcorper, urna varius faucibus imperdiet, 
     est massa congue purus, aliquet fringilla mauris magna nec nunc. Aliquam erat volutpat. Etiam sit amet fringilla dui. 
     Maecenas congue magna ac sapien laoreet, ac aliquet neque posuere. Sed tempus fermentum eros quis bibendum. 
     Nam condimentum quis magna non rutrum. Fusce ultrices nibh vitae tellus convallis, vel feugiat quam facilisis. 
     Sed sit amet diam in risus placerat feugiat. Curabitur euismod nibh in nibh posuere, egestas faucibus tellus fringilla. 
     Vivamus et cursus est, ut pretium ipsum. Nam non mi tristique, aliquet arcu at, porttitor nulla. 
     Nulla suscipit erat mi, vitae pharetra metus interdum eu. Sed ex ante, rutrum quis massa at, pulvinar lobortis urna. 
     Duis ultricies elit eget tellus porttitor dictum. Phasellus et semper diam. Nunc non blandit nunc. 
     Phasellus in lectus in lacus convallis auctor sed et turpis. Nulla in nisi finibus, consequat quam id, commodo elit. 
     Pellentesque vitae gravida metus. Nullam at turpis tristique, iaculis purus at, consectetur tellus. 
     Vestibulum eros libero, pellentesque a leo a, porta ullamcorper leo. Suspendisse commodo mattis augue, 
     nec vulputate quam finibus vitae. Curabitur ut luctus arcu, in faucibus mi. Vestibulum risus justo, venenatis ut mi ac, 
     blandit aliquet enim. Fusce at enim laoreet, gravida elit id, laoreet nunc. Proin nibh nisi, vehicula id dapibus ut, 
     sollicitudin ut libero. Phasellus ante lectus, iaculis quis dolor nec, scelerisque hendrerit leo. 
     Suspendisse egestas cursus erat vel fermentum. Etiam efficitur volutpat dolor, lobortis commodo ex consequat nec. 
     Phasellus convallis est vel finibus viverra. Nulla sagittis elementum nibh eget tristique. 
     Maecenas tincidunt nulla sit amet rhoncus auctor. Cras vestibulum pharetra libero finibus auctor. 
     Praesent purus velit, euismod nec nulla vitae, ornare venenatis nisi. Proin euismod nisi sit amet justo convallis volutpat. 
     Proin maximus, dolor sed varius mattis, tortor est dapibus tellus, vitae pellentesque libero enim sed massa.`.split(
      ' ',
    );
  threads: WritableSignal<Thread[]> = signal(
    Array(20)
      .fill(null)
      .map(() => ({
        id: this.getRandomNumber(),
        title:
          this.getRandomText(1) +
          ' ' +
          this.getRandomText(1).replaceAll(',', '').replaceAll('.', ''),
        avatar: this.getRandomImageUrl(100),
        status: this.getRandomNumber({ max: 3 }),
        lastActivity: this.randomDate(),
        unreadCount: this.getRandomBoolean()
          ? this.getRandomNumber({ max: 20 })
          : 0,
        pinned: this.getRandomBoolean(),
        muted: this.getRandomBoolean(),
        lastMessage: {
          id: this.getRandomNumber(),
          owner: {
            id: 1234,
            avatar: this.getRandomImageUrl(100),
            name: this.user.name,
          },
          text: this.getRandomText({ max: 200 }),
          createdAt: this.randomDate(),
          deliveredAt: new Date(),
          readAt: new Date(),
        },
      })),
  );
  selectedThread: WritableSignal<Thread | undefined> = signal(undefined);
  messages: WritableSignal<Message[] | undefined> = signal(undefined);
  replyingMessage: WritableSignal<Message | undefined> = signal(undefined);
  messageText = '';

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
          id: this.getRandomNumber(),
          owner: {
            id: 1234,
            avatar: this.getRandomImageUrl(100),
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
                id: this.getRandomNumber(),
                owner: {
                  id: 4321,
                  avatar: this.getRandomImageUrl(100),
                  name: this.selectedThread()?.title ?? '',
                },
                text: this.getRandomText({ max: 200 }),
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
          const ownerUser = this.getRandomBoolean();
          const messageType = Math.random();
          const hasText = this.getRandomBoolean();
          const imgOriginalWidth = this.getRandomNumber({
            min: 200,
            max: 400,
          });
          const imgOriginalHeight = this.getRandomNumber({
            min: 200,
            max: 400,
          });
          return {
            id: this.getRandomNumber(),
            owner: {
              id: ownerUser ? 1234 : 4321,
              avatar: this.getRandomImageUrl(100),
              name: ownerUser ? this.user.name : thread.title,
            },
            text:
              (messageType > 0.5 && hasText) || messageType <= 0.5
                ? this.getRandomText(
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
                    url: this.getRandomImageUrl({
                      width: this.getRandomNumber({ max: 2000 }),
                      height: this.getRandomNumber({ max: 2000 }),
                    }),
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

  getRandomText(length?: { min?: number; max?: number } | number): string {
    let textArray = this.randomTextArr;
    const minLength = typeof length === 'number' ? length : length?.min ?? 1;
    const maxLength =
      typeof length === 'number' ? length : length?.max ?? textArray.length;
    while (maxLength > textArray.length) {
      textArray = [...textArray, ...this.randomTextArr];
    }
    return this.shuffle(textArray)
      .slice(
        0,
        Math.ceil(
          ((maxLength ?? textArray.length) - (minLength ?? 0)) * Math.random() +
            (minLength ?? 0),
        ),
      )
      .join(' ')
      .trim();
  }

  getRandomNumber(config?: { min?: number; max?: number }): number {
    return (
      Math.floor(
        ((config?.max ?? Number.MAX_VALUE) - (config?.min ?? 0)) *
          Math.random() +
          (config?.min ?? 0),
      ) + 1
    );
  }
  getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  randomDate(
    start: Date = new Date('1970-01-01'),
    end: Date = new Date(),
  ): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }
  getRandomImageUrl(
    config?: { width: number; height: number } | number,
  ): string {
    const width = typeof config === 'number' ? config : config?.width ?? 200;
    const height = typeof config === 'number' ? config : config?.height ?? 200;
    return `https://picsum.photos/${width}/${height}?workAround=${Math.floor(Math.random() * 10000)}`;
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
