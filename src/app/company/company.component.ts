import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../model/Company';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
  public options = {
    timeOut: 5000,
    position: ["bottom", "right"],
    lastOnBottom: true
  }
  @ViewChild('btnSubmit') public btnSubmit: ElementRef;
  constructor(
    private router: Router,
    private companyService: CompanyService,
    private notificationsService: NotificationsService
  ) { }
  errMsg = "";
  companies: Company[];
  company: Company;
  submitCondition: boolean = false;
  ngOnInit() {
    this.getCompany();
  }

  errShow(err: any){
    let msgText = "";
    if (err.status == 401) {
      msgText = err.statusText + " Yetkilendirme Hatası.";
      this.notificationsService.error("Hata", msgText, this.options)
      setTimeout(x => {
        this.router.navigateByUrl("login");
      }, 1000);
    }
    else {
      msgText = "Hata Oluştu.";
      this.notificationsService.error("Hata", msgText, this.options)
    }
  }

  getCompany(Id?: number) {
    this.companyService.getCompany(Id).subscribe(x => {
      console.log(x);
      this.companies = x;
    },
      err => {
        this.errShow(err);
      }
    );
  }

  editCompany(form: NgForm) {
    if (form.value.id > 0) {
      console.log("edit");
      this.updateCompany(form);
      this.submitCondition = false;
    }
    else {
      console.log("new");
      this.submitCondition = false;
      this.createCompany(form);
    }
  }

  updateCompany(form: NgForm) {
    let c: Company = new Company();
    c.id = form.value.id;
    c.name = form.value.name;
    c.email = form.value.email;
    c.password = form.value.password;
    c.address = form.value.address;
    this.companyService.updateCompany(c).subscribe(x => {
      this.getCompany();
      console.log("update ok.");
      this.notificationsService.success(c.name + " Güncellendi.");
    },
      err => {
        this.notificationsService.error("Hata", <any>err, this.options)
        setTimeout(x => {
          this.router.navigateByUrl("login");
        }, 1000);
      });
  }

  createCompany(form: NgForm) {
    let c: Company = new Company();
    c.name = form.value.name;
    c.email = form.value.email;
    c.password = form.value.password;
    c.address = form.value.address;
    this.companyService.setCompany(c).subscribe(x => {
      this.company = x;
      this.getCompany();
      console.log(x);
      this.notificationsService.success(this.company.name + " Eklendi.");
    },
      err => {
        this.notificationsService.error("Hata", <any>err, this.options)
        setTimeout(x => {
          this.router.navigateByUrl("login");
        }, 1000);
      });
  }

  setFormEdit(form: NgForm, c: Company) {
    form.setValue({
      id: c.id,
      name: c.name,
      email: c.email,
      password: c.password,
      address: c.address
    });
    this.submitCondition = true;
  }

  setFormAdd(form: NgForm) {
    form.setValue({
      id: 0,
      name: "",
      email: "",
      password: "",
      address: ""
    });
    this.submitCondition = true;
  }

  companyDelete(c: Company) {
    console.log("delete");
    if (confirm("Kaydı Silmek istediğinizden emin misiniz?")) {
      this.companyService.delCompany(c.id).subscribe(x => {
        this.notificationsService.warn("Kayıt Silindi.");
        this.getCompany();
      },
        err => {
          this.notificationsService.error("Hata", <any>err, this.options)
          setTimeout(x => {
            this.router.navigateByUrl("login");
          }, 1000);
        });
      this.submitCondition = false;
    }
  }

}
