import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallListenComponent } from './call-listen.component';

describe('CallListenComponent', () => {
  let component: CallListenComponent;
  let fixture: ComponentFixture<CallListenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CallListenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallListenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
