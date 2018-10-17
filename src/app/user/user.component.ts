import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../../model/User';
import { NotificationsService } from 'angular2-notifications';
import { NgForm } from '@angular/forms';
import { Company } from '../../model/Company';
import { CompanyService } from '../company/company.service';
import { Role } from '../../model/Role';
import { LoginService } from '../login/login.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService,CompanyService,ToolService]
})
export class UserComponent implements OnInit {

  user: User[];
  company: Company[] = [];
  role: Role[] = [];
  selectedUser: User = new User();
  loggedUser :User = new User();
  constructor(
    private companyService: CompanyService, 
    private loginService: LoginService,
    private userService: UserService, 
    private toolService: ToolService, 
    private notificationsService: NotificationsService
  ) { 
    this.loggedUser= this.loginService.getLoginUser();
  }

  ngOnInit() {
    this.getUsers(this.loggedUser.company_id);
    this.getCompany();
    this.getRole();
  }

  getRole(Id?: number) {
    this.userService.getRoles().subscribe(x => {
      this.role = x;
    });
  }  

  getCompany(Id?: number) {
    this.companyService.getCompany(Id).subscribe(x => {
      this.company = x;
      // console.log(x);
    });
  }

  getUsers(ci?: number) {
    this.userService.getUsers(ci).subscribe(x => {
      this.user = x;
    });
  }

  delete(u) {
    if (confirm("Kaydı Silmek istediğinizden emin misiniz?")) {
      this.userService.delete(u.id).subscribe(x => {
        this.notificationsService.warn("Kayıt Silindi.");
        this.getUsers();
      });
    }
  }

  setFormAdd(form: NgForm) {
    console.log("add");
    form.setValue({
      id: 0,
      company_id: 0,
      role_id: 0,
      name: "",
      surname: "",
      email: "",
      password: "",
    });
  }

  setFormEdit(form: NgForm, u: User) {
    console.log("edit");
    this.selectedUser = u;
    console.log(this.selectedUser);

    form.setValue({
      id: u.id,
      company_id: u.company_id,
      role_id: u.role_id,
      name: u.name,
      surname: u.surname,
      email: u.email,
      password: u.password,
    });

  }

  editUser(form: NgForm) {
    if (form.value.id > 0) {
      console.log("edit");
      this.update(form);


    }
    else {
      console.log("new");
      this.add(form);
    }
  }

  update(form: NgForm) {
    let u: User = new User();
    u.id = form.value.id;
    u.name = form.value.name;
    u.surname = form.value.surname;
    u.email = form.value.email;
    u.password = form.value.password;
    u.address = form.value.address;
    u.company_id = form.value.company_id;
    this.userService.createOrUpdate(u).subscribe(x => {
      console.log("update->");
      console.log(x);
      console.log("<--- update");
      this.getUsers();
      console.log("update ok.");
      this.notificationsService.success(u.name + " Güncellendi.");
    });
  }

  add(form: NgForm) {
    let u: User = new User();
    u.id = form.value.id;
    u.name = form.value.name;
    u.surname = form.value.surname;
    u.email = form.value.email;
    u.password = form.value.password;
    u.address = form.value.address;
    u.company_id = form.value.company_id,
      this.userService.createOrUpdate(u).subscribe(x => {
        this.getUsers();
        console.log(x);
        this.notificationsService.success(u.name + " Eklendi.");
      });
  }

}
