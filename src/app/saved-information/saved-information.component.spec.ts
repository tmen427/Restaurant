import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedInformationComponent } from './saved-information.component';

describe('SavedInformationComponent', () => {
  let component: SavedInformationComponent;
  let fixture: ComponentFixture<SavedInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedInformationComponent]
    });
    fixture = TestBed.createComponent(SavedInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
