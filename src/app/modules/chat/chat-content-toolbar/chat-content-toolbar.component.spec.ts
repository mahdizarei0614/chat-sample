import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContentToolbarComponent } from './chat-content-toolbar.component';

describe('BarsaChatContentToolbarComponent', () => {
  let component: ChatContentToolbarComponent;
  let fixture: ComponentFixture<ChatContentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatContentToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatContentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
