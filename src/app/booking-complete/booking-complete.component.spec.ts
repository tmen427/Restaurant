import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCompleteComponent } from './booking-complete.component';

describe('BookingCompleteComponent', () => {
  let component: BookingCompleteComponent;
  let fixture: ComponentFixture<BookingCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCompleteComponent]
    });
    fixture = TestBed.createComponent(BookingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
