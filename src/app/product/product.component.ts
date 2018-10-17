import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { NotificationsService } from '../../../node_modules/angular2-notifications';
import { Product_s } from '../../model/product_s';
import { User } from '../../model/User';
import { LoginService } from '../login/login.service';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product = new Product();
  loggedUser: User = new User();

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private notificationsService: NotificationsService
  ) {
    this.loggedUser = this.loginService.getLoginUser();
    this.getProducts();
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

  getProducts() {
    console.log("---->product ts");
    this.productService.getProducts(this.loggedUser.company_id).subscribe(x => {
      this.products = x;
      if(x){
        console.log(x);
      }else{
        console.log("ürün yok");
      }
    console.log("---->product ts");

    });
  }
}
