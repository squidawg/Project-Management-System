import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningUserComponent } from './delete-warning-user.component';

describe('DeleteWarningUserComponent', () => {
  let component: DeleteWarningUserComponent;
  let fixture: ComponentFixture<DeleteWarningUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
