import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../../../model/Customer';
import { NotificationsService } from 'angular2-notifications';
import { LoginService } from '../../login/login.service';
import { User } from '../../../model/User';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  providers: [CustomerService]
})
export class CustomerEditComponent implements OnInit {
  loggedUser :User = new User();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private loginService: LoginService,
    private notificationsService: NotificationsService
  ) {
    this.loggedUser= this.loginService.getLoginUser();
    this.route.params.subscribe(params => {
      this.mode = params["mode"];
      if (this.mode == 'add') {
        this.islemCaption = "Yeni Kayıt";
        this.customer.company_id=this.loggedUser.company_id;
      }
      else {
        this.recId = params["recId"];
        this.islemCaption = this.mode == 'del' ? "Kayıt Silinecek !" : "Kayıt Düzenle";
        this.customerService.getCustomer(this.recId).subscribe(x => {
          this.customer = x;
        });
      }
    });
  }

  mode: string = '';
  customer: Customer = new Customer();
  recId: number = 0;
  silOnay:boolean=false;
  islemCaption: string = "";
  ngOnInit() {
  }

  editCustomer() {
    console.log("editCustomer ");
    if (this.customer.id > 0) {
      if (this.mode == 'del') {
        console.log("del :" + this.customer.id);
        this.deleteCustomer();
        setTimeout(x => {
          this.router.navigateByUrl("customer");
        }, 2000);

      } else {
        console.log("edit :" + this.customer.id);
        this.updateCustomer();
        setTimeout(x => {
          this.router.navigateByUrl("customer");
        }, 2000);
      }
    }
    else {
      console.log("new");
      this.createCustomer();
      setTimeout(x => {
        this.router.navigateByUrl("customer");
      }, 1000);
    }
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer).subscribe(x => {
      console.log("update ok.");
      this.notificationsService.success(this.customer.name + " Güncellendi.");
    });
  }

  createCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(x => {
      this.customer = x;
      console.log(x);
      this.notificationsService.success(this.customer.name + " Eklendi.");
    });
  }

  deleteCustomer() {
    if (confirm("Kaydı Silmek istediğinizden emin misiniz?")) {
      this.customerService.delCustomer(this.customer.id).subscribe(x => {
        this.notificationsService.warn("Kayıt Silindi.");
        setTimeout(x => {
          this.router.navigateByUrl("customer");
        }, 1000);
      });
    }
  }


}
