import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NgForm, Validators } from '../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../model/Company';
import { User } from '../../model/User';
import { NotificationsService } from '../../../node_modules/angular2-notifications';
import { NewRecord } from '../../model/new_record';
import { CompanyService } from '../company/company.service';
import { BasicService } from '../tanim/basic.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [BasicService]
})
export class MainComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  message: string = '';
  loginCategory: number;
  isLoggedIn = false;
  company: Company;
  user: User;
  newRecord: NewRecord;
  constructor(
    private basicService: BasicService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginCategory = this.loginService.getLoginCategory();
    this.isLoggedIn = this.loginService.isLoggedIn();
  }


  // errShow(err: any) {
  //   let msgText = "";
  //   if (err.status == 401) {
  //     msgText = err.statusText + " Yetkilendirme Hatası.";
  //     this.notificationsService.error("Hata", msgText)
  //     setTimeout(x => {
  //       this.router.navigateByUrl("login");
  //     }, 1000);
  //   }
  //   else {
  //     msgText = "Hata Oluştu.";
  //     this.notificationsService.error("Hata", msgText)
  //   }
  // }

  register(form: NgForm) {
    console.log("login");
    console.log(form.value.name);
    console.log(form.value.remail);
    console.log(form.value.rpassword);
    console.log(form.value.rpassword1);
    console.log(form.value.address);

    if (form.value.rpassword != form.value.rpassword1) this.message = "Şifreler Eşleşmiyor";
    else {
      console.log("Eşleşiyor");
      this.message = '';
      let c: Company = new Company();
      c.name = form.value.name;
      c.email = form.value.remail;
      c.password = form.value.rpassword;
      c.address = form.value.address;
      this.basicService.register(c).subscribe(x=>{
        this.notificationsService.success("Yeni Kayıt Eklendi.");
        console.log(x);
          this.router.navigateByUrl("welcome/new/"+x.user.id);
      },
        err => {
          this.notificationsService.error("Hata", <any>err)
          // setTimeout(x => {
          //   this.router.navigateByUrl("login");
          // }, 1000);
        });
        
    }
  }
  
  login(form: NgForm) {
    this.loginService.login(form.value.email, form.value.password).subscribe(t => {
      if (t) {
        // console.log("login component true");
        this.router.navigateByUrl('main');
      }
      else {
        console.log("login component false");
        this.message = "Username or Password is incorrect!";
      }
    });
  }
}
