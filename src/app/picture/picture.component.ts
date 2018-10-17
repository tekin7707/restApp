import { Component, OnInit, ViewChild} from '@angular/core';
import { PictureService } from './picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
  providers:[PictureService]
})


export class PictureComponent implements OnInit {
  @ViewChild("fileInput") fileInput;

  constructor(
    private pictureService:PictureService
  ) { }

  ngOnInit() {
  }

  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.pictureService.upload(fileToUpload,"123","product").subscribe(res => {
                console.log(res);
            });
    }
}

}
