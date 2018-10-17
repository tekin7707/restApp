import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../user.service';
import { User } from '../../../model/User';
import { Picture } from '../../../model/Picture';
import { ToolService } from '../../services/tool.service';
import { NotificationsService } from '../../../../node_modules/angular2-notifications';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService, ToolService]
})
export class UserProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  userId = 0;
  activeUser: User;
  picture: Picture;
  uploadUrl = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toolService: ToolService,
    private notificationsService: NotificationsService
  ) {
    this.route.params.subscribe(params => {
      this.userId = params["Id"];
      console.log(this.userId);
      this.userService.getUser(this.userId).subscribe(x => {
        this.activeUser = x;
        console.log(x);
        this.toolService.getUserPicture(this.userId).subscribe(x => {
          this.picture = x;
          console.log(x);
        });
      });
    });
  }

  ngOnInit() {
  }

  updateUser() {
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ((e) => {
        this.uploadUrl = e.target['result'];
      });
    }
  }

  deletePicture(pid: number) {
    this.toolService.deletePicture(this.picture.id).subscribe(x => {
      this.picture = null;
      this.notificationsService.warn("Resim Silindi.");
    });
  }

  uploadFile() {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.toolService.upload(fileToUpload, this.activeUser.id, "user").subscribe(res => {
        this.picture = res[res.length-1];
        this.uploadUrl = "";
        console.log(res);
        this.notificationsService.success("Resim Eklendi.");
      });
    }
  }
}
