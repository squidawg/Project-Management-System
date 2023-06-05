import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningFormComponent } from './delete-warning-form.component';

describe('DeleteWarningFormComponent', () => {
  let component: DeleteWarningFormComponent;
  let fixture: ComponentFixture<DeleteWarningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
