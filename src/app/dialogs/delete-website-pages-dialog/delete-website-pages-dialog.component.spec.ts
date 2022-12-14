import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteWebsitePagesDialogComponent } from './delete-website-pages-dialog.component';

describe('DeleteWebsitePagesDialogComponent', () => {
  let component: DeleteWebsitePagesDialogComponent;
  let fixture: ComponentFixture<DeleteWebsitePagesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWebsitePagesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWebsitePagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
