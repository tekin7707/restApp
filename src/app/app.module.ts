import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatTabsModule
  ,MatTableModule
}
  from '@angular/material';
// import {SelectionModel} from '@angular/cdk/collections';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import { DataTablesModule } from "angular-datatables";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoggedComponent } from './logged/logged.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { LoginService } from './login/login.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { CompanyUsersListComponent } from './company/company-users-list/company-users-list.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { PictureComponent } from './picture/picture.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MovementTypeComponent } from './tanim/movement-type/movement-type.component';
import { MovementTypeEditComponent } from './tanim/movement-type/movement-type-edit/movement-type-edit.component';
import { MovementComponent } from './movement/movement.component';
import { MovementEditComponent } from './movement/movement-edit/movement-edit.component';
import { WelcomeComponent } from './main/welcome/welcome.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: "main",
    component: MainComponent
  },
  {
    path: "welcome/:mode/:id",
    component: WelcomeComponent
  },  
  {
    path: "movement",
    canActivate: [AuthGuard],
    component: MovementComponent
  },
  {
    path: "movement-edit/:mode/:id",
    canActivate: [AuthGuard],
    component: MovementEditComponent
  },
  {
    path: "picture",
    component: PictureComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "user",
    canActivate: [AuthGuard],
    component: UserComponent
  },
  {
    path: "user-profile/:Id",
    canActivate: [AuthGuard],
    component: UserProfileComponent
  },
  {
    path: "movement-type",
    canActivate: [AuthGuard],
    component: MovementTypeComponent
  },
  {
    path: "movement-type-edit/:mode/:id",
    canActivate: [AuthGuard],
    component: MovementTypeEditComponent
  },
  {
    path: "product",
    canActivate: [AuthGuard],
    component: ProductComponent
  },
  {
    path: "product-edit/:mode/:recId",
    canActivate: [AuthGuard],
    component: ProductEditComponent
  },
  {
    path: "customer",
    canActivate: [AuthGuard],
    component: CustomerComponent
  },
  {
    path: "customer-edit/:mode/:recId",
    canActivate: [AuthGuard],
    component: CustomerEditComponent
  },
  {
    path: "company",
    canActivate: [AuthGuard],
    component: CompanyComponent
  },
  {
    path: "cul",
    canActivate: [AdminGuard],
    component: CompanyUsersListComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    UserComponent,
    LoginComponent,
    LoggedComponent,
    MainComponent,
    CompanyUsersListComponent,
    RegisterComponent,
    HomeComponent,
    CustomerComponent,
    CustomerEditComponent,
    ProductComponent,
    ProductEditComponent,
    PictureComponent,
    UserProfileComponent,
    MovementTypeComponent,
    MovementTypeEditComponent,
    MovementComponent,
    MovementEditComponent,
    WelcomeComponent
  ],
  imports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatCheckboxModule, MatSelectModule,
    MatInputModule, MatTabsModule, MatListModule,
    MatTableModule,
    // SelectionModel,
    DataTablesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SimpleNotificationsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
    ,
    NgbModule.forRoot()
  ],
  providers: [
    {
      // provide: "restUrl", useValue: "http://localhost:54823/api"
      provide: "restUrl", useValue: "http://rest.webticaret.xyz/api"
    }
    , NotificationsService
    , LoginService
    , AuthGuard
    , AdminGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//git remote add origin https://github.com/tekin7707/restApp.git
//git push -u origin master