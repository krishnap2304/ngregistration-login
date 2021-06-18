import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninsuccessComponent } from './signinsuccess.component';

describe('SigninsuccessComponent', () => {
  let component: SigninsuccessComponent;
  let fixture: ComponentFixture<SigninsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
