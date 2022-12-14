import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddWebsiteDialogComponent } from './add-website-dialog.component';

describe('AddWebsiteDialogComponent', () => {
  let component: AddWebsiteDialogComponent;
  let fixture: ComponentFixture<AddWebsiteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebsiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebsiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
