import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-producto',
  templateUrl: './upload-producto.component.html',
  styleUrls: ['./upload-producto.component.css'],
})
export class UploadProductoComponent {
  file: File;

  onFileAdd(file: File) {
    this.file = file;
  }

  onFileRemove() {
    this.file = new File([], '');
  }
}
