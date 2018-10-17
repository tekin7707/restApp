import { Component, OnInit } from '@angular/core';
import { MovementService } from './movement.service';
import { Movement_s, Movement_List } from '../../model/Movement';
import { LoginService } from '../login/login.service';
import { User } from '../../model/User';
import { NotificationsService } from '../../../node_modules/angular2-notifications';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css'],
  providers:[MovementService]
})
export class MovementComponent implements OnInit {
  movement_list: Movement_List[] = [];
  movement: Movement_s;
  loggedUser: User;

  constructor(
    private movementService: MovementService,
    private loginService: LoginService,
    private notificationsService: NotificationsService
  ) {
    this.loggedUser = loginService.getLoginUser();
    this.getMovementList();
    this.setDataTable();

  }

  setDataTable(){
    setTimeout(function () {
      $(function () {
        $('#myDataTable').DataTable(
          {
            "pagingType": 'full_numbers',
            "processing": true,
            "language": {
              "lengthMenu": "her sayfada _MENU_ kayıt gösteriliyor",
              "zeroRecords": "Kayıt Yok",
              "info": " _PAGE_ / _PAGES_ gösteriliyor",
              "infoEmpty": "Kayıt Yok",
              "infoFiltered": "(_MAX_ kayıt filtrelendi)",
              "search": "Arama",
              "processing": "bekleyin...",
              "paginate": {
                "first": "İlk",
                "last": "Son",
                "next": "Sonraki",
                "previous": "Önceki"
              },
              "aria": {
                "sortAscending": ": küçükten büyüğe",
                "sortDescending": ": büyükten küçüğe"
              }
            }
          }
        );
      });
    }, 3000);

  }

  ngOnInit() {
  }

  getMovementList() {
    this.movementService.getMovementList(this.loggedUser.company_id).subscribe(x => {
      this.movement_list = x;
      console.log(this.movement_list);
    });
  }

  getMovement(mov_id: number) {
    this.movementService.getMovement(mov_id).subscribe(x => {
      this.movement = x;
    })
  }

}
