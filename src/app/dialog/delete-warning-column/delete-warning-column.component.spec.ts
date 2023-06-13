import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningColumnComponent } from './delete-warning-column.component';

describe('DeleteWarningColumnComponent', () => {
  let component: DeleteWarningColumnComponent;
  let fixture: ComponentFixture<DeleteWarningColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
