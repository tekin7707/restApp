import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Movement_s, Movement, Movement_Lines } from '../../../model/Movement';
import { User } from '../../../model/User';
import { MovementService } from '../movement.service';
import { LoginService } from '../../login/login.service';
import { NotificationsService } from '../../../../node_modules/angular2-notifications';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { Customer } from '../../../model/Customer';
import { MovementType } from '../../../model/MovementType';
import { CustomerService } from '../../customer/customer.service';
import { TanimService } from '../../tanim/tanim.service';

@Component({
  selector: 'app-movement-edit',
  templateUrl: './movement-edit.component.html',
  styleUrls: ['./movement-edit.component.css'],
  providers: [MovementService, NgbDatepickerConfig, CustomerService, TanimService]
})
export class MovementEditComponent implements OnInit {
  vatSettings: any = {};
  dateModel: NgbDateStruct;
  mode: string = '';
  // movement: Movement_s;
  d = new Date();
  // _movement: Movement;
  // _movement_line: Movement_Lines;
  // _customer: Customer;
  // _movement_type: MovementType;

  _movement:Movement = { id: 0, date: this.d, price: 0, tax: 0, totalprice: 0, note: "", ref_id: 0, movement_type_id: 0, customer_id: 0, company_id: 0 };
  _movement_line:Movement_Lines = { id: 0, quantity: 1, master_id: 0, name: "", price: null, tax: 0, vat: 0, totalprice: 0 };
  _customer:Customer[] = [{ id: 0, company_id: 0, name: "", pname: "", psurname: "", address: "", vd: "", vn: "" }];
  _movement_type:MovementType[] = [{ id: 0, company_id: 0, name: "", plus: true, ref: false, note: "" }];
  movement:Movement_s = { movement: this._movement, movement_type: this._movement_type[0], customer: this._customer[0], movement_lines: [this._movement_line] };


  customers: Customer[] = [];
  movementTypes: MovementType[] = [];
  loggedUser: User = new User();
  silOnay: boolean = false;
  islemCaption: string = "";
  id = 0;
  constructor(
    config: NgbDatepickerConfig,
    private loginService: LoginService,
    private movementService: MovementService,
    private customerService: CustomerService,
    private tanimService: TanimService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  console.log("constructor");
    console.log(this.movement.movement);    
    this.loggedUser = this.loginService.getLoginUser();
    this.route.params.subscribe(params => {
      this.mode = params["mode"];
      customerService.getCustomers(this.loggedUser.company_id).subscribe(x => {
        this.customers = x;
      });
      tanimService.getMovementTypes(this.loggedUser.company_id).subscribe(x => {
        this.movementTypes = x;
      });

      if (this.mode == 'add') {
        this.movement = new Movement_s();
        this._movement.company_id = this.loggedUser.company_id;
        this.islemCaption = "Yeni Kayıt";
        this.selectDay(new Date());
        console.log(this.dateModel);
      }
      else {
        this.id = params["id"];
        this.islemCaption = this.mode == 'del' ? "Kayıt Silinecek !" : "Kayıt Düzenle";
        this.movementService.getMovement(this.id).subscribe(x => {
          this.movement = x;
          this._movement = x.movement;
          console.log(this.movement);
          this._movement=this.movement.movement; 
          this._movement_type= this.movementTypes.filter(x=>x.id==this.movement.movement.movement_type_id); 
           this._customer=this.customers.filter(x=>x.id==this.movement.movement.customer_id); 
           this._movement_line = this.movement.movement_lines[0];
           this.selectDay(new Date(this._movement.date));
        });
      }
    });
  }
  onItemSelectCustomer(item: any) {
    this._movement.customer_id=item.id;
    this.movement.customer = item;
    this.movement.movement=this._movement;
    console.log(item);
  }
  onItemSelectMovementType(item: any) {
    this._movement.movement_type_id = item.id;
    this.movement.movement_type = item;
    this.movement.movement=this._movement;
    console.log(item);
  }
  selectDay(now: Date) {
    this.dateModel = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  getNgbDate(_d:NgbDateStruct):Date{
    return new Date(_d.year,_d.month-1,_d.day);
  }
  onDateSelect($event){
    this._movement.date= this.getNgbDate(this.dateModel);
    console.log(this._movement.date);
  }
  ngOnInit() {
    this.vatSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      placeHolder: "Seçiniz",
      allowSearchFilter: true
    };
  }

  editMovement() {
    console.log("editMovement");

    if (this.movement.movement.id > 0) {
      if (this.mode == 'del') {
        console.log("del :" + this.movement.movement.id);
        this.deleteMovement();
        setTimeout(x => {
          this.router.navigateByUrl("movement");
        }, 2000);

      } else {
        console.log("edit :" + this.movement.movement.id);
        this.movement.movement_lines = [this._movement_line];
        this.updateMovement();
        setTimeout(x => {
          this.router.navigateByUrl("movement-edit/edit/"+this.movement.movement.id);
        }, 2000);
      }
    }
    else {
      console.log("new");
      this.movement.movement_lines = [this._movement_line];
      console.log(this.movement);
      this.createMovement();
      setTimeout(x => {
        this.router.navigateByUrl("movement-edit/edit/"+this.movement.movement.id);
      }, 3000);
    }
  }

  updateMovement() {
    this.movementService.updateMovement(this.movement).subscribe(x => {
      console.log("update ok.");
      this.notificationsService.success(this.movement.customer.name + " Güncellendi.");
    });
  }

  createMovement() {
    console.log("addMovement ts  Önce");
    this.movementService.addMovement(this.movement).subscribe(x => {
      this.movement = x;
      console.log("addMovement ts Ok");
      console.log(x);
      this.notificationsService.success(this.movement.customer.name + " Eklendi.");
    });
  }

  deleteMovement() {
    if (confirm("Kaydı Silmek istediğinizden emin misiniz?")) {
      this.movementService.deleteMovement(this.movement.movement.id, "Movement").subscribe(x => {
        this.notificationsService.warn("Kayıt Silindi.");
        setTimeout(x => {
          this.router.navigateByUrl("movement");
        }, 1000);
      });
    }
  }

}
