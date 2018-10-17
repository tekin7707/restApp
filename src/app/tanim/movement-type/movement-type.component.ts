import { Component, OnInit } from '@angular/core';
import { MovementType } from '../../../model/MovementType';
import { NotificationsService } from '../../../../node_modules/angular2-notifications';
import { User } from '../../../model/User';
import { LoginService } from '../../login/login.service';
import { TanimService } from '../tanim.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-movement-type',
  templateUrl: './movement-type.component.html',
  styleUrls: ['./movement-type.component.css'],
  providers: [TanimService]
})
export class MovementTypeComponent implements OnInit {

  movementTypes: MovementType[];
  selectedmovementTypes: MovementType;
  selectedUser: User = new User();
  constructor(
    private tanimService: TanimService,
    private loginService: LoginService,
    private notificationsService: NotificationsService) {
    this.selectedUser = this.loginService.getLoginUser();
    this.getMovementTypes();

    console.log("movement types");

  }

  ngOnInit() {
  }

  getMovementTypes() {
    this.tanimService.getMovementTypes(this.selectedUser.company_id).subscribe(x => {
      this.movementTypes = x;
      console.log(x);

    });
  }

}
