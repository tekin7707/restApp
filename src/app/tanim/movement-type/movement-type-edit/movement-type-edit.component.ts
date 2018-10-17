import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { MovementType } from '../../../../model/MovementType';
import { NotificationsService } from '../../../../../node_modules/angular2-notifications';
import { LoginService } from '../../../login/login.service';
import { User } from '../../../../model/User';
import { TanimService } from '../../tanim.service';

@Component({
  selector: 'app-movement-type-edit',
  templateUrl: './movement-type-edit.component.html',
  styleUrls: ['./movement-type-edit.component.css'],
  providers:[TanimService]
})
export class MovementTypeEditComponent implements OnInit {
  mode: string = '';
  movementType:MovementType;
  loggedUser: User = new User();
  silOnay: boolean = false;
  islemCaption: string = "";
  id=0;

  constructor(
    private loginService: LoginService,
    private tanimService: TanimService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUser = this.loginService.getLoginUser();
    this.route.params.subscribe(params => {
      this.mode = params["mode"];
      if (this.mode == 'add') {
        this.movementType = new MovementType();
        this.movementType.company_id = this.loggedUser.company_id;
        this.islemCaption = "Yeni Kayıt";
      }
      else {
        this.id = params["id"];
        this.islemCaption = this.mode == 'del' ? "Kayıt Silinecek !" : "Kayıt Düzenle";
        this.tanimService.getMovementType(this.id).subscribe(x => {
          this.movementType = x;
          console.log(x);
        });
      }
    });    
   }

  ngOnInit() {
  }

  editMovementType() {
    if (this.movementType.id > 0) {
      if (this.mode == 'del') {
        console.log("del :" + this.movementType.id);
        this.deleteMovementType();
        setTimeout(x => {
          this.router.navigateByUrl("movement-type");
        }, 2000);

      } else {
        console.log("edit :" + this.movementType.id);
        this.updateMovementType();
        setTimeout(x => {
          this.router.navigateByUrl("movement-type");
        }, 2000);
      }
    }
    else {
      console.log("new");
      console.log(this.movementType);

      this.createMovementType();
      setTimeout(x => {
        this.router.navigateByUrl("movement-type");
      }, 1000);
    }
  }

  updateMovementType() {
    this.tanimService.updateMovementType(this.movementType).subscribe(x => {
      console.log("update ok.");
      this.notificationsService.success(this.movementType.name + " Güncellendi.");
    });
  }

  createMovementType() {
    this.tanimService.addMovementType(this.movementType).subscribe(x => {
      this.movementType = x;
      console.log(x);
      this.notificationsService.success(this.movementType.name + " Eklendi.");
    });
  }

  deleteMovementType() {
    if (confirm("Kaydı Silmek istediğinizden emin misiniz?")) {
      this.tanimService.delete(this.movementType.id,"MovementType").subscribe(x => {
        this.notificationsService.warn("Kayıt Silindi.");
        setTimeout(x => {
          this.router.navigateByUrl("movement-type");
        }, 1000);
      });
    }
  }  

}
