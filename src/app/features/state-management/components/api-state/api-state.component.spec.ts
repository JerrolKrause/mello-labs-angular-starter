import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainStateComponent } from './domain-state.component';

describe('DomainStateComponent', () => {
  let component: DomainStateComponent;
  let fixture: ComponentFixture<DomainStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DomainStateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
