import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddDomainDialogComponent } from './add-domain-dialog.component';

describe('AddDomainDialogComponent', () => {
  let component: AddDomainDialogComponent;
  let fixture: ComponentFixture<AddDomainDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDomainDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDomainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
