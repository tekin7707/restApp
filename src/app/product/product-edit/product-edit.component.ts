import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { NotificationsService } from '../../../../node_modules/angular2-notifications';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product_s } from '../../../model/product_s';
import { Product } from '../../../model/Product';
import { Category } from '../../../model/Category';
import { LoginService } from '../../login/login.service';
import { User } from '../../../model/User';
import { Vat } from '../../../model/Vat';
import { Picture } from '../../../model/Picture';
import { MatTabsModule } from '@angular/material/tabs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableModule,MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [ProductService]
})


export class ProductEditComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  dropdownSettings: any = {};
  vatSettings: any = {};
  loggedUser: User = new User();
  selectedVat: Vat[] = [];
  mode: string = '';
  _pictures:Picture[]=[]
  _product : Product;
  product_s:Product_s={pictures:this._pictures,categories:[],product:this._product};
  recId: number = 0;
  silOnay: boolean = false;
  islemCaption: string = "";
  categories: Category[] = [];
  vats: Vat[] = [];
  uploadUrl = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private productService: ProductService,
    private notificationsService: NotificationsService
  ) {
 
    this.loggedUser = this.loginService.getLoginUser();
    this.product_s.product = new Product();
    this.getCategories();
    this.getVats();
    this.route.params.subscribe(params => {
      this.mode = params["mode"];
      if (this.mode == 'add') {
        this.product_s.product.company_id = this.loggedUser.company_id;
        this.islemCaption = "Yeni Kayıt";
      }
      else {
        this.recId = params["recId"];
        this.islemCaption = this.mode == 'del' ? "Kayıt Silinecek !" : "Kayıt Düzenle";
        this.productService.getProduct(this.recId).subscribe(x => {
          this.product_s = x;
          console.log(x);
          this.setVat();
        });
      }
    });
  }

  ngOnInit() {
    this.vatSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      placeHolder: "Seçiniz",
      allowSearchFilter: false
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      placeHolder: "Seçiniz",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ((e) => {
        this.uploadUrl = e.target['result'];
      });
    }
  }
 
  deletePicture(pid:number){
    const index = this.product_s.pictures.findIndex(p => p.id === pid);
    this.productService.deletePicture(pid).subscribe(x=>{
      this.product_s.pictures.splice(index,1);
    });
  }

  uploadFile() {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.productService.upload(fileToUpload, this.product_s.product.id, "product").subscribe(res => {
        this.product_s.pictures = res;
        this.uploadUrl="";
        console.log(res);
        this.notificationsService.success("Resim Eklendi.");
      });
    }
  }

  getCategories() {
    this.productService.getCategories(this.loggedUser.company_id).subscribe(x => {
      this.categories = x;
    });
  }

  getVats() {
    this.productService.getVats().subscribe(x => {
      this.vats = x;
      // console.log(this.vats);
    });
  }

  editProduct() {
    console.log("editProduct ");
    if (this.product_s.product.id > 0) {
      if (this.mode == 'del') {
        console.log("del :" + this.product_s.product.id);
        this.deleteProduct();
        setTimeout(x => {
          this.router.navigateByUrl("product");
        }, 2000);

      } else {
        console.log("edit :" + this.product_s.product.id);
        this.updateProduct();
        setTimeout(x => {
          this.router.navigateByUrl("product");
        }, 2000);
      }
    }
    else {
      console.log("new");
      console.log(this.product_s);

      this.createProduct();
      setTimeout(x => {
        this.router.navigateByUrl("product");
      }, 1000);
    }
  }

  updateProduct() {
    this.productService.updateProduct(this.product_s).subscribe(x => {
      console.log("update ok.");
      this.notificationsService.success(this.product_s.product.name + " Güncellendi.");
    });
  }

  createProduct() {
    this.productService.addProduct(this.product_s).subscribe(x => {
      this.product_s = x;
      console.log(x);
      this.notificationsService.success(this.product_s.product.name + " Eklendi.");
    });
  }

  deleteProduct() {
    if (confirm("Kaydı Silmek istediğinizden emin misiniz?")) {
      this.productService.delProduct(this.product_s.product.id).subscribe(x => {
        this.notificationsService.warn("Kayıt Silindi.");
        setTimeout(x => {
          this.router.navigateByUrl("product");
        }, 1000);
      });
    }
  }

  setVat() {
    this.selectedVat = this.vats.filter(x => x.id == this.product_s.product.vat_Id);
    // console.log("selectedVat :");
    // console.log(this.selectedVat);
    // console.log("product :");
    // console.log(this.product_s.product);
  }


  onItemSelectVat(item: any) {
    this.product_s.product.vat_Id = item.id;
    console.log(item.id);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
