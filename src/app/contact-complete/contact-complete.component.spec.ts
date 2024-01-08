import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCompleteComponent } from './contact-complete.component';

describe('ContactCompleteComponent', () => {
  let component: ContactCompleteComponent;
  let fixture: ComponentFixture<ContactCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactCompleteComponent]
    });
    fixture = TestBed.createComponent(ContactCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
