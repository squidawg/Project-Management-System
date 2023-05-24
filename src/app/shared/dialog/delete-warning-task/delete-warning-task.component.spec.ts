import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningTaskComponent } from './delete-warning-task.component';

describe('DeleteWarningTaskComponent', () => {
  let component: DeleteWarningTaskComponent;
  let fixture: ComponentFixture<DeleteWarningTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
