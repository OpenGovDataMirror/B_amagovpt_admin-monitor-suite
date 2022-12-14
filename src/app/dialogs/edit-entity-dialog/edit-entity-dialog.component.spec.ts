import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditEntityDialogComponent } from './edit-entity-dialog.component';

describe('EditEntityDialogComponent', () => {
  let component: EditEntityDialogComponent;
  let fixture: ComponentFixture<EditEntityDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
