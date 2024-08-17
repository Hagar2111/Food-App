import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallScreenNavbarComponent } from './small-screen-navbar.component';

describe('SmallScreenNavbarComponent', () => {
  let component: SmallScreenNavbarComponent;
  let fixture: ComponentFixture<SmallScreenNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallScreenNavbarComponent]
    });
    fixture = TestBed.createComponent(SmallScreenNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
