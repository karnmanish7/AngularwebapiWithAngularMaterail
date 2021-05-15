import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAditComponent } from './add-adit.component';

describe('AddAditComponent', () => {
  let component: AddAditComponent;
  let fixture: ComponentFixture<AddAditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
