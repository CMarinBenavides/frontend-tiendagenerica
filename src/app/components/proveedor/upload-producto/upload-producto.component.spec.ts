import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductoComponent } from './upload-producto.component';

describe('UploadProductoComponent', () => {
  let component: UploadProductoComponent;
  let fixture: ComponentFixture<UploadProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadProductoComponent]
    });
    fixture = TestBed.createComponent(UploadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
