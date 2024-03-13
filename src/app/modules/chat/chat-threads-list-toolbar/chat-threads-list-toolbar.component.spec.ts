import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatThreadsListToolbarComponent } from './chat-threads-list-toolbar.component';

describe('BarsaChatThreadsListToolbarComponent', () => {
  let component: ChatThreadsListToolbarComponent;
  let fixture: ComponentFixture<ChatThreadsListToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatThreadsListToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatThreadsListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
