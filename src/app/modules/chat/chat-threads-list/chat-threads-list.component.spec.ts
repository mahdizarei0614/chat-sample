import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatThreadsListComponent } from './chat-threads-list.component';

describe('BarsaChatThreadsListComponent', () => {
  let component: ChatThreadsListComponent;
  let fixture: ComponentFixture<ChatThreadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatThreadsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatThreadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
