import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  mode: string = '';//yeni:Yeni Kayıt
  id = 0;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("welcome");
    this.route.params.subscribe(params => {
      this.mode = params["mode"];
      this.id = params["id"];
    });
    console.log(this.mode);
    console.log(this.id);
  }

  ngOnInit() {
  }

}
