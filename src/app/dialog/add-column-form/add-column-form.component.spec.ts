import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColumnFormComponent } from './add-column-form.component';

describe('AddColumnFormComponent', () => {
  let component: AddColumnFormComponent;
  let fixture: ComponentFixture<AddColumnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColumnFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
