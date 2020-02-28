import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NOTFOUNDComponent } from './notfound.component';

describe('NOTFOUNDComponent', () => {
  let component: NOTFOUNDComponent;
  let fixture: ComponentFixture<NOTFOUNDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NOTFOUNDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NOTFOUNDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
