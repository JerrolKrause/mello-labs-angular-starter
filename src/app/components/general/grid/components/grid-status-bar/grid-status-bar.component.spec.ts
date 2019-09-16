import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStatusBarComponent } from './grid-status-bar.component';

describe('GridStatusBarComponent', () => {
  let component: GridStatusBarComponent;
  let fixture: ComponentFixture<GridStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridStatusBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
